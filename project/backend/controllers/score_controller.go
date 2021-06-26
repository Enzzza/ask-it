package controllers

import (
	"errors"
	"fmt"

	"github.com/Enzzza/ask-it/project/backend/database"
	"github.com/Enzzza/ask-it/project/backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// AddScore func will increment or decrement score count by one
// @Description Increment or decrement score
// @Summary Increment or decrement score by one
// @Tags Scores
// @Accept json
// @Param postID body integer true "Post ID"
// @Param vote body integer true "Vote"
// @Produce json
// @Success 200 {string} status "ok"
// @Security ApiKeyAuth
// @Router /v1/scores/add [post]
func AddScore(c *fiber.Ctx) error {
	var data map[string]int
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg" : "Couldn't parse JSON",
			"error" : true,
		})
	}
	id:= uint(data["postID"])
	vote:= data["vote"]
	
	if vote < -1 || vote > 1{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg" : "Vote can be only 1 or -1",
			"error" : true,
		})
	}

	err := database.DB.Transaction(func(tx *gorm.DB) error {
		// Get model if exist
		post:= &models.Post{}
		if err := tx.Where("id = ?", id).First(&post).Error; err != nil {
            return err
        }

		// Increment Counter
        if err := tx.Model(&post).Update("score", post.Score + (vote)).Error; err != nil {
            return err
        }
		return nil
	})
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"msg":   "Couldn't add view",
			"error": true,
		})
	}

	return c.JSON(fiber.Map{
		"msg": "Vote added",
		"error": false,
	})

}

// GetScore func will return score for given post
// @Description Return post score value
// @Summary Return post score value for given postID
// @Tags Scores
// @Accept json
// @Produce json
// @Param postID path integer  true "Post ID"
// @Success 200 {string} status "ok"
// @Router /v1/scores/get/:postID [get]
func GetScore(c *fiber.Ctx) error {
	id := c.Params("postID")
	post:= &models.Post{}
	err := database.DB.First(post, id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"msg":   "Couldn't find that post",
			"error": true,
		})
	}
	
	return c.JSON(fiber.Map{
		"msg": fmt.Sprintf("Score for post is %v", post.Score),
		"score": post.Score,
		"error": false,
	})
}


// GetTopScoreQuestions func will return list of hot questions
// @Description Return list of hot questions
// @Summary Return list of top questions
// @Tags Scores
// @Accept json
// @Produce json
// @Success 200 {array} models.Post
// @Router /v1/scores/top [get]
func GetTopScoreQuestions(c *fiber.Ctx) error {
	var posts []models.Post

	if err := database.DB.Order("score desc").Limit(20).Where("parent_id= ? AND score!= ?",0,0).Find(&posts).Error; err != nil{
		return c.JSON(fiber.Map{
			"msg": "Couldn't query database",
			"error": true,
		})
	}
	return c.JSON(fiber.Map{
		"msg": "List of top questions",
		"score": posts,
		"error": false,
	})
}

