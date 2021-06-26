package cache

import (
	"encoding/json"
	"fmt"
	"os"
	"github.com/gomodule/redigo/redis"
)


type MsgToUser struct{
	OrginalPostID uint `json:"orginalPostID"`
	SenderID uint		`json:"senderID"`
	NewPostID uint		`json:"newPostID"`
}

var RD *redis.Pool

func CreatePool() {
	pool := newPool()
	fmt.Println("Redis started!")

	RD = pool
}

func newPool() *redis.Pool {
	return &redis.Pool{
			MaxIdle: 80,
			MaxActive: 12000, // max number of connections
			Dial: func() (redis.Conn, error) {
					//return redis.Dial("tcp", ":6379")
					return redis.DialURL(os.Getenv("REDIS_SERVER_URL"))
						
			},
	} 
}



func StoreMsgToRedis(userID string, msg []byte) error{
	c := RD.Get()
	defer c.Close()
	
	newMsg := MsgToUser{}
	redisMessages  := []MsgToUser{}

	err := json.Unmarshal(msg, &newMsg)
	if err != nil {
		return err
	}
	

	oldMsg, _ := GetMsgFromRedis(userID)

	if oldMsg != nil {
		redisMessages = oldMsg
	}

	redisMessages = append(redisMessages, newMsg)

	json, err := json.Marshal(&redisMessages)
	if err != nil{
		return err
	}
	_, err = c.Do(
		"SET",
		userID,
		json,
	)

	if err != nil {
		return err
	}
	return nil
	
}

func GetMsgFromRedis(userID string) ([]MsgToUser,error){
	c := RD.Get()
	defer c.Close()
	msg, err := redis.String(c.Do("GET",userID))
	if err != nil{
		return nil, err
	}
	redisMsg := []MsgToUser{}
	err = json.Unmarshal([]byte(msg), &redisMsg)
	if err != nil {
		return nil, err
	}
	return redisMsg, nil
	
}

func RemoveMsgFromRedis(userID string) error{
	c := RD.Get()
	defer c.Close()

	_, err  := c.Do(
		"DEL",
		userID,
	)
	if err != nil{
		return err
	}
	return nil
}



