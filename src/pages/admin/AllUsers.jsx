import { useEffect, useState } from "react";
import myaxios from "@/utils/myaxios";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, CardBody, Typography, Chip } from "@material-tailwind/react";
import RoleUpdateModel from "@/components/RoleUpdateModel";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      myaxios
        .get("admin/allusers", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUsers(response.data.data);
          setCount(response.data.count);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, []);

  // Function to handle role update
  const handleUpdateRole = async (userId, newRole) => {
    const token = localStorage.getItem("token");

    try {
      // Call the API to update the user's role
      await myaxios.put(
        `admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the local state to reflect the new role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            All Users ({count})
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Name", "Email", "Role", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, email, role }, key) => {
                const className = `py-3 px-5 ${
                  key === users.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={id}>
                    <td className={className}>{id}</td>
                    <td className={className}>{name}</td>
                    <td className={className}>{email}</td>
                    <td className={className}>
                      <Chip
                        variant="ghost"
                        value={role}
                        className={`py-0.5 px-2 text-[11px] font-medium w-fit 
                        ${role === "seller" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                      />
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-2">
                        <div
                          className="p-2 bg-blue-50 hover:bg-blue-300 transition rounded-md cursor-pointer"
                          onClick={() => {
                            setSelectedUser({ id, name, email, role });
                            setIsModalOpen(true);
                          }}
                        >
                          <PencilSquareIcon className="w-5 h-5 text-blue-700" />
                        </div>
                        <div
                          className="p-2 bg-red-50 hover:bg-red-300 transition rounded-md cursor-pointer"
                          onClick={() => {
                            setUsers(users.filter((user) => user.id !== id));
                            setCount((prevCount) => prevCount - 1);
                          }}
                        >
                          <TrashIcon className="w-5 h-5 text-red-700" />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {isModalOpen && selectedUser && (
        <RoleUpdateModel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdateRole} // Pass the handleUpdateRole function
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default AllUsers;