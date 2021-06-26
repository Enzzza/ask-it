package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/helmet/v2"
)

// FiberMiddleware provide Fiber's built-in middlewares.
// See: https://docs.gofiber.io/api/middleware

func FiberMiddleware(a *fiber.App) {
	a.Use(
		// Add CORS to each route.
		cors.New(),
		// Add simple logger.
		logger.New(),
		// Add helmet to secure app by setting various HTTP headers
		helmet.New(),
		// Add rate limiting
		limiter.New(
			limiter.Config{
				Max: 42,
				Next: func(c *fiber.Ctx) bool {
					
					excludePaths := []string{"views","scores"}
					var next bool
					for _, path := range excludePaths{
						next = strings.Contains(c.Route().Path, path)
					}
					return next
				},
			},
		),
	)
}