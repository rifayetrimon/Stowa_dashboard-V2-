import { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // ✅ Replace this API URL with your actual backend API endpoint
    fetch("https://your-api.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4 font-bold text-gray-900">
        Order List
      </Typography>

      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Order ID</th>
                  <th className="border p-2 text-left">Product Name</th>
                  <th className="border p-2 text-left">Quantity</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left">Total Amount</th>
                  <th className="border p-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.order_id} className="hover:bg-gray-50">
                      <td className="border p-2">{order.order_id}</td>
                      <td className="border p-2">{order.product_name}</td>
                      <td className="border p-2">{order.quantity}</td>
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded text-white ${
                            order.status === "pending"
                              ? "bg-yellow-500"
                              : order.status === "completed"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="border p-2">${order.total_amount}</td>
                      <td className="border p-2">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="border p-4 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Orders;
 