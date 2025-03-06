import { useState, useEffect } from "react";
import myaxios from "@/utils/myaxios";
import { Button, Input, Textarea } from "@material-tailwind/react";

const CategoryUpdateModal = ({ isOpen, onClose, category, onUpdate }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // Update state when a new category is selected
    useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description);
        }
    }, [category]); // Runs when `category` changes

    
    if (!isOpen) return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const token = localStorage.getItem("token");
    
        if (!token) {
            console.error("No token found. Please log in.");
            setLoading(false);
            return;
        }
    
        try {
            const response = await myaxios.put(
                `category/${category.id}`,
                { name, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onUpdate(response.data.data); // Update category list
            setLoading(false);
            onClose(); // Close modal after update
        } catch (error) {
            console.error("Error updating category:", error);
            setLoading(false);
        }
    };
    
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Update Category</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        label="Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Textarea
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Button type="button" color="red" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" color="blue" disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryUpdateModal;
