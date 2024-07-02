package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"strings"
)

func ToJava(fileName string) {
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
		columnIndex := -1

		for i, row := range rows {
			column := ""
			for j, colCell := range row {
				//fmt.Print(colCell, "\t")
				if colCell == "Table Name" {
					s = s + "public class " + cases.Title(language.Und, cases.NoLower).String(ToCamelCase(row[j+1]))
					s = s + " {\n"
				}

				if colCell == "Column Name" {
					columnIndex = i
					continue
				}

				if i > columnIndex && columnIndex != -1 {
					if j == 0 {
						column = ToCamelCase(colCell) + ";\n\n"
					}
					if j == 1 {
						//默认全转化为大写
						colCell = strings.ToUpper(colCell)
						if strings.Contains(colCell, "CHAR") {
							column = "    private String " + column
						}
						if strings.Contains(colCell, "BIGINT") {
							column = "    private Long " + column
						}
						if strings.Contains(colCell, "INT") && !strings.Contains(colCell, "BIGINT") {
							column = "    private INTEGER " + column
						}
						if strings.Contains(colCell, "NUMBER") {
							column = "    private INTEGER " + column
						}
					}
					if j == 4 {
						ts := ""
						if strings.Contains(colCell, "\n") {
							ts = "    /**\n"
							remarks := strings.Split(colCell, "\n")
							for _, remark := range remarks {
								ts = ts + "     * " + remark + "\n"
							}
							ts = ts + "     */\n"
						} else {
							column = "    //" + colCell + "\n" + column
						}
						column = ts + column
					}
				}
			}

			s = s + column
			fmt.Println()
		}

		s += "}"

		fmt.Println(s)

	}
}

func ToCamelCase(s string) string {
	s = strings.ToLower(s)
	words := strings.Split(s, "_")
	for i, word := range words {
		if i != 0 {
			words[i] = cases.Title(language.Und, cases.NoLower).String(word) // 将单词首字母转为大写
		} else {
			words[i] = strings.ToLower(word) // 首个单词保持小写
		}
	}
	return strings.Join(words, "")
}
