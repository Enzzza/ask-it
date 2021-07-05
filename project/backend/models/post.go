package models

import (
	_"encoding/json"
	_"fmt"
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
	Title     		string         		`json:"title" validate:"required,lte=155"`
	Body   	  		string         		`json:"body" validate:"required,lte=30000"`
	AnswerCount 	uint				`json:"answerCount" gorm:"default:0"`
	ViewCount 		uint				`json:"viewCount" gorm:"default:0"`
	Score			int					`json:"score" gorm:"default:0"`
	ParentId		uint				`json:"parentId" gorm:"default:0"`
	UserID 			uint				`json:"userID" validate:"required"`
}	

// When user add new post check if it its type of answer(>0)
// Send msg over websocket to user which we find via post-> ParentID find UserID of that post and send msg to user with that UserID
func (p *Post) AfterSave(tx *gorm.DB) (err error) {
	if p.ParentId > 0 {
		post:= &Post{}
	  	user:= &User{}
	  	tx.First(&post, p.ParentId)
	  	tx.First(&user,p.UserID)
	  
	  	tx.Model(&User{}).Where("id = ?",p.UserID).Update("answer_count", user.AnswerCount + 1)
	  	tx.Model(&Post{}).Where("id = ?", p.ParentId).Update("answer_count", post.AnswerCount + 1)

	  	// Emit the message directly to specified user except if orginal author answer to his question

		if p.UserID != post.UserID {
			userID := strconv.Itoa(int(post.UserID))
			mywebsocket.SendMsgToUser(userID,post,user,p)

		} 
		
	}
	return
  } 

