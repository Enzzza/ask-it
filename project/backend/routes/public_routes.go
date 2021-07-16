package routes

import (
	"github.com/Enzzza/ask-it/project/backend/controllers"
	"github.com/gofiber/fiber/v2"
)

// PublicRoutes func for describe group of public routes.
func PublicRoutes(a *fiber.App) {
	// Create routes group.
	route := a.Group("/api/v1")

	// AUTH ROUTES

	route.Post("/auth/register", controllers.Register)
	route.Post("/auth/login", controllers.Login)

	
	// SERVER HEALTH ROUTES

	route.Get("/status", controllers.Status)

		
	// POST ROUTES

	route.Get("/posts",controllers.GetPosts)
	route.Get("/posts/:id",controllers.GetPost)
	route.Get("/posts/question/:id",controllers.GetQuestionPost)

	// PUBLIC ROUTES

	route.Get("/public/questions",controllers.GetPublicQuestions)
	route.Get("/public/questions/:page-:pageSize",controllers.GetPaginatedPublicQuestions)
	route.Get("/public/questions/:userID",controllers.GetPublicQuestionsById)
	route.Get("/public/answers/:questionID",controllers.GetAnswersForQuestion)
	route.Get("/public/top-answers",controllers.GetUsersWithMostAnswers)
	

	// VIEW ROUTES
	route.Post("/views",controllers.AddView)
	route.Get("/views/:postID",controllers.GetViews)

	// SCORE ROUTES
	route.Get("/scores/get/:postID",controllers.GetScore)
	route.Get("/scores/top",controllers.GetTopScoreQuestions)

	// USER ROUTES
	route.Get("/user/profile/:id", controllers.GetUserProfile)
	route.Get("/user/:userID/questions/:page-:pageSize",controllers.GetPaginatedUserQuestions)

}	