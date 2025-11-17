import React from "react";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const HeaderPage = ({
  title,
  description,
  showButton = false,
  onButtonClick,
  showFilter = false,
  onFilterChange,
}) => {
  return (
    <div className="md:flex items-center justify-between">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      {showButton ? (
        <button
          onClick={onButtonClick}
          className="flex w-full md:w-auto items-center justify-center gap-2 md:py-3 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer"
        >
          <Plus />
          New Task
        </button>
      ) : showFilter ? (
        <Select>
          <SelectTrigger className={cn("w-full md:w-[200px]")}>
            <SelectValue placeholder="Select A Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="year">Last 12 Months</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : null}
    </div>
  );
};

export default HeaderPage;
