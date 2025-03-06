import { Button, Typography } from "@material-tailwind/react";

const CategoryDetailsModal = ({ isOpen, onClose, category, users }) => {
    if (!isOpen || !category) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <Typography variant="h5" className="mb-4">Category Details</Typography>
                <Typography><strong>ID:</strong> {category.id}</Typography>
                <Typography><strong>Name:</strong> {category.name}</Typography>
                <Typography><strong>Description:</strong> {category.description}</Typography>
                <Typography>
                    <strong>Created By:</strong> {users[category.user_id] || `Unknown User (ID: ${category.user_id})`}
                </Typography>
                <Button
                    className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                    onClick={onClose}
                >
                    Close
                </Button>
            </div>
        </div>
    );
};

export default CategoryDetailsModal;
