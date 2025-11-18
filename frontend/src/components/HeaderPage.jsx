import React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HeaderPage = ({
  title,
  description,
  showButton = false,
  onButtonClick,
  showDateRangePicker = false,
  dateRange,
  onDateRangeChange,
}) => {
  const handleFromDateChange = (e) => {
    const value = e.target.value;
    if (value) {
      const newDate = new Date(value);
      onDateRangeChange?.({
        ...dateRange,
        from: newDate,
      });
    } else {
      onDateRangeChange?.({
        ...dateRange,
        from: undefined,
      });
    }
  };

  const handleToDateChange = (e) => {
    const value = e.target.value;
    if (value) {
      const newDate = new Date(value);
      onDateRangeChange?.({
        ...dateRange,
        to: newDate,
      });
    } else {
      onDateRangeChange?.({
        ...dateRange,
        to: undefined,
      });
    }
  };

  // Format date to YYYY-MM-DD for input value
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
      ) : showDateRangePicker ? (
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="from-date" className="text-sm font-medium">
              Từ ngày
            </Label>
            <Input
              id="from-date"
              type="date"
              value={formatDateForInput(dateRange?.from)}
              onChange={handleFromDateChange}
              className={cn("w-full md:w-[180px]")}
              placeholder="dd/mm/yyyy"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="to-date" className="text-sm font-medium">
              Đến ngày
            </Label>
            <Input
              id="to-date"
              type="date"
              value={formatDateForInput(dateRange?.to)}
              onChange={handleToDateChange}
              className={cn("w-full md:w-[180px]")}
              placeholder="dd/mm/yyyy"
              min={formatDateForInput(dateRange?.from)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HeaderPage;