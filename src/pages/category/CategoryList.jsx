import { useEffect, useState } from "react";
import myaxios from "@/utils/myaxios";
import { TrashIcon, PencilSquareIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, CardBody, Typography, Chip, Button, Dialog } from "@material-tailwind/react";
import CategoryDetailsModal from "@/components/category/CategoryDetailsModal";
import CategoryUpdateModal from "@/components/category/CategoryUpdateModal";
import CategoryForm from "@/components/category/CategoryForm";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState({});
    const [count, setCount] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // Fetch both users and categories together
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            // Fetch Users
            const usersResponse = await myaxios.get("admin/allusers", {
                headers: { Authorization: `Bearer ${token}` },
            });

            let usersMap = {};
            if (usersResponse.data?.data) {
                usersMap = Object.fromEntries(
                    usersResponse.data.data.map(user => [String(user.id), user.name])
                );
            }
            setUsers(usersMap);
            console.log("Fetched Users:", usersMap);

            // Fetch Categories
            const categoriesResponse = await myaxios.get("category", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCategories(categoriesResponse.data?.data || []);
            setCount(categoriesResponse.data?.count || 0);
            console.log("Fetched Categories:", categoriesResponse.data?.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Open "Add Category" modal
    const handleAddCategory = () => {
        setIsAddModalOpen(true);
    };

    // Handle category added
    const handleCategoryAdded = () => {
        setIsAddModalOpen(false);
        fetchData();
    };

    // Open "View Details" modal
    const handleViewDetails = (category) => {
        setSelectedCategory(category);
        setIsDetailsModalOpen(true);
    };

    // Open "Update Category" modal
    const handleOpenUpdateModal = (category) => {
        setSelectedCategory(category);
        setIsUpdateModalOpen(true);
    };

    // Handle category update
    const handleUpdateCategory = () => {
        setIsUpdateModalOpen(false);
        fetchData();
    };

    // Handle category deletion
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await myaxios.delete(`category/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchData();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between">
                    <Typography variant="h6" color="white">Categories ({count})</Typography>
                    <Button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                        onClick={handleAddCategory}>
                        + Add Category
                    </Button>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[720px] table-auto">
                        <thead>
                            <tr>
                                {["ID", "Name", "Created By", "Actions"].map((el) => (
                                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                        <Typography variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400">
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">{category.id}</td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">{category.name}</td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <Chip
                                            variant="ghost"
                                            value={users[String(category.user_id)] || `⚠️ Missing User (ID: ${category.user_id})`}
                                            className="py-0.5 px-2 text-[11px] font-medium w-fit bg-gray-100 text-gray-700"
                                        />
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-green-50 hover:bg-green-300 transition rounded-md cursor-pointer"
                                                onClick={() => handleViewDetails(category)}>
                                                <EyeIcon className="w-5 h-5 text-green-700" />
                                            </div>
                                            <div className="p-2 bg-blue-50 hover:bg-blue-300 transition rounded-md cursor-pointer"
                                                onClick={() => handleOpenUpdateModal(category)}>
                                                <PencilSquareIcon className="w-5 h-5 text-blue-700" />
                                            </div>
                                            <div className="p-2 bg-red-50 hover:bg-red-300 transition rounded-md cursor-pointer"
                                                onClick={() => handleDelete(category.id)}>
                                                <TrashIcon className="w-5 h-5 text-red-700" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

            {/* Add Category Modal */}
            <Dialog open={isAddModalOpen} handler={() => setIsAddModalOpen(false)}>
                <div className="p-6">
                    <Typography variant="h5" className="mb-4">Add New Category</Typography>
                    <CategoryForm onCategoryAdded={handleCategoryAdded} />
                </div>
            </Dialog>

            {/* View Details Modal */}
            <CategoryDetailsModal 
                isOpen={isDetailsModalOpen} 
                onClose={() => setIsDetailsModalOpen(false)} 
                category={selectedCategory} 
                users={users} 
            />

            {/* Update Category Modal */}
            <CategoryUpdateModal 
                isOpen={isUpdateModalOpen} 
                onClose={() => setIsUpdateModalOpen(false)} 
                category={selectedCategory} 
                onUpdate={handleUpdateCategory} 
            />
        </div>
    );
};

export default CategoryList;
