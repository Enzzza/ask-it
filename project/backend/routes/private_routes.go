package routes

import (
	"github.com/Enzzza/ask-it/project/backend/controllers"
	"github.com/Enzzza/ask-it/project/backend/middleware"
	"github.com/gofiber/fiber/v2"
)

// PrivateRoutes func for describe group of private routes.
func PrivateRoutes(a *fiber.App) {
	// Create routes group.
	route := a.Group("/api/v1")

	// AUTH ROUTES

	route.Get("/auth/me",middleware.JWTProtected(),middleware.SetClaims(), controllers.User) 
	route.Post("/auth/logout",middleware.JWTProtected(), controllers.Logout)
	route.Put("/auth/updatedetails", middleware.JWTProtected(),middleware.SetClaims(), controllers.UpdateDetails)
	route.Put("/auth/updatepassword",middleware.JWTProtected(),middleware.SetClaims(),controllers.UpdatePassword) 
	

	// POST ROUTES

	route.Post("/posts",middleware.JWTProtected(),middleware.SetClaims(),controllers.CreatePost) 
	route.Delete("/posts/:id", middleware.JWTProtected(),middleware.SetClaims(),controllers.DeletePost)
	route.Put("/posts/:id",middleware.JWTProtected(),middleware.SetClaims(),controllers.UpdatePost)


	//  USER ROUTES
	route.Get("/user/questions",middleware.JWTProtected(),middleware.SetClaims(), controllers.GetUserQuestions)
	
	route.Get("/user/questions/:page-:pageSize",middleware.JWTProtected(),middleware.SetClaims(),controllers.GetPaginatedUserQuestions)

	route.Get("/user/answers",middleware.JWTProtected(),middleware.SetClaims(), controllers.GetUserAnswers)

	route.Get("/user/votes",middleware.JWTProtected(),middleware.SetClaims(),controllers.GetUserVotes)

	// SCORE ROUTES
	route.Post("/scores/add",middleware.JWTProtected(),middleware.SetClaims(),controllers.AddScore)

	
}