package eyena.eyena.DAL.DAOImplem;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import eyena.eyena.DAL.DatabaseConnection;
import eyena.eyena.DAL.IUsersDAO;
import eyena.eyena.DAL.exceptionHandler;
import eyena.eyena.Model.Users;

@Component
public class UsersDAOImpl implements IUsersDAO {

    @Override
    public List<Users> getAllUsers() throws exceptionHandler {
        List<Users> users = new ArrayList<>();
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement("SELECT * FROM Users");
                ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                Users user = new Users(
                        resultSet.getInt("user_id"),
                        resultSet.getString("username"),
                        resultSet.getString("email"),
                        resultSet.getString("phone"),
                        resultSet.getString("password"),
                        resultSet.getString("userType"));
                users.add(user);
            }
            System.out.println("Number of users fetched: " + users.size());
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.SQL_ERROR, "Failed to fetch users: " + e.getMessage());
        }
        return users;
    }

    @Override
    public Users getUser(String username) throws exceptionHandler {
        Users user = null;
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement("SELECT * FROM Users WHERE username = ?")) {
            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    user = new Users(
                            resultSet.getInt("User_id"),
                            resultSet.getString("username"),
                            resultSet.getString("email"),
                            resultSet.getString("phone"),
                            resultSet.getString("password"),
                            resultSet.getString("userType"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.SQL_ERROR, "Failed to fetch user: " + e.getMessage());
        }
        return user;
    }

    @Override
    public Users getUserByEmail(String email) throws exceptionHandler {
        Users user = null;
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement("SELECT * FROM Users WHERE email = ?")) {
            statement.setString(1, email);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    user = new Users(
                            resultSet.getInt("user_id"),
                            resultSet.getString("username"),
                            resultSet.getString("email"),
                            resultSet.getString("phone"),
                            resultSet.getString("password"),
                            resultSet.getString("userType"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.SQL_ERROR, "Failed to fetch user: " + e.getMessage());
        }
        return user;
    }

    @Override
    public void updateUser(Users user, String uName) throws exceptionHandler {
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(
                        "UPDATE Users SET username = ?, email = ?, phone = ?, password = ?, userType = ? WHERE username = ?")) {
            statement.setString(1, user.getUsername());
            statement.setString(2, user.getEmail());
            statement.setString(3, user.getPhone());
            statement.setString(4, user.getPassword());
            statement.setString(5, user.getUserType());
            statement.setString(6, uName);
            int rowsUpdated = statement.executeUpdate();
            if (rowsUpdated == 0) {
                throw new exceptionHandler(exceptionHandler.UPDATE_FAILED,
                        "User with username " + uName + " not found");
            }
            System.out.println("User updated successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.SQL_ERROR, "User update failed: " + e.getMessage());
        }
    }

    @Override
    public void deleteUser(String username) throws exceptionHandler {
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(
                        "DELETE FROM Users WHERE username = ?")) {
            statement.setString(1, username);
            int rowsDeleted = statement.executeUpdate();
            if (rowsDeleted == 0) {
                throw new exceptionHandler(exceptionHandler.ITEM_NOT_FOUND,
                        "User with username " + username + " not found");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.SQL_ERROR, "User delete failed: " + e.getMessage());
        }
    }

    @Override
    public Users addUser(Users user) throws exceptionHandler {
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(
                        "INSERT INTO Users (username, email, phone, password, userType) VALUES (?, ?, ?, ?, ?)")) {
            statement.setString(1, user.getUsername());
            statement.setString(2, user.getEmail());
            statement.setString(3, user.getPhone());
            statement.setString(4, user.getPassword());
            statement.setString(5, "customer");
            statement.executeUpdate();
            user.setUserType("customer");
            return user;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.FAIL_TO_INSERT, "Failed to insert user: " + e.getMessage());
        }
    }
}
