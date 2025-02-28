import { useEffect, useState } from "react";
import myaxios from "@/utils/myaxios";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, CardBody, Typography, Chip } from "@material-tailwind/react";

const AllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      myaxios
        .get("admin/sellers", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setSellers(response.data.data);
          setCount(response.data.count);
        })
        .catch((error) => console.error("Error fetching sellers:", error));
    }
  }, []);

  const handleDelete = (id) => {
    myaxios
      .delete(`admin/sellers/${id}`)
      .then(() => {
        setSellers(sellers.filter((seller) => seller.id !== id));
        setCount((prevCount) => prevCount - 1);
        alert("Seller deleted successfully");
      })
      .catch((error) => console.error("Error deleting seller:", error));
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            All Sellers ({count})
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Name", "Email", "Role", "Actions"].map((el) => (
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
              {sellers.map(({ id, name, email, role }, key) => {
                const className = `py-3 px-5 ${
                  key === sellers.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={id}>
                    <td className={className}>{id}</td>
                    <td className={className}>{name}</td>
                    <td className={className}>{email}</td>
                    <td className={className}>
                        <Chip
                            variant="ghost"
                            color="blue-gray"
                            value={role}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit bg-blue-50 text-blue-700"
                        />
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-2">
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
    </div>
  );
};

export default AllSellers;
