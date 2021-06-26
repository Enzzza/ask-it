package utils

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)


func Paginate(c *fiber.Ctx) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		page, _ := strconv.Atoi(c.Params("page"))
		pageSize, _ := strconv.Atoi(c.Params("pageSize"))


		if page == 0 {
			page = 1
		}
		switch {
		case pageSize > 100:
			pageSize = 100
		case pageSize <= 0:
			pageSize = 20
		}

		offset := (page - 1) * pageSize
		return db.Offset(offset).Limit(pageSize)
	}
}
