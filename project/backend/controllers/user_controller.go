package controllers

import (
	"fmt"
	"strconv"

	"github.com/Enzzza/ask-it/project/backend/database"
	"github.com/Enzzza/ask-it/project/backend/models"
	"github.com/Enzzza/ask-it/project/backend/utils"
	"github.com/gofiber/fiber/v2"
)

// GetUserQuestions func will return user questions
// @Description Return all user questions
// @Summary Return all questions for logged user
// @Tags User
// @Accept json
// @Produce json
// @Success 200 {array} models.Post
// @Security ApiKeyAuth
// @Router /v1/user/questions [get]
func GetUserQuestions(c *fiber.Ctx) error {
	id, convErr := strconv.Atoi(fmt.Sprintf("%v", c.Locals("id")))
	if convErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg" : "Couldn't parse UserID",
			"error" : true,
		})
	}

	var userQuestions []models.Post
	database.DB.Debug().Where("user_id = ? AND parent_id= ?",id,0).Find(&userQuestions)
	
	return c.JSON(fiber.Map{
		"msg": fmt.Sprintf("Number of question found %v", len(userQuestions)),
		"questions": userQuestions,
		"error": false,
	})
}

// GetPaginatedUserQuestions func will return all questions in range
// @Description Return all questions in range 
// @Summary Return all questions in range sent by user
// @Tags User
// @Accept json
// @Produce json
// @Param page path integer  true "Page"
// @Param pageSize path integer  true "Page Size"
// @Success 200 {array} models.Post
// @Security ApiKeyAuth
// @Router /v1/user/questions/:page-:pageSize [get]
func GetPaginatedUserQuestions(c *fiber.Ctx) error {
	id, convErr := strconv.Atoi(fmt.Sprintf("%v", c.Locals("id")))
	if convErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg" : "Couldn't parse UserID",
			"error" : true,
		})
	}
	var userQuestions []models.Post
	if err := database.DB.Scopes(utils.Paginate(c)).Where("user_id = ? AND parent_id= ?",id,0).Find(&userQuestions).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg": "Couldn't query database!",
			"error": true,
		})
	}
	return c.JSON(fiber.Map{
		"msg": fmt.Sprintf("Number of question found %v", len(userQuestions)),
		"questions": userQuestions,
		"error": false,
	})
}


// GetUserAnswers func will return user answers
// @Description Return all user answers
// @Summary Return all answers for logged user
// @Tags User
// @Accept json
// @Produce json
// @Success 200 {array} models.Post
// @Security ApiKeyAuth
// @Router /v1/user/answers/ [get]
func GetUserAnswers(c *fiber.Ctx) error {
	id, convErr := strconv.Atoi(fmt.Sprintf("%v", c.Locals("id")))
	if convErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg" : "Couldn't parse UserID",
			"error" : true,
		})
	}

	var userAnswers []models.Post
	database.DB.Debug().Where("user_id = ? AND parent_id> ?",id,0).Find(&userAnswers)
	
	return c.JSON(fiber.Map{
		"msg": fmt.Sprintf("Number of answers found %v", len(userAnswers)),
		"answers": userAnswers,
		"error": false,
	})
}