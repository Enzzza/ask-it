package models

import (
	"time"

	"gorm.io/gorm"
)


type User struct {
	Id        uint				`json:"id" gorm:"<-:create;primaryKey"`
	CreatedAt time.Time 	  	`json:"createdAt"`
	UpdatedAt time.Time	      	`json:"updatedAt"`
	DeletedAt gorm.DeletedAt  	`json:"deletedAt" gorm:"index"`
	Name      string         	`json:"name" validate:"required,lte=255"`
	Surname   string         	`json:"surname" validate:"required,lte=255"`
	Email     string         	`json:"email" gorm:"unique" validate:"required,email"`
	Password  []byte         	`json:"-"`
	AnswerCount uint			`json:"answerCount"`
	Posts []*Post				`gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:UserID"`
}	



