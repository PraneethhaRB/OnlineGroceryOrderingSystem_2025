// package com.examly.springapp.service;

// public class UserService {
    
// }
// package com.examly.springapp.service;

// import com.examly.springapp.model.User;
// import com.examly.springapp.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class UserService {
//     @Autowired
//     private UserRepository userRepository;

//     public List<User> getAllUsers() {
//         return userRepository.findAll();
//     }

//     public Optional<User> getUserById(Long id) {
//         return userRepository.findById(id);
//     }

//     public User createUser(User user) {
//         return userRepository.save(user);
//     }
// }
// package com.examly.springapp.service;

// import com.examly.springapp.model.User;
// import com.examly.springapp.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class UserService {
//     @Autowired
//     private UserRepository userRepository;

//     public List<User> getAllUsers() {
//         return userRepository.findAll();
//     }

//     public Optional<User> getUserById(Long id) {
//         return userRepository.findById(id);
//     }

//     public User createUser(User user) {
//         return userRepository.save(user);
//     }

//     public User updateUser(Long id, User updatedUser) {
//         return userRepository.findById(id).map(user -> {
//             user.setName(updatedUser.getName());
//             user.setEmail(updatedUser.getEmail());
//             user.setPassword(updatedUser.getPassword());
//             return userRepository.save(user);
//         }).orElseThrow(() -> new RuntimeException("User not found"));
//     }

//     public void deleteUser(Long id) {
//         userRepository.deleteById(id);
//     }

//     // // 🔹 Login method
//     // public Optional<User> login(String email, String password) {
//     //     return userRepository.findByEmail(email)
//     //             .filter(user -> user.getPassword().equals(password));
//     // }
//      public Optional<User> login(String email, String password) {
//         // 🔎 Find user by email
//         Optional<User> user = userRepository.findByEmail(email);

//         if (user.isPresent()) {
//             // ✅ Debug log
//             System.out.println("Login attempt: " + email + " / entered=" + password + " / stored=" + user.get().getPassword());

//             // ✅ Compare plain text password
//             if (user.get().getPassword().equals(password)) {
//                 return user;
//             }
//         }

//         System.out.println("❌ Login failed for email: " + email);
//         return Optional.empty();
//     }
// }
// package com.examly.springapp.service;

// public class UserService {
    
// }
// package com.examly.springapp.service;

// import com.examly.springapp.model.User;
// import com.examly.springapp.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class UserService {
//     @Autowired
//     private UserRepository userRepository;

//     public List<User> getAllUsers() {
//         return userRepository.findAll();
//     }

//     public Optional<User> getUserById(Long id) {
//         return userRepository.findById(id);
//     }

//     public User createUser(User user) {
//         return userRepository.save(user);
//     }
// }
package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }



}

