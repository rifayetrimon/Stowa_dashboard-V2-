import { Button, Typography } from "@material-tailwind/react";

const ProductDetailsModal = ({ isOpen, onClose, product, users = {} }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <Typography variant="h5" className="mb-4 text-gray-900">Product Details</Typography>
                
                <div className="space-y-2">
                    <Typography><strong>ID:</strong> {product.id}</Typography>
                    <Typography><strong>Name:</strong> {product.name}</Typography>
                    <Typography><strong>Description:</strong> {product.description || "No description available"}</Typography>
                    <Typography><strong>Price:</strong> ${product.price.toFixed(2)}</Typography>
                    <Typography><strong>Category:</strong> {product.category_name || "Uncategorized"}</Typography>
                    <Typography><strong>Created By:</strong> {users[product.user_id] || `User ID: ${product.user_id}`}</Typography>
                    {product.image_url && (
                        <img src={product.image_url} alt={product.name} className="mt-3 w-full h-40 object-cover rounded-md" />
                    )}
                </div>

                <div className="mt-4 flex justify-end">
                    <Button color="gray" onClick={onClose} className="px-4 py-2 rounded-md hover:bg-gray-700 transition">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;
