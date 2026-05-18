// package com.examly.springapp.security;


    

//     import io.jsonwebtoken.Jwts;
//     import io.jsonwebtoken.SignatureAlgorithm;
//     import org.springframework.stereotype.Component;
    
//     import java.util.Date;
    
//     @Component
//     public class JwtUtil {
    
//         private final String SECRET_KEY = "mySecretKey12345"; // replace with environment variable in production
//         private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour
    
//         // Generate JWT token using email
//         public String generateToken(String email) {
//             return Jwts.builder()
//                     .setSubject(email)
//                     .setIssuedAt(new Date())
//                     .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                     .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                     .compact();
//         }
//     }

// package com.examly.springapp.security;

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.Claims;
// import org.springframework.stereotype.Component;

// import java.util.Date;

// @Component
// public class JwtUtil {
//     private final String SECRET_KEY = "MySuperSecretKey"; // replace with env variable in production
//     private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

//     public String generateToken(String email) {
//         return Jwts.builder()
//                 .setSubject(email)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                 .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                 .compact();
//     }

//     public String extractEmail(String token) {
//         return Jwts.parser()
//                 .setSigningKey(SECRET_KEY)
//                 .parseClaimsJws(token)
//                 .getBody()
//                 .getSubject();
//     }

//     public boolean validateToken(String token, String email) {
//         String extractedEmail = extractEmail(token);
//         return (extractedEmail.equals(email) && !isTokenExpired(token));
//     }

//     private boolean isTokenExpired(String token) {
//         Date expiration = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getExpiration();
//         return expiration.before(new Date());
//     }
// }
package com.examly.springapp.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey key;

    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    public JwtUtil() {
        // Generate a secure key
        // You can replace this with a Base64 string stored in application.properties for production
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        System.out.println("JWT secret key (Base64): " + Base64.getEncoder().encodeToString(key.getEncoded()));
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token, String email) {
        String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}