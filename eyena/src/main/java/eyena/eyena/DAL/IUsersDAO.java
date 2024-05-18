package eyena.eyena.DAL;

import java.util.List;

import eyena.eyena.Model.Users;

public interface IUsersDAO {
    public List<Users> getAllUsers() throws exceptionHandler;

    public Users getUser(String username) throws exceptionHandler;

    public Users getUserByEmail(String email) throws exceptionHandler;

    public void updateUser(Users user, String uName) throws exceptionHandler;

    public void deleteUser(String username) throws exceptionHandler;

    public Users addUser(Users user) throws exceptionHandler;
}
