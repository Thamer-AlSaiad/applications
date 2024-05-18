package eyena.eyena.BL.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import eyena.eyena.Model.Users;
import eyena.eyena.DAL.DAOImplem.UsersDAOImpl;
import eyena.eyena.DAL.exceptionHandler;
import eyena.eyena.BL.Controllers.CustomResponse;

@Controller
@RequestMapping("/api/users")
@CrossOrigin(origins = { "http://localhost:8333", "http://127.0.0.1:5500" })
public class UsersController {

    private final UsersDAOImpl uDAO;

    @Autowired
    public UsersController(UsersDAOImpl uDAO) {
        this.uDAO = uDAO;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Object> getAllUsers() {
        try {
            List<Users> users = uDAO.getAllUsers();
            CustomResponse response = new CustomResponse("success", users);
            return ResponseEntity.ok().body(response);
        } catch (exceptionHandler e) {
            CustomResponse response = new CustomResponse("fail", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(value = "/get")
    public ResponseEntity<Object> getUser(@RequestParam String username) {
        try {
            Users user = uDAO.getUser(username);
            CustomResponse response = new CustomResponse("success", user);
            return ResponseEntity.ok().body(response);
        } catch (exceptionHandler e) {
            CustomResponse response = new CustomResponse("fail", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Object> addUser(@RequestBody Users user) {
        try {
            // Check if the user already exists
            if (uDAO.getUser(user.getUsername()) != null) {
                CustomResponse response = new CustomResponse("fail", "User already exists");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Add the user
            uDAO.addUser(user);
            CustomResponse response = new CustomResponse("success", user);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            CustomResponse response = new CustomResponse("fail", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/update/{username}")
    public ResponseEntity<Object> updateUser(@RequestBody Users user, @PathVariable String username) {
        try {
            uDAO.updateUser(user, username);
            Users updatedUser = uDAO.getUser(user.getUsername());
            CustomResponse response = new CustomResponse("success", updatedUser);
            return ResponseEntity.ok().body(response);
        } catch (exceptionHandler e) {
            CustomResponse response = new CustomResponse("fail", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            CustomResponse response = new CustomResponse("fail", "Internal Server Error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<Object> deleteUser(@PathVariable String username) {
        try {
            uDAO.deleteUser(username);
            CustomResponse response = new CustomResponse("success", null);
            return ResponseEntity.ok().body(response);
        } catch (exceptionHandler e) {
            CustomResponse response = new CustomResponse("fail", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
