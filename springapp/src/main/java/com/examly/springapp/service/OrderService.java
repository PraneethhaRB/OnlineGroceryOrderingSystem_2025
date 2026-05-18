
// package com.examly.springapp.service;

// import com.examly.springapp.model.*;
// import com.examly.springapp.repository.*;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.Optional;
// import java.util.List;

// @Service
// public class OrderService {
//     private final OrderRepository orderRepository;
//     private final ProductRepository productRepository;
//     private final OrderItemRepository orderItemRepository;

//     @Autowired
//     public OrderService(OrderRepository orderRepository, ProductRepository productRepository, OrderItemRepository orderItemRepository) {
//         this.orderRepository = orderRepository;
//         this.productRepository = productRepository;
//         this.orderItemRepository = orderItemRepository;
//     }

//     @Transactional
//     public Order createOrder(Order order) {
//         double total = 0.0;
//         // Validate orderItems and stock
//         for (OrderItem item : order.getOrderItems()) {
//             Product product = productRepository.findById(item.getProduct().getId())
//                 .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProduct().getId()));
//             if (item.getQuantity() <= 0) {
//                 throw new RuntimeException("Quantity must be positive for product: " + product.getName());
//             }
//             if (item.getQuantity() > product.getStockQuantity()) {
//                 throw new RuntimeException("Ordered quantity exceeds available stock for product: " + product.getName());
//             }
//             item.setSubtotal(product.getPrice() * item.getQuantity());
//             total += item.getSubtotal();
//         }
//         order.setOrderDate(LocalDateTime.now());
//         order.setTotalAmount(total);
//         order.setStatus("PENDING");
//                 // Save order, then items
//         Order savedOrder = orderRepository.save(order);
//         for (OrderItem item : order.getOrderItems()) {
//             Product product = productRepository.findById(item.getProduct().getId()).get();
//             product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
//             productRepository.save(product);
//             item.setOrder(savedOrder);
//             orderItemRepository.save(item);
//         }
//         savedOrder.setOrderItems(order.getOrderItems());
//         return savedOrder;
//     }

//     public Optional<Order> getOrderById(Long id) {
//         return orderRepository.findById(id);
//     }
//     public List<Order> getAllOrders() {
//   return orderRepository.findAll();
// }

// @Transactional
// public Order updateOrder(Long id, Order updatedOrder) {
//   Order existingOrder = orderRepository.findById(id)
//     .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));

//   // Example updates – adjust based on your entity design
//   existingOrder.setCustomerName(updatedOrder.getCustomerName());
//   existingOrder.setCustomerEmail(updatedOrder.getCustomerEmail());
//   existingOrder.setStatus(updatedOrder.getStatus());

//   return orderRepository.save(existingOrder);
// }

// @Transactional
// public void deleteOrder(Long id) {
//   if (!orderRepository.existsById(id)) {
//     throw new RuntimeException("Order not found with ID: " + id);
//   }
//   orderRepository.deleteById(id);
// }
// }
// // above is correct
package com.examly.springapp.service;

import com.examly.springapp.model.*;
import com.examly.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository; // ✅ added

    @Autowired
    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        OrderItemRepository orderItemRepository,
                        UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
    }

    // @Transactional
    // public Order createOrder(Order order) {
    //     double total = 0.0;

    //     // ✅ Ensure order has a valid user
    //     if (order.getUser() == null || order.getUser().getId() == null) {
    //         throw new RuntimeException("Order must have a valid user with ID");
    //     }

    //     User user = userRepository.findById(order.getUser().getId())
    //             .orElseThrow(() -> new RuntimeException("User not found with ID: " + order.getUser().getId()));

    //     order.setUser(user);         // ✅ link order to user
    //     user.getOrders().add(order); // ✅ keeps both sides in sync

    //     // Validate items & calculate total
    //     for (OrderItem item : order.getOrderItems()) {
    //         Product product = productRepository.findById(item.getProduct().getId())
    //                 .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProduct().getId()));

    //         if (item.getQuantity() <= 0) {
    //             throw new RuntimeException("Quantity must be positive for product: " + product.getName());
    //         }
    //         if (item.getQuantity() > product.getStockQuantity()) {
    //             throw new RuntimeException("Ordered quantity exceeds available stock for product: " + product.getName());
    //         }

    //         item.setSubtotal(product.getPrice() * item.getQuantity());
    //         total += item.getSubtotal();
    //     }

    //     order.setOrderDate(LocalDateTime.now());
    //     order.setTotalAmount(total);
    //     order.setStatus("PENDING");

    //     // Save order
    //     Order savedOrder = orderRepository.save(order);

    //     // Save items and update product stock
    //     for (OrderItem item : order.getOrderItems()) {
    //         Product product = productRepository.findById(item.getProduct().getId()).get();
    //         product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
    //         productRepository.save(product);

    //         item.setOrder(savedOrder);
    //         orderItemRepository.save(item);
    //     }

    //     savedOrder.setOrderItems(order.getOrderItems());
    //     return savedOrder;
    // }
    @Transactional
public Order createOrder(Order orderRequest) {
    // 1. Find the user
    User user = userRepository.findById(orderRequest.getUser().getId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    // 2. Create new order
    Order order = new Order();
    order.setUser(user);

    // ✅ Copy customer details into the order
    order.setCustomerName(user.getName());
    order.setCustomerEmail(user.getEmail());

    order.setOrderDate(LocalDateTime.now());
    order.setStatus("PROCESSING");

    double totalAmount = 0.0;

    // 3. Build order items
    List<OrderItem> orderItems = new ArrayList<>();
    for (OrderItem itemRequest : orderRequest.getOrderItems()) {
        Product product = productRepository.findById(itemRequest.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (itemRequest.getQuantity() <= 0) {
            throw new RuntimeException("Invalid quantity for product: " + product.getName());
        }

        if (product.getStockQuantity() < itemRequest.getQuantity()) {
            throw new RuntimeException("Not enough stock for product: " + product.getName());
        }

        product.setStockQuantity(product.getStockQuantity() - itemRequest.getQuantity());
        productRepository.save(product);

        double subtotal = product.getPrice() * itemRequest.getQuantity();
        totalAmount += subtotal;

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(itemRequest.getQuantity());
        orderItem.setSubtotal(subtotal);

        orderItems.add(orderItem);
    }

    order.setTotalAmount(totalAmount);
    order.setOrderItems(orderItems);

    return orderRepository.save(order);
}

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order updateOrder(Long id, Order updatedOrder) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));

        existingOrder.setCustomerName(updatedOrder.getCustomerName());
        existingOrder.setCustomerEmail(updatedOrder.getCustomerEmail());
        existingOrder.setStatus(updatedOrder.getStatus());

        return orderRepository.save(existingOrder);
    }

    @Transactional
    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found with ID: " + id);
        }
        orderRepository.deleteById(id);
    }
    //newchangebelow
    public List<Order> getOrdersByVendor(Long vendorId) {
        return orderRepository.findDistinctByOrderItems_Product_VendorId(vendorId);
    }

    // ✅ Update only status of an order
    @Transactional
    public Order updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }
}