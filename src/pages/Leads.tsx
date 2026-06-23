import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Chip,
  IconButton,
} from "@mui/material";

import {
  WhatsApp,
  Email,
  Delete,
  Search,
} from "@mui/icons-material";

import {
  ref,
  onValue,
  remove,
  update,
} from "firebase/database";

import { db } from "../firebase";

import StatsCards from "../components/StatsCards";
import ExportExcel from "../components/ExportExcel";
import AgentAssign from "../components/AgentAssign";

const Leads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const leadRef = ref(db, "fibreLeads");

    onValue(leadRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formatted = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setLeads(formatted.reverse());
      } else {
        setLeads([]);
      }
    });
  }, []);

  const deleteLead = (id: string) => {
    remove(ref(db, `fibreLeads/${id}`));
  };

  const updateStatus = (id: string, status: string) => {
    update(ref(db, `fibreLeads/${id}`), { status });
  };

  const filteredLeads = leads.filter((lead) =>
    `${lead.name} ${lead.surname} ${lead.email} ${lead.address} ${lead.contact}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <Box sx={{ bgcolor: "#0f172a", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">


        {/* 📊 STATS */}
        <StatsCards leads={filteredLeads} />

        {/* 📤 EXPORT BUTTON */}
        <Box sx={{ mt: 2 }}>
          <ExportExcel leads={filteredLeads} />
        </Box>

        {/* HEADER */}
        <Typography variant="h4" color="white" fontWeight="bold" sx={{ mt: 3 }}>
          Fibre Leads Dashboard
        </Typography>

        {/* SEARCH */}
        <Paper sx={{ p: 2, mt: 3, display: "flex", gap: 2 }}>
          <Search />
          <TextField
            fullWidth
            placeholder="Search leads..."
            variant="standard"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>

        {/* LEADS GRID */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {filteredLeads.map((lead) => (
            <Grid item xs={12} md={4} key={lead.id}>
              <Paper sx={cardStyle}>

                <Typography fontWeight="bold" fontSize="18px">
                  {lead.name} {lead.surname}
                </Typography>

                <Typography>{lead.email}</Typography>
                <Typography>{lead.address}</Typography>
                <Typography>{lead.contact}</Typography>

                <Typography sx={{ mt: 1 }}>
                  ID: {lead.idNumber || "N/A"}
                </Typography>

                {/* PACKAGE PLAN */}
<Chip
  label={`📦 ${lead.packagePlan || "No Package"}`}
  sx={{ mt: 1, mr: 1, bgcolor: "#4DA3FF", color: "white" }}
/>

<Chip
  label={`💰 ${lead.price || "N/A"}`}
  sx={{ mt: 1, bgcolor: "#22c55e", color: "white" }}
/>

                {/* STATUS */}
                <Chip
                  label={lead.status || "New"}
                  sx={{ mt: 1, bgcolor: "#4DA3FF", color: "white" }}
                />

                {/* AGENT ASSIGN */}
                <Box sx={{ mt: 2 }}>
                  <AgentAssign
                    leadId={lead.id}
                    current={lead.assignedAgent}
                  />
                </Box>

                {/* STATUS BUTTONS */}
                <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button size="small" onClick={() => updateStatus(lead.id, "Contacted")}>
                    Contacted
                  </Button>

                  <Button size="small" onClick={() => updateStatus(lead.id, "Installed")}>
                    Installed
                  </Button>

                  <Button size="small" onClick={() => updateStatus(lead.id, "Cancelled")}>
                    Cancel
                  </Button>
                </Box>


                {/* ACTION BUTTONS */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>

                  <IconButton
  onClick={() => {
    const phone = lead.contact?.replace(/\D/g, "");

    const message = `Hello ${lead.name},

Your Fibre Application Status: ${lead.status || "New"}

Selected Package: ${lead.packagePlan || "N/A"}
Price: ${lead.price || "N/A"}

Thank you for choosing our fibre services.

Kind Regards,
Internet Fibre Team`;

    window.open(
      `https://wa.me/27${phone.startsWith("0") ? phone.substring(1) : phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }}
  sx={{ color: "#25D366" }}
>
  <WhatsApp />
</IconButton>

                  <IconButton
  onClick={() => {
    const subject = `Fibre Application Update - ${lead.status}`;

    const body = `Hello ${lead.name},

Your Fibre Application Status: ${lead.status || "New"}

Selected Package: ${lead.packagePlan || "N/A"}
Price: ${lead.price || "N/A"}

Thank you for choosing Internet Fibre.

Kind Regards,
Internet Fibre Team`;

    window.open(
      `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
  }}
  sx={{ color: "#3b82f6" }}
>
  <Email />
</IconButton>


                  <IconButton
                    onClick={() => deleteLead(lead.id)}
                    sx={{ color: "#ef4444" }}
                  >
                    <Delete />
                  </IconButton>

                </Box>

              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default Leads;

/* STYLES */
const cardStyle = {
  p: 3,
  borderRadius: 3,
  bgcolor: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(10px)",
};
