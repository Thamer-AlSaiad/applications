package eyena.eyena.DAL;

import java.util.List;
import eyena.eyena.Model.Products;

public interface IProductsDAO {

    public List<Products> getAllProducts() throws exceptionHandler;

    public Products getProductByName(String name) throws exceptionHandler;

    public Products updateProduct(Products product, String pName) throws exceptionHandler;

    public void deleteProduct(String name) throws exceptionHandler;

    public Products addProduct(Products product) throws exceptionHandler;
}
