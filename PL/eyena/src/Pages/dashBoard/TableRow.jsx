import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "./Modal";
import Input from "./txtInput";
function TableRow({ product, index, handleEditProduct, handleDeleteProduct }) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <tr
        className={`border-b-2 border-neutral-100 table-row hover:bg-neutral-50`}
      >
        <td className="table-cell px-2 py-2">{index + 1}</td>
        <td className="table-cell px-2 py-2">
          <picture className="rounded-full">
            <img
              src={
                product.images
                  ? product.images.split(",")[0]
                  : "/images/profilePic.png"
              }
              alt="Product"
              className="mx-auto aspect-square h-full max-h-[30px] w-full max-w-[30px] scale-[1.3] overflow-clip rounded-full"
            />
          </picture>
        </td>
        <td className="table-cell px-2 py-2">{product.name}</td>
        <td className="table-cell px-2 py-2">{product.category}</td>
        <td className="table-cell px-2 py-2">{product.stock}</td>
        <td className="table-cell px-2 py-2">{product.price}</td>
        <td className="table-cell px-2 py-2">
          <div className="flex items-center justify-center gap-x-2">
            <button
              onClick={() => setShowEditDialog(true)}
              className=" rounded-md bg-red-600 px-4 py-1 text-white"
            >
              Edit
            </button>
            {showEditDialog && (
              <Modal onClose={setShowEditDialog}>
                <div className="p-4 flex gap-y-2 flex-col">
                  <h2 className="text-xl font-bold">Edit Product</h2>
                  <form
                    onSubmit={(e) => handleEditProduct(e, product.name)}
                    className="flex flex-col gap-y-4 items-center justify-center gap-x-2"
                  >
                    <Input
                      name="Name"
                      label="Name"
                      type="text"
                      placeholder={product.name}
                    />
                    <Input
                      name="Category"
                      label="Category"
                      type="text"
                      placeholder={product.category}
                    />
                    <Input
                      name="Stock"
                      label="Stock"
                      type="text"
                      placeholder={`${product.stock}`}
                    />
                    <Input
                      name="Price"
                      label="Price"
                      type="text"
                      placeholder={`${product.price}`}
                    />
                    <Input
                      name="Description"
                      label="Description"
                      type="text"
                      placeholder={product.description}
                    />
                    <Input
                      name="Image Link"
                      label="Image Link"
                      type="text"
                      placeholder={product.images}
                    />
                    <div className="flex gap-x-2">
                      <button
                        type="reset"
                        className="rounded-md bg-red-600 px-6 py-2 text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-primary px-8 py-2 text-white"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </Modal>
            )}

            <button
              onClick={() => setShowDeleteDialog(true)}
              className="rounded-md bg-primary px-4 py-1 text-white"
            >
              Delete
            </button>
            {showDeleteDialog && (
              <Modal onClose={setShowDeleteDialog}>
                <div className="p-4 flex gap-y-2 flex-col">
                  <h2 className="text-xl font-bold">Delete Product</h2>
                  <p>Are you sure you want to delete this product?</p>
                  <form
                    onSubmit={(e) => handleDeleteProduct(e, product.name)}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <button
                      type="reset"
                      className="rounded-md bg-primary px-6 py-2 text-white"
                    >
                      No
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-red-600 px-6 py-2 text-white"
                    >
                      Yes
                    </button>
                  </form>
                </div>
              </Modal>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
TableRow.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleEditProduct: PropTypes.func.isRequired,
  handleDeleteProduct: PropTypes.func.isRequired,
};
export default TableRow;
