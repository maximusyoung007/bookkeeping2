package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
	"strconv"
	"strings"
)

func ToSql(fileName string) {
	//f, err := excelize.OpenFile("/Users/maximusyoung/Desktop/副本bookkeeping.xlsx")
	f, err := excelize.OpenFile(fileName)

	if err != nil {
		fmt.Println(err)
		return
	}

	list := f.GetSheetList()
	for _, sheetName := range list {
		//fmt.Println(sheetName)
		cell, _ := f.GetCellValue(sheetName, "A1")
		//如果A1不是“Table Name”，那么这个sheet不需要生成SQL
		if cell != "Table Name" {
			continue
		}

		rows, err := f.GetRows(sheetName)
		if err != nil {
			fmt.Println(err)
			return
		}

		//拼接sql语句
		s := ""
		indexStr := ""
		primaryStr := ""
		uniqueStr := ""
		tableName := ""
		k := 0
		u := 0
		columnIndex := -1

		for i, row := range rows {
			for j, colCell := range row {
				//fmt.Print(colCell, "\t")
				if colCell == "Table Name" {
					tableName = row[j+1]
					s = s + "CREATE TABLE " + row[j+1]
					s = s + "(\n"
				}

				if strings.Contains(colCell, "PRIMARY KEY") {
					primaryStr += colCell + "\n"
				}

				if strings.Contains(colCell, "UNIQUE") {
					uniqueStr += "ALTER TABLE " + tableName + " ADD constraint u_" +
						tableName + strconv.Itoa(u) + " unique" +
						strings.Replace(colCell, "UNIQUE", "", 1) + ";\n"
					u++
				}

				if strings.Contains(colCell, "INDEX") {
					//indexStr += "ALTER TABLE " + tableName + " ADD INDEX index" + strconv.Itoa(k) + " " +
					//	strings.Replace(colCell, "INDEX", "", 1) + "\n"
					indexStr += "create index " + "i_" + tableName + strconv.Itoa(k) + " on " +
						tableName + strings.Replace(colCell, "INDEX", "", 1) + ";\n"
					k++
				}

				if colCell == "Column Name" {
					columnIndex = i
					continue
				}

				if i > columnIndex && columnIndex != -1 {
					if j < 3 {
						s = s + " " + colCell + " "
					}
					if j == 3 && colCell != "" {
						s = s + " DEFAULT " + colCell + " "
					}
					if j == 4 {
						s = s + "comment '" + colCell + "',\n"
					}
				}
			}
			fmt.Println()
		}

		s = s + primaryStr + ")ENGINE=InnoDB DEFAULT CHARSET=utf8;\n"
		s = s + uniqueStr
		s = s + indexStr

		if strings.Contains(fileName, "MySQL") {
			s = strings.ToLower(s)
		}

		fmt.Println(s)

	}
}
