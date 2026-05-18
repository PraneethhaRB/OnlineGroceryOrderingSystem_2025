// package com.examly.springapp.repository;

// import com.examly.springapp.model.Product;


// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.List;

// @Repository
// public interface ProductRepository extends JpaRepository<Product, Long> {
//     List<Product> findByCategory(String category);
//     //change
//     // List<Product> findByVendor(Vendors vendor);
// }

package com.examly.springapp.repository;

import com.examly.springapp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // List<Product> findByCategory(String category);
    List<Product> findByCategoryIgnoreCase(String category);
    List<Product> findByVendorId(Long vendorId);

}
