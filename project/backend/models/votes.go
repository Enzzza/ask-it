package models

type Vote struct{
	Id uint `json:"id"`
	Vote int `json:"vote"`
}

type Votes struct {
	Posts map[string]Vote `json:"posts"`
}

