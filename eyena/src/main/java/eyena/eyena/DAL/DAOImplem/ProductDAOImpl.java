package eyena.eyena.DAL.DAOImplem;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import eyena.eyena.DAL.DatabaseConnection;
import eyena.eyena.DAL.IProductsDAO;
import eyena.eyena.DAL.exceptionHandler;
import eyena.eyena.Model.Products;

@Component
public class ProductDAOImpl implements IProductsDAO {

    @Override
    public Products getProductByName(String productName) throws exceptionHandler {
        Products product = null;
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement("SELECT * FROM Products WHERE name = ?")) {
            statement.setString(1, productName);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    product = new Products(
                            resultSet.getInt("product_id"),
                            resultSet.getString("name"),
                            resultSet.getDouble("price"),
                            resultSet.getString("images"),
                            resultSet.getInt("stock"),
                            resultSet.getString("category"),
                            resultSet.getString("description"));
                } else {
                    throw new exceptionHandler(exceptionHandler.ITEM_NOT_FOUND,
                            "Product with name " + productName + " not found");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.SQL_ERROR, "Failed to fetch product: " + e.getMessage());
        }
        return product;
    }

    @Override
    public List<Products> getAllProducts() throws exceptionHandler {
        List<Products> products = new ArrayList<>();
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement("SELECT * FROM Products");
                ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                Products product = new Products(
                        resultSet.getInt("product_id"),
                        resultSet.getString("name"),
                        resultSet.getDouble("price"),
                        resultSet.getString("images"),
                        resultSet.getInt("stock"),
                        resultSet.getString("category"),
                        resultSet.getString("description"));
                products.add(product);
            }
            System.out.println("Number of products fetched: " + products.size());
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.SQL_ERROR, "Failed to fetch products: " + e.getMessage());
        }
        return products;
    }

    @Override
    public Products addProduct(Products product) throws exceptionHandler {
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(
                        "INSERT INTO Products (name, price, images, stock, category, description) VALUES (?, ?, ?, ?, ?, ?)")) {
            statement.setString(1, product.getName());
            statement.setDouble(2, product.getPrice());
            statement.setString(3, product.getImages());
            statement.setInt(4, product.getStock());
            statement.setString(5, product.getCategory());
            statement.setString(6, product.getDescription());

            int rowsInserted = statement.executeUpdate();
            if (rowsInserted == 0) {
                throw new SQLException("Creating product failed, no rows affected.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.FAIL_TO_INSERT, "Failed to insert product: " + e.getMessage());
        }

        try {
            return getProductByName(product.getName());
        } catch (exceptionHandler e) {
            throw new exceptionHandler(exceptionHandler.ITEM_NOT_FOUND,
                    "Failed to retrieve newly added product: " + e.getMessage());
        }
    }

    @Override
    public Products updateProduct(Products product, String pName) throws exceptionHandler {
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(
                        "UPDATE Products SET name = ?, price = ?, images = ?, stock = ?, category = ?, description = ? WHERE name = ?")) {
            statement.setString(1, product.getName());
            statement.setDouble(2, product.getPrice());
            statement.setString(3, product.getImages());
            statement.setInt(4, product.getStock());
            statement.setString(5, product.getCategory());
            statement.setString(6, product.getDescription());
            statement.setString(7, pName);

            int rowsUpdated = statement.executeUpdate();
            if (rowsUpdated == 0) {
                throw new exceptionHandler(exceptionHandler.UPDATE_FAILED, "Product with name " + pName + " not found");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.SQL_ERROR, "Product update failed: " + e.getMessage());
        }
        try {
            return getProductByName(product.getName());
        } catch (exceptionHandler e) {
            throw new exceptionHandler(exceptionHandler.ITEM_NOT_FOUND,
                    "Failed to retrieve updated product: " + e.getMessage());
        }
    }

    @Override
    public void deleteProduct(String productName) throws exceptionHandler {
        try (Connection connection = DatabaseConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(
                        "DELETE FROM Products WHERE name = ?")) {
            statement.setString(1, productName);
            int rowsDeleted = statement.executeUpdate();
            if (rowsDeleted == 0) {
                throw new exceptionHandler(exceptionHandler.ITEM_NOT_FOUND,
                        "Product with name " + productName + " not found");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new exceptionHandler(exceptionHandler.SQL_ERROR, "Product delete failed: " + e.getMessage());
        }
    }
}
