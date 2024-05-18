package eyena.eyena.BL.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import eyena.eyena.DAL.DAOImplem.UsersDAOImpl;
import eyena.eyena.DAL.exceptionHandler;
import eyena.eyena.Model.LoginRequest;
import eyena.eyena.Model.Users;

@RestController
@CrossOrigin(origins = "http://localhost:8333")
@RequestMapping("/api/users")
public class LogInController {

    private final UsersDAOImpl uDAO;

    @Autowired
    public LogInController(UsersDAOImpl uDAO) {
        this.uDAO = uDAO;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            String usernameOrEmail = loginRequest.getUsernameOrEmail();
            String password = loginRequest.getPassword();

            Users user = null;
            if (usernameOrEmail.contains("@")) {
                user = uDAO.getUserByEmail(usernameOrEmail);
            } else {
                user = uDAO.getUser(usernameOrEmail);
            }

            if (user != null && user.getPassword().equals(password)) {
                return ResponseEntity.ok().body(new CustomResponse("success", user));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new CustomResponse("fail", "Invalid username/email or password!"));
            }
        } catch (exceptionHandler e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse("fail", "Failed to login: " + e.getMessage()));
        }
    }
}
