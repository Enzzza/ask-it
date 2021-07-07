package mywebsocket

import (
	"encoding/json"
	"fmt"
	

	"github.com/Enzzza/ask-it/project/backend/cache"
	"github.com/Enzzza/ask-it/project/backend/middleware"
	"github.com/antoniodipinto/ikisocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	
)


var Clients = make(map[string]string)

type msgToUser struct{
	OrginalPost interface{} `json:"orginalPost"`
	Sender interface{} 		`json:"sender"`
	NewPost interface{} 		`json:"newPost"`
}



func SetupWebsocket(app *fiber.App) {
	
	// Setup the middleware to retrieve the data sent in GET request
	app.Use("/ws",middleware.JWTProtected(),middleware.SetClaims(),func(c *fiber.Ctx) error {
		// IsWebSocketUpgrade returns true if the client
		// requested upgrade to the WebSocket protocol.
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	// Multiple event handling supported
	ikisocket.On(ikisocket.EventConnect, func(ep *ikisocket.EventPayload) {
		fmt.Printf("Connection event - User connected with id: %s\n", ep.Kws.GetStringAttribute("user_id"))
	})
	// On disconnect event
	ikisocket.On(ikisocket.EventDisconnect, func(ep *ikisocket.EventPayload) {
		// Remove the user from the local Clients
		delete(Clients, ep.Kws.GetStringAttribute("user_id"))
		fmt.Printf("Disconnection event - User: %s\n", ep.Kws.GetStringAttribute("user_id"))
	})

	// On close event
	// This event is called when the server disconnects the user actively with .Close() method
	ikisocket.On(ikisocket.EventClose, func(ep *ikisocket.EventPayload) {
		// Remove the user from the local Clients
		delete(Clients, ep.Kws.GetStringAttribute("user_id"))
		fmt.Printf("Close event - User: %s\n", ep.Kws.GetStringAttribute("user_id"))
	})

	// On error event
	ikisocket.On(ikisocket.EventError, func(ep *ikisocket.EventPayload) {
		fmt.Printf("Error event - User: %s\n", ep.Kws.GetStringAttribute("user_id"))
	})

	app.Get("/ws/:id", ikisocket.New(func(kws *ikisocket.Websocket) {

		// Retrieve the user id from endpoint
		userId := kws.Params("id")

		// Add the connection to the list of the connected Clients
		// The UUID is generated randomly and is the key that allow
		// ikisocket to manage Emit/EmitTo/Broadcast
		Clients[userId] = kws.UUID

		// Every websocket connection has an optional session key => value storage
		kws.SetAttribute("user_id", userId)
		
		// Send msg that user recived while he was offline - use redis
		messages, _:= cache.GetMsgFromRedis(userId)

		json, err := json.Marshal(messages)
		if err != nil {
		fmt.Println("Couldn't convert to json")
			json = []byte("")
		}
		
		cache.RemoveMsgFromRedis(userId)

		if messages != nil{
			kws.Emit(json)
		}
		
	}))

}


func SendMsgToUser(userID string,orginalPost interface{},sender interface{},newPost interface{}){
	
	
	
	ep := ikisocket.EventPayload{}

	msg := msgToUser{}
	msg.OrginalPost = orginalPost
	msg.Sender = sender
	msg.NewPost = newPost
	json, err := json.Marshal(msg)
	if err != nil {
       fmt.Println("Couldn't convert to json")
		json = []byte("")
    }
	

	if client, ok := Clients[userID]; ok {
		if err :=  ep.Kws.EmitTo(client,json); err != nil{
			fmt.Println(err)
		}
	}else{
		fmt.Printf("User with id %s is not online store msg to redis\n",userID)
		err := cache.StoreMsgToRedis(userID,json)
		if err != nil{
			fmt.Println("Couldn't add msg to Redis")
			fmt.Println(err)
		}
	}
			
}
