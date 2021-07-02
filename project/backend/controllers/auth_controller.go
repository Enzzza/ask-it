package controllers

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/Enzzza/ask-it/project/backend/cache"
	"github.com/Enzzza/ask-it/project/backend/database"
	"github.com/Enzzza/ask-it/project/backend/models"
	"github.com/Enzzza/ask-it/project/backend/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/iancoleman/strcase"
	"golang.org/x/crypto/bcrypt"
)

// Register func will register user.
// @Description Register user
// @Summary Make user account if email is not used
// @Tags Auth
// @Accept json
// @Produce json
// @Param name body string true "Name"
// @Param surname body string true "Surname"
// @Param email body string true "Email"
// @Param password body string true "Password"
// @Success 201 {object} models.User
// @Router /v1/auth/register [post]
func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg" : "Couldn't parse JSON",
			"error" : true,
		})
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	profileColor, profileShade := utils.GenerateProfileColor()

	user := models.User{
		Name:    strings.Title(strings.ToLower(data["name"])) ,
		Surname: strings.Title(strings.ToLower(data["surname"])),
		Email:    strings.ToLower(data["email"]),
		DisplayName: data["displayName"],
		ProfileColor: profileColor,
		ProfileShade: profileShade,
		Password: password,
	}

	// Create a new validator for a User model.
	validate := utils.NewValidator()

	// Validate user fields.
	if err := validate.Struct(user); err != nil {
		// Return, if some fields are not valid.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg":   utils.ValidatorErrors(err),
			"error": true,
		})
	}
	if result := database.DB.Create(&user); result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg": "User with that email already exist!",
			"error": true,
		})
	}
	msg := []cache.MsgToUser{}
	return sendTokenResponse(user,c,"Success you are registered!",msg)
	
}

// Login func will login user.
// @Description Login user
// @Summary Login user if email and password is correct
// @Tags Auth
// @Accept json
// @Produce json
// @Param email body string true "Email"
// @Param password body string true "Password"
// @Success 200 {string} status "ok"
// @Router /v1/auth/login [post]
func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg" : "Couldn't parse JSON",
			"error" : true,
		})
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)


	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"msg": "Email or password not correct!",
			"error": true,
		})
	}


	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"msg": "Email or password not correct!",
			"error": true,
		})
	}
	// Send msg that user recived while he was offline - use redis
	messages, err:= cache.GetMsgFromRedis(strconv.Itoa(int(user.Id)))
	if err !=  nil {
		messages = []cache.MsgToUser{}
	}


	return sendTokenResponse(user,c,"You are logged in!",messages)

}

// User func will return logged in user.
// @Description Return logged in user.
// @Summary Check jwt from cookie if valid return user
// @Tags Auth
// @Accept json
// @Produce json
// @Success 200 {object} models.User
// @Security ApiKeyAuth
// @Router /v1/auth/me [get]
func User(c *fiber.Ctx) error {

	var user models.User
	id := fmt.Sprintf("%v", c.Locals("id"))

	if result := database.DB.Where("id = ?", id).First(&user); result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg": "Couldn't find user!",
			"error": true,
		})
	}


	return c.JSON(fiber.Map{
		"msg": "Logged in user is:",
		"user": user,
		"error": false,
	})
}

// Logout func will logout user
// @Description Logout user.
// @Summary Remove http_only cookie (logout)
// @Tags Auth
// @Accept json
// @Produce json
// @Success 200 {string} status "ok"
// @Security ApiKeyAuth
// @Router /v1/auth/logout [post]
func Logout(c *fiber.Ctx) error {
	cookie := invalidateCookie()
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"msg": "Success you logged out!",
		"error": false,
	})
}

// Update details will update user details
// @Description Update user details
// @Summary Update user details name, surname or email
// @Tags Auth
// @Accept json
// @Produce json
// @Param email body string false "Email"
// @Param name body string false "Name"
// @Param surname body string false "Surname"
// @Param profileColor body string false "Profile Color"
// @Param profileShade body string false "Profile Shade"
// @Success 200 {string} status "ok"
// @Security ApiKeyAuth
// @Router /v1/auth/updatedetails [put]
func UpdateDetails(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg" : "Couldn't parse JSON",
			"error" : true,
		})
	}
	var user models.User
	id := fmt.Sprintf("%v", c.Locals("id"))

	if result := database.DB.Where("id = ?", id).First(&user); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg": "Couldn't update user details!",
			"error": true,
		})
	}

	updateData := make(map[string]interface{})
	for key, element := range data {
		
		snakeKey := strcase.ToSnake(key)
		updateData[snakeKey] = element
    }
	fmt.Println(updateData);
	if result := database.DB.Debug().Model(&user).Select("name","surname","email","profile_color","profile_shade").Updates(updateData); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg": "Couldn't update details!",
			"error": true,
		})
	}

	return c.JSON(fiber.Map{
		"msg": "Details updated!",
		"user": user,
		"error": false,
	})

}

// Update password will update user password
// @Description Update user password
// @Summary Update user password if current password is correct
// @Tags Auth
// @Accept json
// @Produce json
// @Param currentPassword body string true "Current password"
// @Param newPassword body string true "New password"
// @Success 200 {string} status "ok"
// @Security ApiKeyAuth
// @Router /v1/auth/updatepassword [put]
func UpdatePassword(c *fiber.Ctx) error {

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg" : "Couldn't parse JSON",
			"error" : true,
		})
	}

	var user models.User
	id := fmt.Sprintf("%v", c.Locals("id"))

	if result := database.DB.Where("id = ?", id).First(&user); result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg": "Couldn't find user!",
			"error": true,
		})
	}



	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["currentPassword"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"msg": "Current password not correct!",
			"error": true,
		})
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(data["newPassword"]), 14)
	if result := database.DB.Model(&user).Update("password", password); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"msg": "Couldn't update password!",
			"error": true,
		})
	}

	cookie := invalidateCookie()
	c.Cookie(&cookie)
	msg := []cache.MsgToUser{}
	return sendTokenResponse(user,c,"Password updated!",msg)

}

// Helper functions

// Generate new token, create cookie and send response
func sendTokenResponse(user models.User,c *fiber.Ctx,msg string, messages []cache.MsgToUser) error{


	token, err := utils.GenerateNewAccessToken(user.Id)

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"msg": "Couldn't login!",
			"error": true,
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	id := strconv.Itoa(int(user.Id))

	cache.RemoveMsgFromRedis(id)
	return c.JSON(fiber.Map{
		"msg": msg,
		"user": user,
		"error": false,
		"messages": messages,
	})

}

// Invalidate cookie
func invalidateCookie() fiber.Cookie{
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	return cookie
}