package utils

import (
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

// TokenMetadata struct to describe metadata in JWT.
type TokenMetadata struct {
	Expires int64
	Issuer string
}

// ExtractTokenMetadata func to extract metadata from JWT.
func ExtractTokenMetadata(c *fiber.Ctx) (*TokenMetadata, error) {
	token, err := verifyToken(c)
	if err != nil {
		return nil, err
	}
	
	// Setting and checking token and credentials.
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		// Expires time.
		expires := int64(claims["exp"].(float64))
		issuer := string(claims["iss"].(string))

		return &TokenMetadata{
			Expires: expires,
			Issuer: issuer,
		}, nil
	}

	return nil, err
}

func verifyToken(c *fiber.Ctx) (*jwt.Token, error) {
	tokenString := c.Cookies("jwt")

	token, err := jwt.Parse(tokenString, jwtKeyFunc)
	if err != nil {
		return nil, err
	}

	return token, nil
}

func jwtKeyFunc(token *jwt.Token) (interface{}, error) {
	return []byte(os.Getenv("JWT_SECRET_KEY")), nil
}