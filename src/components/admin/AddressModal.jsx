import { Dialog } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

const AddressModal = ({ isOpen, onClose, address }) => {
  return (
    <Dialog open={isOpen} handler={onClose}>
      <div className="p-6">
        <Typography variant="h5" className="mb-4 font-bold text-black">
          User Address
        </Typography> 
        <div className="text-gray-800">
          {address !== "NO ADDRESS SET" ? (
            address.split("\n").map((line, index) => {
              const parts = line.split(": ");
              if (parts.length === 2 && parts[1].trim()) {
                return (
                  <Typography key={index} className="text-gray-900 font-semibold">
                    {parts[0]}: <span className="text-gray-600 font-normal">{parts[1]}</span>
                  </Typography>
                );
              }
              return null; // Skip empty or invalid lines
            })
          ) : (
            <Typography className="text-red-600 font-semibold">{address}</Typography>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddressModal;
