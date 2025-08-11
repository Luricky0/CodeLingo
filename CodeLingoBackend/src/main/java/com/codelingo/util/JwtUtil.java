package com.codelingo.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import io.github.cdimascio.dotenv.Dotenv;



import java.util.Date;

import static com.codelingo.Application.dotenv;

public class JwtUtil {
    private static final long EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000L;

    public static String generateToken(String email) {

        String secretKey = dotenv.get("JWT_SECRET");
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
