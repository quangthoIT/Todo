import React from "react";
import { Plus } from "lucide-react";

const HeaderPage = ({
  title,
  description,
  showButton = false,
  onButtonClick,
}) => {
  return (
    <div className="md:flex items-center justify-between">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      {showButton && (
        <button
          onClick={onButtonClick}
          className="flex w-full md:w-auto items-center justify-center gap-2 md:py-3 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer"
        >
          <Plus />
          New Task
        </button>
      )}
    </div>
  );
};

export default HeaderPage;
