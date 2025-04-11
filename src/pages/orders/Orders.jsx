import { useEffect, useState } from "react";
import myaxios from "@/utils/myaxios";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, CardBody, Typography, Chip, Button, Dialog } from "@material-tailwind/react";
// import OrderDetailsModal from "@/components/order/OrderDetailsModal";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [count, setCount] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        const token = localStorage.getItem("token");
        if (token) {
            myaxios.get("orders", { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    setOrders(response.data?.data || []);
                    setCount(response.data?.count || 0);
                })
                .catch((error) => console.error("Error fetching orders:", error));
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between">
                    <Typography variant="h6" color="white">Orders ({count})</Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[720px] table-auto">
                        <thead>
                            <tr>
                                {["Order ID", "Product Name", "Quantity", "Status", "Total Amount", "Created At", "Actions"].map((el) => (
                                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.order_id}>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">{order.order_id}</td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">{order.product_name}</td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">{order.quantity}</td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <Chip
                                            variant="ghost"
                                            value={order.status}
                                            className={`py-0.5 px-2 text-[11px] font-medium w-fit ${order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                                        />
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">${order.total_amount}</td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">{new Date(order.created_at).toLocaleString()}</td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="p-2 bg-green-50 hover:bg-green-300 transition rounded-md cursor-pointer"
                                            onClick={() => handleViewDetails(order)}>
                                            <EyeIcon className="w-5 h-5 text-green-700" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

            {/* View Order Details Modal */}
            {/* <OrderDetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} order={selectedOrder} /> */}
        </div>
    );
};

export default OrderList;
