import { Dialog } from "@material-tailwind/react";

const CategoryModal = ({ isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} handler={onClose} size="sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Create Category</h3>
        {children}
      </div>
    </Dialog>
  );
};

export default CategoryModal;
