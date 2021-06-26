package database

import (
	"fmt"
	"os"
	"time"
	"github.com/Enzzza/ask-it/project/backend/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	retryCount := 30
	for {
		connection, err := gorm.Open(mysql.Open(os.Getenv("MYSQL_SERVER_URL")), &gorm.Config{})
		if err != nil {
			if retryCount == 0 {
				panic("could not connect to the database")
			}
			fmt.Printf("Could not connect to database. Wait 2 seconds. %d retries left...", retryCount)
			retryCount--
			time.Sleep(2 * time.Second)
			
		} else {
			DB = connection
			break
		}
		
	}


	fmt.Println("MySql started!")
	
	DB.AutoMigrate(&models.User{}, &models.Post{})


	
}