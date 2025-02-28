import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import myaxios from "@/utils/myaxios";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await myaxios.post("categories/", formData);
      setMessage("✅ Category created successfully!");
      setFormData({ name: "", description: "" }); // Reset form
      setTimeout(() => navigate("/dashboard/categories"), 1500);
    } catch (error) {
      setMessage("❌ Failed to create category. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-10 w-full max-w-lg bg-white shadow-lg rounded-lg border border-gray-200">
        <Typography variant="h3" className="text-center text-gray-900 font-bold mb-6">
          Create Category
        </Typography>

        {message && <Typography color="gray" className="text-center mb-4">{message}</Typography>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <Typography variant="small" className="text-gray-700 mb-1">
              Category Name
            </Typography>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="bg-gray-50 text-gray-900 border border-gray-300"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <Typography variant="small" className="text-gray-700 mb-1">
              Description
            </Typography>
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description"
              className="bg-gray-50 text-gray-900 border border-gray-300"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            className="bg-gray-900 text-white hover:bg-gray-700 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default CreateCategory;
