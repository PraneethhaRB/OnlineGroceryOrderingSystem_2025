// // package com.examly.springapp.service;

// // public class VendorService {
    
// // }
// package com.examly.springapp.service;

// import com.examly.springapp.model.Vendor;
// import com.examly.springapp.repository.VendorRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class VendorService {
//     @Autowired
//     private VendorRepository vendorRepository;

//     public List<Vendor> getAllVendors() {
//         return vendorRepository.findAll();
//     }

//     public Optional<Vendor> getVendorById(Long id) {
//         return vendorRepository.findById(id);
//     }

//     public Vendor createVendor(Vendor vendor) {
//         return vendorRepository.save(vendor);
//     }
// }

// === VendorService.java ===
// package com.examly.springapp.service;

// import com.examly.springapp.model.Vendor;
// import com.examly.springapp.repository.VendorRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class VendorService {
//     @Autowired
//     private VendorRepository vendorRepository;
//     @Autowired
// private PasswordEncoder passwordEncoder;
//     public List<Vendor> getAllVendors() {
//         return vendorRepository.findAll();
//     }

//     public Optional<Vendor> getVendorById(Long id) {
//         return vendorRepository.findById(id);
//     }




//     public Vendor createVendor(Vendor vendor) {
//         // Hash password before saving
//         vendor.setPassword(passwordEncoder.encode(vendor.getPassword()));
//         return vendorRepository.save(vendor);
//     }

//     public Vendor updateVendor(Long id, Vendor updatedVendor) {
//         return vendorRepository.findById(id).map(vendor -> {
//             vendor.setName(updatedVendor.getName());
//             vendor.setEmail(updatedVendor.getEmail());
//             vendor.setPhone(updatedVendor.getPhone());
//             return vendorRepository.save(vendor);
//         }).orElseThrow(() -> new RuntimeException("Vendor not found"));
//     }

//     public void deleteVendor(Long id) {
//         vendorRepository.deleteById(id);
//     }
//     public Vendor getVendorByEmail(String email) {
//     return vendorRepository.findByEmail(email); // assumes repository method exists
// }

// }
package com.examly.springapp.service;

import com.examly.springapp.model.Vendor;
import com.examly.springapp.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    public Vendor createVendor(Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    public Optional<Vendor> getVendorById(Long id) {
        return vendorRepository.findById(id);
    }

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public Vendor updateVendor(Long id, Vendor vendor) {
        vendor.setId(id);
        return vendorRepository.save(vendor);
    }

    public void deleteVendor(Long id) {
        vendorRepository.deleteById(id);
    }

    public Vendor getVendorByEmail(String email) {
        return vendorRepository.findByEmail(email).orElse(null);
    }
}