import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportButton = ({ statusStats, filtered, dateRange }) => {
  const exportToCSV = () => {
    // Tiêu đề báo cáo
    let csv = "Task Management Report\n\n";

    // Thông tin khoảng thời gian
    if (dateRange?.from && dateRange?.to) {
      csv += `Period: ${format(dateRange.from, "dd/MM/yyyy")} - ${format(
        dateRange.to,
        "dd/MM/yyyy"
      )}\n\n`;
    } else {
      csv += "Period: All Time\n\n";
    }

    // Thêm thống kê tóm tắt
    csv += "Summary Statistics\n";
    csv += `Total Tasks,${statusStats.totalTasks || 0}\n`;
    csv += `Completed,${statusStats.completed || 0}\n`;
    csv += `In Progress,${statusStats.inProgress || 0}\n`;
    csv += `Pending,${statusStats.pending || 0}\n`;
    csv += `Overdue,${statusStats.overdue || 0}\n\n`;

    // Thêm chi tiết công việc
    csv += "Task Details\n";
    csv += "Title,Status,Priority,Start Date,Due Date\n";

    filtered.forEach((task) => {
      csv += `"${task.title}","${task.status}","${task.priority}","${format(
        new Date(task.startDate),
        "dd/MM/yyyy"
      )}","${format(new Date(task.dueDate), "dd/MM/yyyy")}"\n`;
    });

    // Download CSV file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `task-report-${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();

    // Tiêu đề báo cáo
    pdf.setFontSize(16);
    pdf.setFont("bold");
    pdf.text("Task Management Report", 14, 20);

    // Thông tin khoảng thời gian
    pdf.setFontSize(12);
    let periodText = "Period: All Time";
    if (dateRange?.from && dateRange?.to) {
      periodText = `Period: ${format(dateRange.from, "dd/MM/yyyy")} - ${format(
        dateRange.to,
        "dd/MM/yyyy"
      )}`;
    }
    pdf.text(periodText, 14, 30);

    // Thống kê tóm tắt
    const summary = [
      ["Total Tasks", statusStats.totalTasks || 0],
      ["Completed", statusStats.completed || 0],
      ["In Progress", statusStats.inProgress || 0],
      ["Pending", statusStats.pending || 0],
      ["Overdue", statusStats.overdue || 0],
    ];

    // Bảng tóm tắt
    autoTable(pdf, {
      startY: 35,
      head: [["Metric", "Value"]],
      body: summary,
    });

    // Chi tiết công việc
    const taskTable = filtered.map((task) => [
      task.title,
      task.status,
      task.priority,
      format(new Date(task.startDate), "dd/MM/yyyy"),
      format(new Date(task.dueDate), "dd/MM/yyyy"),
    ]);

    // Bảng chi tiết công việc
    autoTable(pdf, {
      startY: pdf.previousAutoTable ? pdf.previousAutoTable.finalY + 15 : 85,
      head: [["Title", "Status", "Priority", "Start Date", "Due Date"]],
      body: taskTable,
    });

    pdf.save(`task-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={exportToCSV}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF}>
          <FileText className="w-4 h-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;
