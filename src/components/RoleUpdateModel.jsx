import { useState } from "react";

const RoleUpdateModel = ({ isOpen, onClose, onUpdate, user }) => {
  const [newRole, setNewRole] = useState(user?.role || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Role</h2>
        <p className="mb-4">
          Changing role for <strong>{user.name}</strong>
        </p>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => onUpdate(user.id, newRole)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleUpdateModel;
