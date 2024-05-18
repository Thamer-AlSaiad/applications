package eyena.eyena.BL.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import eyena.eyena.DAL.DAOImplem.UsersDAOImpl;
import eyena.eyena.DAL.exceptionHandler;
import eyena.eyena.Model.Users;

@RestController
@CrossOrigin(origins = "http://localhost:8536")
@RequestMapping("/api/users")
public class SignUpController {

    private final UsersDAOImpl uDAO;

    @Autowired
    public SignUpController(UsersDAOImpl uDAO) {
        this.uDAO = uDAO;
    }

    @PostMapping(value = "/signup", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Object> signUpUser(@RequestBody Users user) {
        try {
            String username = user.getUsername();
            String email = user.getEmail();

            Users existingUser = uDAO.getUser(username);
            Users existingEmail = uDAO.getUserByEmail(email);

            if (existingUser != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Username already exists!"));
            } else if (existingEmail != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Email already exists!"));
            } else {
                user.setUserType("Customer");
                uDAO.addUser(user);
                Users newUser = uDAO.getUser(username); // Get the newly added user by username
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new SuccessResponse("User signed up successfully!", newUser));
            }
        } catch (exceptionHandler e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to sign up user: " + e.getMessage()));
        }
    }

    private static class SuccessResponse {
        private final String status = "success";
        private final String message;
        private final Users user;

        public SuccessResponse(String message, Users user) {
            this.message = message;
            this.user = user;
        }

        public String getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }

        public Users getUser() {
            return user;
        }
    }

    private static class ErrorResponse {
        private final String status = "fail";
        private final String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }
    }
}
