// // package com.examly.springapp.model;

// // public class Vendor {
    
// // }
// package com.examly.springapp.model;

// import jakarta.persistence.*;
// import jakarta.validation.constraints.*;
// import java.util.*;

// import com.fasterxml.jackson.annotation.JsonManagedReference;

// @Entity
// public class Vendor {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotNull
//     private String name;

//     @Email
//     @NotNull
//     private String email;

//     private String phone;

//     @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, orphanRemoval = true)
//     // @JsonManagedReference
//     private List<Product> products = new ArrayList<>();

//     // Getters and Setters
//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }
//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }
//     public String getEmail() { return email; }
//     public void setEmail(String email) { this.email = email; }
//     public String getPhone() { return phone; }
//     public void setPhone(String phone) { this.phone = phone; }
//     public List<Product> getProducts() { return products; }
//     public void setProducts(List<Product> products) { this.products = products; }
// }
package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @Email
    @NotNull
    private String email;

    private String phone;

    @NotNull
    private String password; // <-- add this field


    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products = new ArrayList<>();

    // -------- Getters and Setters --------
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }  // <-- getter
    public void setPassword(String password) { this.password = password; } // <-- setter

    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }
}
