package com.codelingo.service;

import com.codelingo.entity.User;
import com.codelingo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean registerUser(String username) {
        if(userRepository.findByUsername(user.getUsername()) != null) {
            return false;
        }
        String hashed;
        User user = new User();
        user.setUsername(username);
        user.setPasswordHash(hashed);
        userRepository.save(user);
        return true;
    }
}
