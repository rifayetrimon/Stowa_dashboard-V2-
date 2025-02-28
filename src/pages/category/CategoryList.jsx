import { useEffect, useState } from "react";
import myaxios from "@/utils/myaxios";
import { TrashIcon, PencilSquareIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, CardBody, Typography, Chip, Button } from "@material-tailwind/react";
import CategoryModal from "@/components/CategoryModal";
import CategoryForm from "@/components/CategoryForm";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState({});
    const [count, setCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            // Fetch Users First
            myaxios
                .get("admin/allusers", { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    if (response.data && Array.isArray(response.data.data)) {
                        const usersMap = response.data.data.reduce((acc, user) => {
                            acc[user.id] = user.name; // Ensure 'id' is correct
                            return acc;
                        }, {});
                        setUsers(usersMap);
                        console.log("Users Map:", usersMap); // Debugging log
                    } else {
                        console.error("Unexpected user response:", response.data);
                    }
                })
                .catch((error) => console.error("Error fetching users:", error));

            // Fetch Categories
            myaxios
                .get("category", { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    if (response.data && Array.isArray(response.data.data)) {
                        setCategories(response.data.data);
                        setCount(response.data.count);
                    } else {
                        console.error("Unexpected category response:", response.data);
                        setCategories([]);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                    setCategories([]);
                });
        }
    }, []);

    useEffect(() => {
        console.log("Updated Users Map:", users);
        console.log("Categories Data:", categories);
    }, [categories, users]);

    // Function to delete a category
    const handleDelete = (id) => {
        const token = localStorage.getItem("token");

        if (token) {
            myaxios
                .delete(`category/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(() => {
                    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
                    setCount((prevCount) => prevCount - 1);
                })
                .catch((error) => console.error("Error deleting category:", error));
        }
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between">
                    <Typography variant="h6" color="white">
                        Categories ({count})
                    </Typography>
                    <Button
                        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Add Category
                    </Button>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[720px] table-auto">
                        <thead>
                            <tr>
                                {["ID", "Name", "Description", "Created By", "Actions"].map((el) => (
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
                            {categories.map((category, key) => {
                                const { id, name, description, user_id } = category;
                                const className = `py-3 px-5 ${
                                    key === categories.length - 1 ? "" : "border-b border-blue-gray-50"
                                }`;

                                return (
                                    <tr key={id}>
                                        <td className={className}>{id}</td>
                                        <td className={className}>{name}</td>
                                        <td className={className}>{description}</td>
                                        <td className={className}>
                                            <Chip
                                                variant="ghost"
                                                value={
                                                    users[user_id] 
                                                        ? `👤 ${users[user_id]}` 
                                                        : `❌ Unknown User (ID: ${user_id})`
                                                }
                                                className="py-0.5 px-2 text-[11px] font-medium w-fit bg-gray-100 text-gray-700"
                                            />
                                        </td>
                                        <td className={className}>
                                            <div className="flex items-center gap-2">
                                                {/* View Button */}
                                                <div
                                                    className="p-2 bg-green-50 hover:bg-green-300 transition rounded-md cursor-pointer"
                                                    onClick={() => console.log("View category", id)}
                                                >
                                                    <EyeIcon className="w-5 h-5 text-green-700" />
                                                </div>
                                                {/* Edit Button */}
                                                <div
                                                    className="p-2 bg-blue-50 hover:bg-blue-300 transition rounded-md cursor-pointer"
                                                    onClick={() => console.log("Edit category", id)}
                                                >
                                                    <PencilSquareIcon className="w-5 h-5 text-blue-700" />
                                                </div>
                                                {/* Delete Button */}
                                                <div
                                                    className="p-2 bg-red-50 hover:bg-red-300 transition rounded-md cursor-pointer"
                                                    onClick={() => handleDelete(id)}
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

            {/* Modal for Creating Category */}
            <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CategoryForm
                    onClose={() => setIsModalOpen(false)}
                    onCategoryAdded={(newCategory) => {
                        setCategories((prev) => [...prev, newCategory]);
                        setCount((prev) => prev + 1);
                    }}
                />
            </CategoryModal>
        </div>
    );
};

export default CategoryList;
