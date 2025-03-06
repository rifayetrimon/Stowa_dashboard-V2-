import { useEffect, useState } from "react";
import myaxios from "@/utils/myaxios";
import { TrashIcon, PencilSquareIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, CardBody, Typography, Button, Dialog } from "@material-tailwind/react";
import ProductUpdateModal from "@/components/product/ProductUpdateModal";
import ProductDetailsModal from "@/components/product/ProductsDetailsModal";
import ProductForm from "@/components/product/ProductForm";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        myaxios
            .get("products", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setProducts(response.data?.data || []);
                setCount(response.data?.count || 0);
            })
            .catch((error) => console.error("Error fetching products:", error));
    };

    const handleAddProduct = () => {
        setIsAddModalOpen(true);
    };

    const handleProductAdded = () => {
        setIsAddModalOpen(false);
        fetchProducts();
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsDetailsModalOpen(true);
    };

    const handleOpenUpdateModal = (product) => {
        setSelectedProduct(product);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateProduct = () => {
        setIsUpdateModalOpen(false);
        fetchProducts();
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        myaxios
            .delete(`products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                fetchProducts();
            })
            .catch((error) => console.error("Error deleting product:", error));
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between">
                    <Typography variant="h6" color="white">Products ({count})</Typography>
                    <Button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition" onClick={handleAddProduct}>
                        + Add Product
                    </Button>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[720px] table-auto">
                        <thead>
                            <tr>
                                {["ID", "Name", "Price", "Actions"].map((el) => (
                                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">{product.id}</td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">{product.name}</td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">${product.price}</td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-green-50 hover:bg-green-300 transition rounded-md cursor-pointer" onClick={() => handleViewDetails(product)}>
                                                <EyeIcon className="w-5 h-5 text-green-700" />
                                            </div>
                                            <div className="p-2 bg-blue-50 hover:bg-blue-300 transition rounded-md cursor-pointer" onClick={() => handleOpenUpdateModal(product)}>
                                                <PencilSquareIcon className="w-5 h-5 text-blue-700" />
                                            </div>
                                            <div className="p-2 bg-red-50 hover:bg-red-300 transition rounded-md cursor-pointer" onClick={() => handleDelete(product.id)}>
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

            {/* Add Product Modal */}
            <Dialog open={isAddModalOpen} handler={() => setIsAddModalOpen(false)}>
                <div className="p-6">
                    <Typography variant="h5" className="mb-4">Add New Product</Typography>
                    <ProductForm onProductAdded={handleProductAdded} />
                </div>
            </Dialog>

            {/* View Details Modal */}
            <ProductDetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} product={selectedProduct} />

            {/* Update Product Modal */}
            <ProductUpdateModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} product={selectedProduct} onUpdate={handleUpdateProduct} />
        </div>
    );
};

export default Products;
