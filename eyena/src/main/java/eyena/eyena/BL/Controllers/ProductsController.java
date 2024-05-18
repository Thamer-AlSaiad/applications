package eyena.eyena.BL.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import eyena.eyena.DAL.DAOImplem.ProductDAOImpl;
import eyena.eyena.DAL.exceptionHandler;
import eyena.eyena.Model.Products;

@RestController
@CrossOrigin(origins = { "http://localhost:8333", "http://127.0.0.1:5500" })
@RequestMapping("/api/products")
public class ProductsController {

    private final ProductDAOImpl productDAO;

    @Autowired
    public ProductsController(ProductDAOImpl productDAO) {
        this.productDAO = productDAO;
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getAllProducts() {
        try {
            List<Products> products = productDAO.getAllProducts();
            return ResponseEntity.ok(products);
        } catch (exceptionHandler e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/get")
    public ResponseEntity<Object> getProductByName(@RequestParam String name) {
        try {
            Products product = productDAO.getProductByName(name);
            return ResponseEntity.ok(product);
        } catch (exceptionHandler e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addProduct(@RequestBody Products product) {
        try {
            Products newProduct = productDAO.addProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new CustomResponse("success", newProduct));
        } catch (exceptionHandler e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new CustomResponse("fail", e.getMessage()));
        }
    }

    @PutMapping("/update/{productName}")
    public ResponseEntity<CustomResponse> updateProduct(@RequestBody Products product,
            @PathVariable String productName) {
        try {
            Products updatedProduct = productDAO.updateProduct(product, productName);
            CustomResponse response = new CustomResponse("successful", updatedProduct);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            CustomResponse response = new CustomResponse("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


    @DeleteMapping("/delete/{name}")
    public ResponseEntity<CustomResponse> deleteProduct(@PathVariable String name) {
        try {
            productDAO.deleteProduct(name);
            CustomResponse response = new CustomResponse("successful",
                    "Product " + name + " has been deleted successfully.");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            CustomResponse response = new CustomResponse("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
