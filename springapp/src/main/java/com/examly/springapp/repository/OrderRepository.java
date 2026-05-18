

package com.examly.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Order;

// import com.examly.springapp.model.Order;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface OrderRepository extends JpaRepository<Order, Long> {
// }

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    // All orders that include at least one item for this vendor
    List<Order> findDistinctByOrderItems_Product_VendorId(Long vendorId);

    // Helpful for vendor authorization on a specific order
    Optional<Order> findByIdAndOrderItems_Product_VendorId(Long orderId, Long vendorId);
}