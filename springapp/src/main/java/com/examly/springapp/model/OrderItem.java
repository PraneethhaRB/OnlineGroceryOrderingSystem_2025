package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Positive
    private Integer quantity;

    //@NotNull
    //@Positive
    private Double subtotal;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonBackReference
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public Double getSubtotal() { return subtotal; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
}
// package com.examly.springapp.model;

// import com.fasterxml.jackson.annotation.JsonAnySetter;

// import jakarta.persistence.*;
// import jakarta.validation.constraints.*;

// @Entity
// public class OrderItem {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotNull
//     @Positive
//     private Integer quantity;

//     //@NotNull
//     //@Positive
//     private Double subtotal;

//     @ManyToOne(fetch = FetchType.EAGER)
//     @JoinColumn(name = "order_id", nullable = false)
//     //mathro
//     @Json
//     private Order order;

//     @ManyToOne(fetch = FetchType.EAGER)
//     @JoinColumn(name = "product_id", nullable = false)
//     private Product product;

//     // Getters and Setters
//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }
//     public Integer getQuantity() { return quantity; }
//     public void setQuantity(Integer quantity) { this.quantity = quantity; }
//     public Double getSubtotal() { return subtotal; }
//     public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }
//     public Order getOrder() { return order; }
//     public void setOrder(Order order) { this.order = order; }
//     public Product getProduct() { return product; }
//     public void setProduct(Product product) { this.product = product; }
// }
