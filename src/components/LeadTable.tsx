import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
} from "@mui/material";

const LeadTable = ({ leads, onSelect }: any) => {
  return (
    <Paper
      sx={{
        mt: 3,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>

        {/* HEADER */}
        <TableHead sx={{ bgcolor: "#0f172a" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Name
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Contact
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Email
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Address
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Package
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Price
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {leads.map((lead: any) => (
            <TableRow
              key={lead.id}
              onClick={() => onSelect(lead)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  background: "#f1f5f9",
                },
              }}
            >
              {/* NAME */}
              <TableCell>
                <Typography fontWeight="bold">
                  {lead.name} {lead.surname}
                </Typography>
              </TableCell>

              {/* CONTACT */}
              <TableCell>{lead.contact}</TableCell>

              {/* EMAIL */}
              <TableCell>{lead.email}</TableCell>

              {/* ADDRESS */}
              <TableCell>{lead.address}</TableCell>

              {/* PACKAGE */}
              <TableCell>
                <Chip
                  label={lead.packagePlan || "Not Selected"}
                  sx={{
                    bgcolor: "#4DA3FF",
                    color: "white",
                  }}
                  size="small"
                />
              </TableCell>

              {/* PRICE */}
              <TableCell>
                <Chip
                  label={lead.price || "N/A"}
                  sx={{
                    bgcolor: "#22c55e",
                    color: "white",
                  }}
                  size="small"
                />
              </TableCell>

              {/* STATUS */}
              <TableCell>
                <Chip
                  label={lead.status || "New"}
                  sx={{
                    bgcolor: "#f59e0b",
                    color: "white",
                  }}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </Paper>
  );
};

export default LeadTable;