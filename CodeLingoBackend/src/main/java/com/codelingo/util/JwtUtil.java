package com.codelingo.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

import static com.codelingo.Application.dotenv;

public class JwtUtil {
    private static final long EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000L;

    public static String generateToken(Long userId) {
        String secretKey = dotenv.get("JWT_SECRET");
        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public static Long parseToken(String token) {
        try {
            String secretKey = dotenv.get("JWT_SECRET");
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

            String subject = claims.getSubject();
            return Long.valueOf(subject);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
