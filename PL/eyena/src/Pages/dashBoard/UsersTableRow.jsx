import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "./Modal";
import Input from "./txtInput";
function TableRow({ user, index, handleEditUser, handleDeleteUser }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <tr
        className={`border-b-2 border-neutral-100 table-row hover:bg-neutral-50`}
      >
        <td className="table-cell px-2 py-2">{index + 1}</td>
        <td className="table-cell px-2 py-2">{user.username}</td>
        <td className="table-cell px-2 py-2">{user.email}</td>
        <td className="table-cell px-2 py-2">{user.phone}</td>
        <td className="table-cell px-2 py-2">{user.password}</td>
        <td className="table-cell px-2 py-2">
          <div className="flex items-center justify-center gap-x-2">
            <button
              onClick={() => setShowEditModal(true)}
              className=" rounded-md bg-red-600 px-4 py-1 text-white"
            >
              Edit
            </button>
            {showEditModal && (
              <Modal onClose={setShowEditModal}>
                <div className="p-4 flex gap-y-2 flex-col">
                  <h2 className="text-xl font-bold">Edit User</h2>
                  <form
                    onSubmit={(e) => handleEditUser(e, user.username)}
                    className="flex flex-col gap-y-4 items-center justify-center gap-x-2"
                  >
                    <Input
                      name="Username"
                      label="Username"
                      type="text"
                      placeholder={user.username}
                    />
                    <Input
                      name="Email"
                      label="Email"
                      type="text"
                      placeholder={user.email}
                    />
                    <Input
                      name="PhoneNumber"
                      label="Phone Number"
                      type="text"
                      placeholder={`${user.phone}`}
                    />
                    <Input
                      name="Password"
                      label="Password"
                      type="text"
                      placeholder={`${user.password}`}
                    />
                    <div className="flex gap-x-1 w-full justify-between items-center">
                      <label
                        className="text-base font-medium text-neutral-800"
                        htmlFor="Type"
                      >
                        Type
                      </label>
                      <select
                        name="Type"
                        defaultValue={user.userType}
                        className="w-52 rounded-md py-3 pl-2 text-neutral-600 shadow-md shadow-gray-100 outline-primary ring-1 ring-gray-300"
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Customer">Customer</option>
                      </select>
                    </div>
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
              onClick={() => setShowDeleteModal(true)}
              className="rounded-md bg-primary px-4 py-1 text-white"
            >
              Delete
            </button>
            {showDeleteModal && (
              <Modal onClose={setShowDeleteModal}>
                <div className="p-4 flex gap-y-2 flex-col">
                  <h2 className="text-xl font-bold">Delete User</h2>
                  <p>Are you sure you want to delete this user?</p>
                  <form
                    onSubmit={(e) => handleDeleteUser(e, user.username)}
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
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};
export default TableRow;
