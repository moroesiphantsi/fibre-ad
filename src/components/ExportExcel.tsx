import * as XLSX from "xlsx";
import { Button } from "@mui/material";

const ExportExcel = ({ leads }: any) => {
  const exportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(leads);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    XLSX.writeFile(workbook, "fibre-leads.xlsx");
  };

  return (
    <Button variant="contained" onClick={exportData}>
      📤 Export Excel
    </Button>
  );
};

export default ExportExcel;