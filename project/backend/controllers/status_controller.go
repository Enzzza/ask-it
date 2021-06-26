package controllers

import "github.com/gofiber/fiber/v2"


// Status func will return status of server.
// @Description Check server status
// @Summary Check if server is runing
// @Tags Status
// @Accept json
// @Produce json
// @Success 200 {string} status "ok"
// @Router /v1/status [get]
func Status(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"msg": "Server is runing!",
		"error": false,
	})
}