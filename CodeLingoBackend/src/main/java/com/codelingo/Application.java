package com.codelingo;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
	public static Dotenv dotenv = Dotenv.configure()
			.directory("/Users/richaaard/CodeLingo/CodeLingoBackend/.env")
			.load();
	public static void main(String[] args) {

		SpringApplication.run(Application.class, args);
	}

}
