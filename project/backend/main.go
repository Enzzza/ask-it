package main

import (
	"github.com/Enzzza/ask-it/project/backend/configs"
	"github.com/Enzzza/ask-it/project/backend/database"
	"github.com/Enzzza/ask-it/project/backend/cache"
	"github.com/Enzzza/ask-it/project/backend/middleware"
	"github.com/Enzzza/ask-it/project/backend/routes"
	"github.com/Enzzza/ask-it/project/backend/utils"
	"github.com/Enzzza/ask-it/project/backend/mywebsocket"
	"github.com/gofiber/fiber/v2"
	
)

// @title API
// @version 1.0
// @description This is an auto-generated API Docs.
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email enis.habul@protonmail.com
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @securityDefinitions.apikey ApiKeyAuth
// @in cookie
// @name Authorization
// @BasePath /api
func main() {
	// Startup Database
	database.Connect()

	// Startup Redis
	cache.CreatePool()
	
	// Define Fiber config.
	config := configs.FiberConfig()

	// Define a new Fiber app with config.
	app := fiber.New(config)

	// Websocket.
	mywebsocket.SetupWebsocket(app)

	// Middlewares.
	middleware.FiberMiddleware(app) // Register Fiber's middleware for app.

	// Routes.
	routes.SwaggerRoute(app)  // Register a route for API Docs (Swagger).
	routes.PublicRoutes(app)  // Register a public routes for app.
	routes.PrivateRoutes(app) // Register a private routes for app.
	routes.NotFoundRoute(app) // Register route for 404 Error.
	
	// Start server (with graceful shutdown).
	utils.StartServer(app)

}