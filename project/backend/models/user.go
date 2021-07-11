package models

import (
	"time"

	"gorm.io/gorm"
	"gorm.io/datatypes"

)


type User struct {
	Id        uint				`json:"id" gorm:"<-:create;primaryKey"`
	CreatedAt time.Time 	  	`json:"createdAt"`
	UpdatedAt time.Time	      	`json:"updatedAt"`
	DeletedAt gorm.DeletedAt  	`json:"deletedAt" gorm:"index"`
	Name      string         	`json:"name" validate:"lte=255"`
	Surname   string         	`json:"surname" validate:"lte=255"`
	Email     string         	`json:"email" gorm:"unique" validate:"required,email"`
	DisplayName string          `json:"displayName" gorm:"unique" validate:"required"`
	ProfileColor string         `json:"profileColor" gorm:"column:profile_color"`
	ProfileShade string         `json:"profileShade" gorm:"column:profile_shade"`
	Password  []byte         	`json:"-"`
	AnswerCount uint			`json:"answerCount"`
	Votes datatypes.JSON		`json:"votes"`
	Posts []*Post				`json:"posts" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:UserID"`
}	



