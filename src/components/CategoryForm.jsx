import { useState } from "react";
import myaxios from "@/utils/myaxios";
import { Button, Input, Textarea } from "@material-tailwind/react";

const CategoryForm = ({ onClose, onCategoryAdded }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");

        if (token) {
            myaxios
                .post(
                    "category/create",
                    { name, description },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((response) => {
                    onCategoryAdded(response.data.data); // Update parent category list
                    onClose(); // Close the modal
                })
                .catch((error) => console.error("Error creating category:", error))
                .finally(() => setLoading(false));
        } else {
            console.error("No token found. Please log in.");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
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
                <Button type="submit" color="green" disabled={loading}>
                    {loading ? "Saving..." : "Create"}
                </Button>
            </div>
        </form>
    );
};

export default CategoryForm;
