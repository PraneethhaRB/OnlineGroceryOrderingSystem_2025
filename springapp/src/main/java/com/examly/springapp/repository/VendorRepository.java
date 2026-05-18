// package com.examly.springapp.repository;

// public class VendorRepository {
    
// }
// package com.examly.springapp.repository;

// import com.examly.springapp.model.Vendor;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface VendorRepository extends JpaRepository<Vendor, Long> {


//     Vendor findByEmail(String email);


// }
package com.examly.springapp.repository;

import com.examly.springapp.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
    Optional<Vendor> findByEmail(String email);
}