package controllers

import (
	"errors"
	"fmt"

	"github.com/Enzzza/ask-it/project/backend/database"
	"github.com/Enzzza/ask-it/project/backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// AddView func will increment view count by one
// @Description Increment view
// @Summary Increment view count by one
// @Tags Views
// @Accept json
// @Param postID body integer true "Post ID"
// @Produce json
// @Success 200 {string} status "ok"
// @Router /v1/views [post]
func AddView(c *fiber.Ctx) error {
	var data map[string]uint
	
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg" : "Couldn't parse JSON",
			"error" : true,
		})
	}
	id:= data["postID"]

	
	err := database.DB.Transaction(func(tx *gorm.DB) error {
		// Get model if exist
		post:= &models.Post{}
		if err := tx.Where("id = ?", id).First(&post).Error; err != nil {
            return err
        }

		// Increment Counter
        if err := tx.Model(&post).Update("view_count", post.ViewCount+1).Error; err != nil {
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
		"msg": "View added",
		"error": false,
	})

}


// GetViews func will return views for given post
// @Description Return number of views
// @Summary Return number of views for given postID
// @Tags Views
// @Accept json
// @Produce json
// @Param postID path integer  true "Post ID"
// @Success 200 {string} status "ok"
// @Router /v1/views/:postID [get]
func GetViews(c *fiber.Ctx) error {
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
		"msg": fmt.Sprintf("Number of views for post %v", post.ViewCount),
		"views": post.ViewCount,
		"error": false,
	})
}