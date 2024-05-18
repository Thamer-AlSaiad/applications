package eyena.eyena.Model;

public class Products {

    private int productId;
    private String name;
    private double price;
    private String images;
    private int stock;
    private String category;
    private String description;


    public Products(int productId, String name, double price, String images, int stock, String category, String description) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.images = images;
        this.stock = stock;
        this.category = category;
        this.description = description;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
