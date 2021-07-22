package controllers

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/Enzzza/ask-it/project/backend/database"
	"github.com/Enzzza/ask-it/project/backend/models"
	"github.com/Enzzza/ask-it/project/backend/utils"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// CreatePost func will create new Post
// @Description Create post
// @Summary Create new post in database
// @Tags Post
// @Accept json
// @Produce json
// @Param title body string false "Title"
// @Param body body string true "Body"
// @Param parentID body integer false "Parent ID"
// @Success 201 {object} models.Post
// @Security ApiKeyAuth
// @Router /v1/posts [post]
func CreatePost(c *fiber.Ctx) error{

	// Create new Post struct
	post := &models.Post{}
	var uId uint
	if id, convErr := strconv.Atoi(fmt.Sprintf("%v", c.Locals("id"))); convErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg" : "Couldn't parse UserID",
			"error" : true,
		})
	}else {
		uId = uint(id)
	}
	post.UserID = uId;

	// Check, if received JSON data is valid.
	if err := c.BodyParser(post); err != nil {
		// Return status 400 and error message.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg" : "Couldn't parse JSON",
			"error" : true,
		})
	}
	

	// Create a new validator for a Post model.
	validate := utils.NewValidator()
	// Validate post fields.
	if err := validate.Struct(post); err != nil {
		// Return, if some fields are not valid.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg":   utils.ValidatorErrors(err),
			"error": true,
		})
	}
	user:= &models.User{}
	err := database.DB.First(user, post.UserID).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"msg":   "Couldn't find that user",
			"error": true,
		})
	}

	user.Posts = append(user.Posts, post)
	database.DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(&user)
	
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"msg":   fmt.Sprintf("Post created with id: %v",post.Id),
		"error": false,
		"post": post,
	})

}

// GetPosts func will return all posts(questions,answers)
// @Description Return all posts
// @Summary Return all posts from database
// @Tags Post
// @Accept json
// @Produce json
// @Success 200 {array} models.Post
// @Router /v1/posts [get]
func GetPosts(c *fiber.Ctx) error {
	var posts []models.Post

	if result := database.DB.Find(&posts); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"msg": "Couldn't find any post!",
			"error": true,
		})
	}
	var msg = fmt.Sprintf("Number of posts found: %v",len(posts))
	return c.JSON(fiber.Map{
		"msg": msg,
		"posts": posts,
		"error": false,
		"count": len(posts),
	})


}

// GetPost func will return one post(question or answer)
// @Description Return one post
// @Summary Return one post for given id
// @Tags Post
// @Accept json
// @Produce json
// @Param id path integer  true "Post ID"
// @Success 200 {object} models.Post
// @Router /v1/posts/:id [get]
func GetPost(c *fiber.Ctx) error {
	id := c.Params("id")
	post:= &models.Post{}
	err := database.DB.First(post, id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"msg":   "Couldn't find that post",
			"error": true,
		})
	}
	
	return c.JSON(fiber.Map{
		"msg": "Post found",
		"post": post,
		"error": false,
	})
}

// GetQuestionPost func will return one question post
// @Description Return one question post
// @Summary Return post if its of type question
// @Tags Post
// @Accept json
// @Produce json
// @Param id path integer  true "Post ID"
// @Success 200 {object} models.Post
// @Router /v1/posts/question/:id [get]
func GetQuestionPost(c *fiber.Ctx) error {
	id := c.Params("id")
	post:= &models.Post{}
	err := database.DB.Where("id = ? AND parent_id= ?",id,0).First(post).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"msg":   "Couldn't find that post",
			"error": true,
		})
	}
	
	return c.JSON(fiber.Map{
		"msg": "Post found",
		"post": post,
		"error": false,
	})
}

// DeletePost func for deleting post by given ID.
// @Description Delete post by given ID.
// @Summary delete post by given ID if user is authorized
// @Tags Post
// @Accept json
// @Produce json
// @Param id path integer true "Post ID"
// @Success 200 {object} models.Post
// @Security ApiKeyAuth
// @Router /v1/posts/:id [delete]
func DeletePost(c *fiber.Ctx) error {
	postId := c.Params("id")
	userId, convErr := strconv.Atoi(fmt.Sprintf("%v", c.Locals("id"))) 
	
	if convErr != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg" : "Couldn't parse UserID",
			"error" : true,
		})
	}

	
	post := &models.Post{}
	database.DB.First(&post, postId)
	if post.Id == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"msg": fmt.Sprintf("Post not found with id of %v", postId),
			"error": true,
		})
    }
	

	if uint(userId) !=  post.UserID{
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"msg": fmt.Sprintf("User with id of %v is not authorized to delete this post", userId),
			"error": true,
		})
	}

	if result := database.DB.Delete(&post); result.Error != nil {
		return c.JSON(fiber.Map{
			"msg": "Couldn't delete that post!",
			"error": true,
		})
	}

	return c.JSON(fiber.Map{
		"msg": "Post deleted",
		"post": post,
		"error": false,
	})

}

// UpdatePost func for Updating post by given ID.
// @Description Update post by given ID.
// @Summary Upadate post by given ID if user is authorized
// @Tags Post
// @Accept json
// @Produce json
// @Param id path integer true "Post ID"
// @Param title body string false "Title"
// @Param body body string true "Body"
// @Success 200 {object} models.Post
// @Security ApiKeyAuth
// @Router /v1/posts/:id [put]
func UpdatePost(c *fiber.Ctx) error{
	postId := c.Params("id")
	userId, convErr := strconv.Atoi(fmt.Sprintf("%v", c.Locals("id"))) 
	
	if convErr != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg" : "Couldn't parse UserID",
			"error" : true,
		})
	}
	
	post:= &models.Post{}
	database.DB.First(&post, postId)
	if post.Id == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"msg": fmt.Sprintf("Post not found with id of %v", postId),
			"error": true,
		})
    }
	

	if uint(userId) !=  post.UserID{
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"msg": fmt.Sprintf("User with id of %v is not authorized to update this post", userId),
			"error": true,
		})
	}

	// Create new Post map
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg" : "Couldn't parse JSON",
			"error" : true,
		})
	}
	
	updateData := make(map[string]interface{})
	for key, element := range data {
		updateData[key] = element
    }	

	user:= &models.User{}
	err := database.DB.First(user, post.UserID).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"msg":   "Couldn't find that user",
			"error": true,
		})
	}

	if err := database.DB.Model(&post).Select("body","title").Updates(updateData).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg":   "Couldn't update post!",
			"error": true,
		})
	}
	database.DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(&user)



	return c.JSON(fiber.Map{
		"msg": "Post updated",
		"post": post,
		"error": false,
	})
		
}


