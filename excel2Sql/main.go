package main

import (
	"fmt"
)

func main() {
	fileName := "/Users/maximusyoung/Desktop/副本bookkeeping_MySQL.xlsx"
	//fmt.Println(os.Args[0])
	//fileName := os.Args[1]
	fmt.Println("生成SQL...")
	ToSql(fileName)
	fmt.Println("生成Java...")
	ToJava(fileName)
}
