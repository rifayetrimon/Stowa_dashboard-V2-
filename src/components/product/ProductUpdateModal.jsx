import { useState, useEffect } from "react";
import { Dialog, Button, Typography, Input, Textarea } from "@material-tailwind/react";
import myaxios from "@/utils/myaxios";

const ProductUpdateModal = ({ isOpen, onClose, product, onUpdate }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: "",
        description: "",
        price: 0,
        category_id: "",
        stock_quantity: 0,
        image_url: "",
    });

    const [loading, setLoading] = useState(false); // ✅ Loading state for animation

    // Populate input fields when modal opens
    useEffect(() => {
        if (product) {
            setUpdatedProduct({
                name: product.name || "",
                description: product.description || "",
                price: product.price || 0,
                category_id: product.category_id || "",
                stock_quantity: product.stock_quantity || 0,
                image_url: product.image_url || "",
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        setLoading(true); // Start loading animation
        const token = localStorage.getItem("token");

        if (!token) {
            alert("No token found. Please log in.");
            setLoading(false);
            return;
        }

        try {
            await myaxios.put(`products/${product.id}`, updatedProduct, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Product updated successfully!");
            onUpdate(); // Refresh product list
            onClose(); // Close modal
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product. Please try again.");
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (
        <Dialog open={isOpen} handler={onClose}>
            <div className="p-6 space-y-4">
                <Typography variant="h5" className="mb-4 text-gray-800">Update Product</Typography>

                <div className="space-y-3">
                    <Input label="Name" name="name" value={updatedProduct.name} onChange={handleChange} className="w-full" />
                    <Textarea label="Description" name="description" value={updatedProduct.description} onChange={handleChange} className="w-full" />
                    <Input label="Price" name="price" type="number" value={updatedProduct.price} onChange={handleChange} className="w-full" />
                    <Input label="Stock Quantity" name="stock_quantity" type="number" value={updatedProduct.stock_quantity} onChange={handleChange} className="w-full" />
                    <Input label="Image URL" name="image_url" value={updatedProduct.image_url} onChange={handleChange} className="w-full" />
                </div>

                <div className="mt-5 flex justify-end gap-3">
                    <Button color="red" onClick={onClose} className="px-5">Cancel</Button>
                    <Button color="blue" onClick={handleUpdate} className="px-5" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default ProductUpdateModal;
