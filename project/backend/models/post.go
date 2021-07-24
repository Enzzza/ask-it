package models

import (
	"strconv"
	"time"

	"github.com/Enzzza/ask-it/project/backend/mywebsocket"
	"gorm.io/gorm"
)

type Post struct {
	Id        		uint				`json:"id" gorm:"<-:create;primaryKey"`
	CreatedAt 		time.Time 	  		`json:"createdAt"`
	UpdatedAt 		time.Time	      	`json:"updatedAt"`
	DeletedAt 		gorm.DeletedAt  	`json:"deletedAt" gorm:"index"`
	Title     		string         		`json:"title" validate:"lte=155"`
	Body   	  		string         		`json:"body" validate:"required,lte=30000"`
	AnswerCount 	uint				`json:"answerCount" gorm:"default:0"`
	ViewCount 		uint				`json:"viewCount" gorm:"default:0"`
	Score			int					`json:"score" gorm:"default:0"`
	ParentId		uint				`json:"parentId" gorm:"default:0"`
	UserID 			uint				`json:"userID" validate:"required"`
}	


func (p *Post) AfterSave(tx *gorm.DB) (err error) {

	
	if p.ParentId > 0 && p.CreatedAt.Equal(p.UpdatedAt) {
		post:= &Post{}
	  	user:= &User{}
	  	tx.First(&post, p.ParentId)
	  	tx.First(&user,p.UserID)

	  
	  	tx.Model(&User{}).Where("id = ?",p.UserID).Update("answer_count", user.AnswerCount + 1)
	  	tx.Model(&Post{}).Where("id = ?", p.ParentId).Update("answer_count", post.AnswerCount + 1)


		if p.UserID != post.UserID {
			userID := strconv.Itoa(int(post.UserID))
			mywebsocket.SendMsgToUser(userID,post,user,p)

		} 
		
	}
	return
  } 

func (p *Post) AfterDelete(tx *gorm.DB) (err error){
	if p.ParentId > 0 {
		post:= &Post{}
	  	user:= &User{}

	  	tx.First(&post, p.ParentId)
	  	tx.First(&user,p.UserID)
	  	tx.Model(&User{}).Where("id = ?",p.UserID).Update("answer_count", user.AnswerCount -1)
	  	tx.Model(&Post{}).Where("id = ?", p.ParentId).Update("answer_count", post.AnswerCount - 1)
	}
	return

}