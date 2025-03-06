import { useState, useEffect } from "react";
import myaxios from "@/utils/myaxios";
import { Button, Input, Textarea, Select, Option } from "@material-tailwind/react";

// Function to decode JWT
const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(window.atob(base64));

        console.log("🔹 Decoded Token:", decoded);
        console.log("🔹 Token Expiry:", new Date(decoded.exp * 1000).toUTCString());

        return decoded;
    } catch (error) {
        console.error("❌ Error decoding JWT:", error);
        return null;
    }
};

const ProductForm = ({ onClose, onProductAdded }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState(null);
    const [stockQuantity, setStockQuantity] = useState("");
    const [sku, setSku] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch categories when component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("❌ No token found. Please log in.");
                return;
            }

            const response = await myaxios.get("category", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("✅ Fetched Categories:", response.data?.data);
            setCategories(response.data?.data || []);
        } catch (error) {
            console.error("❌ Error fetching categories:", error.response?.data || error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let token = localStorage.getItem("token");
        if (!token) {
            alert("Authentication failed. Please log in again.");
            setLoading(false);
            return;
        }

        // Decode token and check expiry
        const decodedToken = decodeJWT(token);
        if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            setLoading(false);
            return;
        }

        // Validate SKU format
        const skuRegex = /^[A-Z0-9-]+$/;
        if (!skuRegex.test(sku)) {
            alert("❌ SKU must contain only uppercase letters, numbers, and hyphens.");
            setLoading(false);
            return;
        }

        // Validate image URL
        try {
            new URL(imageUrl); // Throws error if invalid
        } catch {
            alert("❌ Invalid image URL. Please enter a valid link.");
            setLoading(false);
            return;
        }

        // Ensure description is at least 10 characters long
        if (description.length < 10) {
            alert("❌ Description must be at least 10 characters long.");
            setLoading(false);
            return;
        }

        const productData = {
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price) || 0,
            category_id: categoryId ? parseInt(categoryId) : null,
            stock_quantity: parseInt(stockQuantity) || 0,
            sku: sku.trim(),
            image_url: imageUrl.trim(),
            user_id: decodedToken.sub,
        };

        console.log("🔹 Sending Product Data:", productData);

        try {
            const response = await myaxios.post(
                "products/create",
                productData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("✅ Product Created:", response.data);
            alert("🎉 Product created successfully!");

            // If backend provides a new token, update it
            if (response.data?.new_token) {
                localStorage.setItem("token", response.data.new_token);
                console.log("🔄 Token refreshed.");
            }

            onProductAdded(response.data.data);
            onClose();
        } catch (error) {
            console.error("❌ Error creating product:", error.response?.data || error);
            alert(`Error: ${JSON.stringify(error.response?.data?.detail || "Unknown error")}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <Input
                type="text"
                label="Product Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Textarea
                name="description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <Input
                name="price"
                type="number"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <Select
                name="category_id"
                label="Category"
                value={categoryId !== null ? categoryId.toString() : ""}
                onChange={(val) => {
                    console.log("📌 Selected Category ID:", val);
                    setCategoryId(Number(val));
                }}
                required
            >
                {categories.map((category) => (
                    <Option key={category.id} value={category.id.toString()}>
                        {category.name}
                    </Option>
                ))}
            </Select>
            <Input
                name="stock_quantity"
                type="number"
                label="Stock Quantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                required
            />
            <Input
                name="sku"
                type="text"
                label="SKU (e.g., ABC-1234)"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
            />
            <Input
                name="image_url"
                type="text"
                label="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
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

export default ProductForm;
