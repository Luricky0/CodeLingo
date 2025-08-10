package com.codelingo.service;

import com.codelingo.entity.User;
import com.codelingo.repository.UserRepository;
import com.codelingo.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean registerUser(String email,String username, String password) {
        if(userRepository.findUserByEmail(email) != null) {
            return false;
        }
        String passwordHashed = PasswordUtil.encodePassword(password);
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPasswordHash(passwordHashed);
        try {
            userRepository.save(user);
        }catch (DataIntegrityViolationException e) {
            return false;
        }
        return true;
    }

    public boolean loginUser(String email, String password) {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isPresent()) {
            boolean matches = PasswordUtil.matches(password, user.get().getPasswordHash());
            return matches;
        }else{
            return false;
        }
    }
}
