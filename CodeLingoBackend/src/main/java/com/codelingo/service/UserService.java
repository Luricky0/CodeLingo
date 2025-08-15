package com.codelingo.service;

import com.codelingo.dto.AuthResponse;
import com.codelingo.entity.User;
import com.codelingo.repository.UserRepository;
import com.codelingo.util.JwtUtil;
import com.codelingo.util.PasswordUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Long getUserIdByToken(String token) {
        return JwtUtil.parseToken(token);
    }

    @Transactional
    public boolean registerUser(String email,String password) {
        if(userRepository.findUserByEmail(email).isPresent()) {
            return false;
        }
        String passwordHashed = PasswordUtil.encodePassword(password);
        User user = new User();
        user.setEmail(email);
        user.setUsername(email);
        user.setPasswordHash(passwordHashed);
        try {
            userRepository.save(user);
        }catch (DataIntegrityViolationException e) {
            return false;
        }
        return true;
    }

    public AuthResponse loginUser(String email, String password) {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isPresent()) {
            boolean matches = PasswordUtil.matches(password, user.get().getPasswordHash());
            if(matches){
                String token = JwtUtil.generateToken(user.get().getId());
                return new AuthResponse(token, user.get().getId().toString());
            }
            return null;
        }else{
            return null;
        }
    }
}
