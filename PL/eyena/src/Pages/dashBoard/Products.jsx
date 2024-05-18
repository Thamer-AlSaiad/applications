import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import Modal from "./Modal";
import Input from "./txtInput";
const Table_Head = [
  "ID",
  "Photo",
  "Name",
  "Category",
  "Stock",
  "Price",
  "Actions",
];
function Products() {
  const [products, setProducts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  async function handleEditProduct(e, name) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const product = {
      name: data.get("Name"),
      category: data.get("Category"),
      stock: data.get("Stock"),
      price: data.get("Price"),
      description: data.get("Description"),
      images: data.get("Image Link"),
    };
    const res = await fetch(
      `http://localhost:8333/api/products/update/${name}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      },
    );
    const result = await res.json();
    if (result.status === "successful") {
      setProducts((prev) =>
        prev.map((prod) => (prod.name === name ? result.data : prod)),
      );
      form.reset();
    }
  }
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8333/api/products/all");
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  async function handleAddProduct(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const product = {
      name: data.get("Name"),
      category: data.get("Category"),
      stock: data.get("Stock"),
      price: data.get("Price"),
      description: data.get("Description"),
      images: data.get("Image Link"),
    };
    const res = await fetch("http://localhost:8333/api/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const result = await res.json();
    if (result.status === "success") {
      setProducts((prev) => [...prev, result.data]);
      form.reset();
      setShowDialog(false);
    }
  }
  async function handleDeleteProduct(e, name) {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8333/api/products/delete/${name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const result = await res.json();
    if (result.status === "successful") {
      setProducts((prev) => prev.filter((prod) => prod.name !== name));
    }
  }
  return (
    <div className="overflow-x-auto w-full rounded-lg border border-neutral-200">
      <table className="w-full min-w-max table-auto  rounded-lg text-center text-base font-medium text-neutral-700">
        <thead className="bg-neutral-100 text-primary">
          <tr>
            {Table_Head.map((head, index) => (
              <th key={index} className="px-2 py-3">
                {head === "Actions" ? (
                  <div className="flex items-center justify-center gap-x-2">
                    {head}:
                    <button
                      onClick={() => setShowDialog(true)}
                      className="bg-yellow-light text-white px-4 py-2 rounded-lg"
                    >
                      Add Product
                    </button>
                    {showDialog && (
                      <Modal onClose={setShowDialog}>
                        <div className="p-8">
                          <h2 className="text-xl font-bold">Add Product</h2>
                          <form
                            onSubmit={handleAddProduct}
                            className="flex justify-start flex-col my-2 gap-y-4"
                          >
                            <Input name="Name" label="Name" type="text" />
                            <Input
                              name="Category"
                              label="Category"
                              type="text"
                            />
                            <Input name="Stock" label="Stock" type="text" />
                            <Input name="Price" label="Price" type="text" />
                            <Input
                              name="Description"
                              label="Description"
                              type="text"
                            />
                            <Input
                              name="Image Link"
                              label="Image Link"
                              type="text"
                            />
                            <button
                              type="submit"
                              className="bg-primary text-white px-4 py-2 rounded-lg"
                            >
                              Add Product
                            </button>
                          </form>
                        </div>
                      </Modal>
                    )}
                  </div>
                ) : (
                  head
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {products.length === 0 && (
            <tr>
              <td colSpan="8" className="py-4">
                No Products Found
              </td>
            </tr>
          )}
          {products.map((product, index) => (
            <TableRow
              key={product.productId}
              product={product}
              index={index}
              handleEditProduct={handleEditProduct}
              handleDeleteProduct={handleDeleteProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
