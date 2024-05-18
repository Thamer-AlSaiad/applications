import { useEffect, useState } from "react";
import UsersTableRow from "./UsersTableRow";
import Modal from "./Modal";
import Input from "./txtInput";
const Table_Head = [
  "ID",
  "Username",
  "Email",
  "Phone Number",
  "Password",
  "Actions",
];
function Users() {
  const [users, setUsers] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);

  async function handleEditUser(e, name) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const user = {
      username: data.get("Username"),
      email: data.get("Email"),
      phone: data.get("PhoneNumber"),
      password: data.get("Password"),
      userType: data.get("Type"),
    };
    const res = await fetch(`http://localhost:8333/api/users/update/${name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await res.json();
    if (result.status === "success") {
      setUsers((prev) =>
        prev.map((user) => (user.username === name ? result.data : user)),
      );
      form.reset();
    }
  }
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8333/api/users/all");
      const data = await res.json();
      setUsers(data.data);
    }
    fetchData();
  }, []);

  async function handleAddUser(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const user = {
      username: data.get("Username"),
      email: data.get("Email"),
      phone: data.get("PhoneNumber"),
      password: data.get("Password"),
    };
    const res = await fetch("http://localhost:8333/api/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await res.json();
    if (result.status === "success") {
      setUsers((prev) => [...prev, result.data]);
      form.reset();
      setShowAddModal(false);
    }
  }
  async function handleDeleteUser(e, name) {
    e.preventDefault();
    const res = await fetch(`http://localhost:8333/api/users/delete/${name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (result.status === "success") {
      setUsers((prev) => prev.filter((user) => user.username !== name));
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
                      onClick={() => setShowAddModal(true)}
                      className="bg-yellow-light text-white px-4 py-2 rounded-lg"
                    >
                      Add User
                    </button>
                    {showAddModal && (
                      <Modal onClose={setShowAddModal}>
                        <div className="p-8">
                          <h2 className="text-xl font-bold">Add User</h2>
                          <form
                            onSubmit={handleAddUser}
                            className="flex justify-start flex-col my-2 gap-y-4"
                          >
                            <Input
                              name="Username"
                              label="Username"
                              type="text"
                            />
                            <Input name="Email" label="Email" type="text" />
                            <Input
                              name="PhoneNumber"
                              label="Phone Number"
                              type="text"
                            />
                            <Input
                              name="Password"
                              label="Password"
                              type="text"
                            />
                            <button
                              type="submit"
                              className="bg-primary text-white px-4 py-2 rounded-lg"
                            >
                              Add User
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
          {users.length === 0 && (
            <tr>
              <td colSpan="8" className="py-4">
                No Users Found
              </td>
            </tr>
          )}
          {users.map((user, index) => (
            <UsersTableRow
              key={user.username}
              index={index}
              user={user}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
