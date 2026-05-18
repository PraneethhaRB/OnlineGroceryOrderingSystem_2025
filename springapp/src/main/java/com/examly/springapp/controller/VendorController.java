

// package com.examly.springapp.controller;

// import com.examly.springapp.model.Vendor;
// import com.examly.springapp.repository.VendorRepository;
// import com.examly.springapp.service.VendorService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;

// @RestController
// @RequestMapping("/vendors")
// public class VendorController {
//     @Autowired
//     private VendorService vendorService;
// @Autowired
// private VendorRepository vendorRepository;
//     @GetMapping
//     public List<Vendor> getAllVendors() {
//         return vendorService.getAllVendors();
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Vendor> getVendorById(@PathVariable Long id) {
//         return vendorService.getVendorById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     @PostMapping
//     public Vendor createVendor(@RequestBody Vendor vendor) {
//         return vendorService.createVendor(vendor);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Vendor> updateVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
//         try {
//             return ResponseEntity.ok(vendorService.updateVendor(id, vendor));
//         } catch (RuntimeException e) {
//             return ResponseEntity.notFound().build();
//         }
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
//         vendorService.deleteVendor(id);
//         return ResponseEntity.noContent().build();
//     }

// // }
// package com.examly.springapp.controller;

// import com.examly.springapp.model.Vendor;
// import com.examly.springapp.security.JwtUtil;
// import com.examly.springapp.service.VendorService;
// import jakarta.validation.Valid;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/vendors") // Make sure this matches your frontend API_BASE + /vendors
// public class VendorController {

//     @Autowired
//     private VendorService vendorService;

//     // ----------------- CRUD Endpoints -----------------
// //new

// @Autowired
// private PasswordEncoder passwordEncoder;
// @Autowired
// private JwtUtil jwtUtil;

// @PostMapping("/login")
// public ResponseEntity<?> login(@RequestBody Vendor loginRequest) {
//     System.out.println("Login request: " + loginRequest.getEmail() + ", " + loginRequest.getPassword());
//     Vendor vendor = vendorService.getVendorByEmail(loginRequest.getEmail());
//     System.out.println("Vendor from DB: " + vendor);

//     if (vendor == null || !passwordEncoder.matches(loginRequest.getPassword(), vendor.getPassword())) {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                 .body(Map.of("message", "Invalid email or password"));
//     }

//     String token = jwtUtil.generateToken(vendor.getEmail());

//     return ResponseEntity.ok(Map.of(
//             "vendor", Map.of(
//                     "id", vendor.getId(),
//                     "name", vendor.getName(),
//                     "email", vendor.getEmail(),
//                     "phone", vendor.getPhone()
//             ),
//             "token", token
//     ));
// }
// //new
//     @GetMapping
//     public List<Vendor> getAllVendors() {
//         return vendorService.getAllVendors();
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Vendor> getVendorById(@PathVariable Long id) {
//         return vendorService.getVendorById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     // @PostMapping
//     // public Vendor createVendor(@RequestBody @Valid Vendor vendor) {
//     //     return vendorService.createVendor(vendor);
//     // }
//     @PostMapping
// public Vendor createVendor(@RequestBody @Valid Vendor vendor) {
//     vendor.setPassword(passwordEncoder.encode(vendor.getPassword()));
//     return vendorService.createVendor(vendor);
// }

//     @PutMapping("/{id}")
//     public ResponseEntity<Vendor> updateVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
//         try {
//             return ResponseEntity.ok(vendorService.updateVendor(id, vendor));
//         } catch (RuntimeException e) {
//             return ResponseEntity.notFound().build();
//         }
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
//         vendorService.deleteVendor(id);
//         return ResponseEntity.noContent().build();
//     }

//     // ----------------- Login Endpoint -----------------

//     // @PostMapping("/login")
//     // public ResponseEntity<?> login(@RequestBody Vendor loginRequest) {
//     //     Vendor vendor = vendorService.getVendorByEmail(loginRequest.getEmail());
//     //     if (vendor == null) {
//     //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//     //                 .body(Map.of("message", "Invalid email"));
//     //     }
//     //     if (!vendor.getPassword().equals(loginRequest.getPassword())) {
//     //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//     //                 .body(Map.of("message", "Invalid password"));
//     //     }
//     //     return ResponseEntity.ok(vendor);
//     // }
// }
package com.examly.springapp.controller;

import com.examly.springapp.model.Vendor;
import com.examly.springapp.security.JwtUtil;
import com.examly.springapp.service.VendorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vendors")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ----------------- Signup -----------------
    @PostMapping
    public ResponseEntity<?> createVendor(@RequestBody @Valid Vendor vendor) {
        // Hash password before saving
        vendor.setPassword(passwordEncoder.encode(vendor.getPassword()));
        Vendor saved = vendorService.createVendor(vendor);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ----------------- Login -----------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Vendor loginRequest) {
        Vendor vendor = vendorService.getVendorByEmail(loginRequest.getEmail());

        if (vendor == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }

        boolean matches = passwordEncoder.matches(loginRequest.getPassword(), vendor.getPassword());

        if (!matches) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }

        String token = jwtUtil.generateToken(vendor.getEmail());

        return ResponseEntity.ok(Map.of(
                "vendor", Map.of(
                        "id", vendor.getId(),
                        "name", vendor.getName(),
                        "email", vendor.getEmail(),
                        "phone", vendor.getPhone()
                ),
                "token", token
        ));
    }

    // ----------------- CRUD Endpoints -----------------
    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vendor> getVendorById(@PathVariable Long id) {
        return vendorService.getVendorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vendor> updateVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
        return ResponseEntity.ok(vendorService.updateVendor(id, vendor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return ResponseEntity.noContent().build();
    }
}