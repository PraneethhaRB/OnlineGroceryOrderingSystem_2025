// //correct
// package com.examly.springapp.model;

// import jakarta.persistence.*;
// import jakarta.validation.constraints.*;
// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;

// import com.fasterxml.jackson.annotation.JsonBackReference;
// import com.fasterxml.jackson.annotation.JsonManagedReference;

// @Entity
// @Table(name = "orders")
// public class Order {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotNull
//     private String customerName;

//     @NotNull
//     @Email
//     private String customerEmail;

//     //@NotNull
//     private LocalDateTime orderDate;

//     //@NotNull
//     //@Positive
//     private Double totalAmount;

//     @NotNull
//     private String status; // e.g., PENDING, COMPLETED, CANCELLED

//     @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
//     @JsonManagedReference
//     private List<OrderItem> orderItems = new ArrayList<>();
// @ManyToOne
// @JsonBackReference
// @JoinColumn(name = "user_id")
// private User user;
//     // Getters and Setters
//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }
//     public String getCustomerName() { return customerName; }
//     public void setCustomerName(String customerName) { this.customerName = customerName; }
//     public String getCustomerEmail() { return customerEmail; }
//     public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
//     public LocalDateTime getOrderDate() { return orderDate; }
//     public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
//     public Double getTotalAmount() { return totalAmount; }
//     public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
//     public String getStatus() { return status; }
//     public void setStatus(String status) { this.status = status; }
//     public List<OrderItem> getOrderItems() { return orderItems; }
//     public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }
// }
// //correct
package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerEmail;
    private LocalDateTime orderDate;
    private Double totalAmount;
    private String status;

    // ✅ Relation with User (Many orders -> One user)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference  // prevents infinite recursion
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderItem> orderItems = new ArrayList<>();

    // Getters and Setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }
    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    // ✅ User
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    // ✅ OrderItems
    public List<OrderItem> getOrderItems() {
        return orderItems;
    }
    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}