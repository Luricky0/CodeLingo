package com.codelingo.controller;

import com.codelingo.entity.Progress;
import com.codelingo.service.ProgressService;
import com.codelingo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/progress")
public class ProgressController {
    @Autowired
    private ProgressService progressService;
    @Autowired
    private UserService userService;

    @PostMapping("/upload")
    ResponseEntity<?> uploadProgress(@RequestHeader("Authorization") String token,
                                     @RequestBody List<Progress> progresses) {
        System.out.println(token);
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Long userId = userService.getUserIdByToken(token);
        progressService.uploadProgressByUser(userId,progresses);

        return ResponseEntity.ok("Upload successful");
    }
}
