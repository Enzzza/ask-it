package middleware

import (
	"time"

	"github.com/Enzzza/ask-it/project/backend/utils"
	"github.com/gofiber/fiber/v2"
)

func SetClaims() func(c *fiber.Ctx) error{
	return func(c *fiber.Ctx) error {
		claims, err := utils.ExtractTokenMetadata(c)
		if err != nil {
			// Return status 500 and JWT parse error.
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": true,
				"msg":   err.Error(),
			})
		}
		// Get now time.
		now := time.Now().Unix()

		// Set expiration time from JWT data of current user
		expires := claims.Expires
		
		// Checking, if now time greather than expiration from JWT.
		if now > expires {
			// Return status 401 and unauthorized error message.
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": true,
				"msg":   "Unauthorized, check expiration time of your token",
			})
		}	
		c.Locals("id",claims.Issuer)
		return c.Next()
	}
}