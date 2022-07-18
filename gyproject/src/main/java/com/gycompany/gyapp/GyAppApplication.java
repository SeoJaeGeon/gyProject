package com.gycompany.gyapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

//@SpringBootApplication
@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class GyAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(GyAppApplication.class, args);
	}

}
