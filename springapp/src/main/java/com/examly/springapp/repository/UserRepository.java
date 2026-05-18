// package com.examly.springapp.repository;

// public class UserRepository {
    
// }
//correct
// package com.examly.springapp.repository;

// import com.examly.springapp.model.User;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface UserRepository extends JpaRepository<User, Long> {
//     User findByEmail(String email);
// }
//correct
package com.examly.springapp.repository;

import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
