package com.maximus;

import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableDubbo
@MapperScan("com.maximus.mapper")
public class BookKeepingApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookKeepingApplication.class, args);
    }
}
