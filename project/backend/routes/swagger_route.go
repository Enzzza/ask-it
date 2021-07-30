package routes

import (
	_ "github.com/Enzzza/ask-it/project/backend/docs"
	swagger "github.com/arsmn/fiber-swagger/v2"
	"github.com/gofiber/fiber/v2"
)

// SwaggerRoute func for describe group of API Docs routes.
func SwaggerRoute(a *fiber.App) {
	// Create routes group.
	route := a.Group("/api/docs/")
	
	// Routes for GET method:
	route.Get("*",swagger.Handler)
}


