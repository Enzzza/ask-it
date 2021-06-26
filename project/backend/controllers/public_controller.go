package controllers

import (
	"fmt"

	"github.com/Enzzza/ask-it/project/backend/database"
	"github.com/Enzzza/ask-it/project/backend/models"
	"github.com/Enzzza/ask-it/project/backend/utils"
	"github.com/gofiber/fiber/v2"
	_ "gorm.io/gorm"
)

// GetPublicQuestions func will return all questions
// @Description Return all questions
// @Summary Return all questions
// @Tags Public
// @Accept json
// @Produce json
// @Success 200 {array} models.Post
// @Router /v1/public/questions [get]
func GetPublicQuestions(c *fiber.Ctx) error {
	var publicQuestions []models.Post
	if err := database.DB.Debug().Where("parent_id= ?",0).Find(&publicQuestions).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg": "Couldn't query database!",
			"error": true,
		})
	}
	
	return c.JSON(fiber.Map{
		"msg": fmt.Sprintf("Number of question found %v", len(publicQuestions)),
		"questions": publicQuestions,
		"error": false,
	})
}

// GetPaginatedPublicQuestions func will return all questions in range
// @Description Return all questions in range 
// @Summary Return all questions in range sent by user
// @Tags Public
// @Accept json
// @Produce json
// @Param page path integer  true "Page"
// @Param pageSize path integer  true "Page Size"
// @Success 200 {array} models.Post
// @Router /v1/public/questions/:page-:pageSize [get]
func GetPaginatedPublicQuestions(c *fiber.Ctx) error {
	var publicQuestions []models.Post
	if err := database.DB.Scopes(utils.Paginate(c)).Where("parent_id= ?",0).Find(&publicQuestions).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg": "Couldn't query database!",
			"error": true,
		})
	}
	return c.JSON(fiber.Map{
		"msg": fmt.Sprintf("Number of question found %v", len(publicQuestions)),
		"questions": publicQuestions,
		"error": false,
	})

}


// GetAnswersForQuestion func will return user answers for question
// @Description Return all user answers 
// @Summary Return all answers for provided questionid
// @Tags Public
// @Accept json
// @Produce json
// @Param questionID path integer  true "Question ID"
// @Success 200 {array} models.Post
// @Router /v1/public/answers/:questionID [get]
func GetAnswersForQuestion(c *fiber.Ctx) error {
	id := c.Params("questionID")
	var answers []models.Post
	if err:= database.DB.Debug().Where("id != ? AND parent_id= ?",id,id).Find(&answers).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg": "Couldn't query database!",
			"error": true,
		})
	}
	
	return c.JSON(fiber.Map{
		"msg": fmt.Sprintf("Number of answers found for question %v", len(answers)),
		"answers": answers,
		"error": false,
	})
	
}

// GetUsersWithMostAnswers func will return users with most answers
// @Description Return list of users
// @Summary Return list of users with most answers
// @Tags Public
// @Accept json
// @Produce json
// @Success 200 {array} models.User
// @Router /v1/public/top-answers [get]
func GetUsersWithMostAnswers(c *fiber.Ctx) error {
	var answers []models.User

	if err := database.DB.Order("answer_count desc").Limit(20).Where("answer_count > ?",0).Find(&answers).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg": "Couldn't query database!",
			"error": true,
		})
	}
	
	return c.JSON(fiber.Map{
		"msg": fmt.Sprintf("Users who have one or more answers %v", len(answers)),
		"answers": answers,
		"error": false,
	})
}