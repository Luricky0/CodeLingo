package com.codelingo.controller;

import com.codelingo.dto.AuthResponse;
import com.codelingo.entity.User;
import com.codelingo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController // 返回 JSON
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        boolean success = userService.registerUser(email,password);
        return success ? "User registered successfully" : "Registration failed: user already exists";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        AuthResponse response = userService.loginUser(email,password);
        if(response != null) {
            return ResponseEntity.ok(response);
        }else{
            return ResponseEntity.status(404).body("Invalid email or password");
        }
    }
}