package utils

import (
    "math/rand"
)

func GenerateProfileColor() (string,string){
	colors := []string{"red","purple","blue","green","orange"}
	shades := []string{"50","100","200","300","400","500","600","700","800","A100","A200","A400","A700"}
	
	randomColor := rand.Intn(len(colors))
	randomShade := rand.Intn(len(shades))
	

	return colors[randomColor], shades[randomShade]

}

