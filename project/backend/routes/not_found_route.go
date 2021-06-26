package routes

import "github.com/gofiber/fiber/v2"

// NotFoundRoute func to describe 404 Error route.
func NotFoundRoute(a *fiber.App) {
	// Register new special route.
	a.Use(
		// Anon function.
		func(c *fiber.Ctx) error {
			// Return HTTP 404 status and JSON response.
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": true,
				"msg":   "Sorry, we can’t find the page you were looking for.",
			})
		},
	)
}