// package com.examly.springapp.controller;

// import com.examly.springapp.model.Product;
// import com.examly.springapp.service.ProductService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.validation.BindingResult;
// import org.springframework.web.bind.annotation.*;

// import jakarta.validation.Valid;
// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/api/products")
// public class ProductController {
//     private final ProductService productService;

//     @Autowired
//     public ProductController(ProductService productService) {
//         this.productService = productService;
//     }

//     @GetMapping
//     public ResponseEntity<List<Product>> getAllProducts() {
//         return ResponseEntity.ok(productService.getAllProducts());
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<?> getProductById(@PathVariable Long id) {
//         Optional<Product> productOpt = productService.getProductById(id);
//         if (productOpt.isPresent()) {
//             return ResponseEntity.ok(productOpt.get());
//         } else {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Product not found"));
//         }
//     }

//     @PostMapping
//     public ResponseEntity<?> createProduct(@Valid @RequestBody Product product, BindingResult bindingResult) {
//         if (bindingResult.hasErrors()) {
//             return ResponseEntity.badRequest().body(new ErrorResponse("Invalid product data: " + bindingResult.getFieldError().getDefaultMessage()));
//         }
//         Product created = productService.createProduct(product);
//         return ResponseEntity.status(HttpStatus.CREATED).body(created);
//     }

//     @GetMapping("/category/{category}")
//     public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
//         List<Product> products = productService.getProductsByCategory(category);
//         return ResponseEntity.ok(products);
//     }

//     static class ErrorResponse {
//         private String message;
//         public ErrorResponse(String message) { this.message = message; }
//         public String getMessage() { return message; }
//         public void setMessage(String message) { this.message = message; }
//     }
// }
package com.examly.springapp.controller;

import com.examly.springapp.model.Product;
import com.examly.springapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> productOpt = productService.getProductById(id);
        if (productOpt.isPresent()) {
            return ResponseEntity.ok(productOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Product not found"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@Valid @RequestBody Product product, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid product data: " + bindingResult.getFieldError().getDefaultMessage()));
        }
        Product created = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }
@PutMapping("/{id}")
public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody Product updatedProduct, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Invalid product data: " + bindingResult.getFieldError().getDefaultMessage()));
    }

    Optional<Product> existingProduct = productService.getProductById(id);
    if (existingProduct.isPresent()) {
        updatedProduct.setId(id); // Ensure the ID is set for update
        Product savedProduct = productService.createProduct(updatedProduct); // save() handles both create & update
        return ResponseEntity.ok(savedProduct);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Product not found"));
    }
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
    Optional<Product> existingProduct = productService.getProductById(id);
    if (existingProduct.isPresent()) {
        productService.deleteProductById(id);
        return ResponseEntity.ok().body("Product deleted successfully");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Product not found"));
    }
}
    static class ErrorResponse {
        private String message;
        public ErrorResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
      @GetMapping("/vendor/{vendorId}")
    public List<Product> getProductsByVendor(@PathVariable Long vendorId) {
        return productService.getProductsByVendor(vendorId);
    }

}
