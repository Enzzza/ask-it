package utils

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)


func GetPaginationMsg(c *fiber.Ctx,total int)(interface{},interface{}){
	page, _ := strconv.Atoi(c.Params("page"))
	pageSize, _ := strconv.Atoi(c.Params("pageSize"))
	startIndex := (page - 1) * pageSize;
	endIndex := page * pageSize;
	url := fmt.Sprintf("%s%s",c.BaseURL(),c.OriginalURL())
	url = strings.Replace(url, "http", "https",1)
	

	var nextPage int
	var prevPage int 
	var nextPageUrl interface{}
	var prevPageUrl interface{}

	if (endIndex < total) {
		nextPage = page + 1
	}
	if (startIndex > 0) {
		prevPage = page - 1
	}
	re := regexp.MustCompile(`([^\/]+$)`)
	indexOfSeparator := re.FindStringIndex(url)[0]

	if nextPage != 0 {
		nextPageUrl = url[:indexOfSeparator] + strconv.Itoa(nextPage) + url[indexOfSeparator+1:]
	} else {
		nextPageUrl = nil
	}

	if prevPage != 0 {
		prevPageUrl = url[:indexOfSeparator] + strconv.Itoa(prevPage) + url[indexOfSeparator+1:]
	} else {
		prevPageUrl = nil
	}
	
	return prevPageUrl, nextPageUrl
	
}
