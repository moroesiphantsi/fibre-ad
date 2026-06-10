import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";

import {
  WhatsApp,
  Phone,
  Add,
  Search,
  Person,
  CheckCircle,
} from "@mui/icons-material";

import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

const Agents = () => {
  const [search, setSearch] = useState("");

  const [agents, setAgents] = useState([
    {
      name: "Lebohang Molelekoa",
      leads: 0,
      status: "Online",
      phone: "0685932102",
    },
  ]);

  useEffect(() => {
    const leadsRef = ref(db, "fibreLeads");

    const unsubscribe = onValue(leadsRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setAgents([
          {
            name: "Lebohang Molelekoa",
            leads: 0,
            status: "Online",
            phone: "0685932102",
          },
        ]);
        return;
      }

      const allLeads = Object.values(data) as any[];

      const lebohangLeads = allLeads.filter(
        (lead: any) =>
          lead.assignedAgent === "Lebohang Molelekoa"
      ).length;

      setAgents([
        {
          name: "Lebohang Molelekoa",
          leads: lebohangLeads,
          status: "Online",
          phone: "0685932102",
        },
      ]);
    });

    return () => unsubscribe();
  }, []);

  const filtered = agents.filter((agent) =>
    agent.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={container}>
      {/* HEADER */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "white" }}
      >
        👨‍💼 Agents Management
      </Typography>

      <Typography
        sx={{
          color: "#cbd5e1",
          mb: 3,
        }}
      >
        Manage fibre sales agents, track performance &
        communication
      </Typography>

      {/* SEARCH */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            bgcolor: "white",
            borderRadius: 2,
          }}
          InputProps={{
            startAdornment: (
              <Search sx={{ mr: 1 }} />
            ),
          }}
        />
      </Box>

      {/* ADD AGENT CARD */}
      <Paper sx={addCard}>
        <Typography fontWeight="bold">
          Add New Agent
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          <TextField
            size="small"
            placeholder="Name"
          />

          <TextField
            size="small"
            placeholder="Phone"
          />

          <Button
            variant="contained"
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>
      </Paper>

      {/* AGENTS GRID */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filtered.map((agent, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper sx={card}>
              {/* TOP INFO */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#4DA3FF",
                    width: 60,
                    height: 60,
                  }}
                >
                  <Person />
                </Avatar>

                <Box>
                  <Typography
                    fontWeight="bold"
                    fontSize="18px"
                  >
                    {agent.name}
                  </Typography>

                  <Chip
                    size="small"
                    label={agent.status}
                    color={
                      agent.status === "Online"
                        ? "success"
                        : "default"
                    }
                    icon={<CheckCircle />}
                  />
                </Box>
              </Box>

              {/* STATS */}
              <Box sx={{ mt: 3 }}>
                <Typography>
                  📊 Leads Assigned:{" "}
                  <b>{agent.leads}</b>
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  📞 {agent.phone}
                </Typography>
              </Box>

              {/* ACTIONS */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <IconButton
                  sx={{ color: "#25D366" }}
                  onClick={() =>
                    window.open(
                      "https://wa.me/27685932102",
                      "_blank"
                    )
                  }
                >
                  <WhatsApp />
                </IconButton>

                <IconButton
                  sx={{ color: "#2563eb" }}
                  onClick={() =>
                    window.open(
                      `tel:${agent.phone}`
                    )
                  }
                >
                  <Phone />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Agents;

/* STYLES */

const container = {
  minHeight: "100vh",
  p: 4,
  background:
    "linear-gradient(135deg,#0f172a,#1e3a8a,#0ea5e9)",
};

const card = {
  p: 3,
  borderRadius: 4,
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const addCard = {
  p: 2,
  borderRadius: 3,
  mb: 3,
  background: "rgba(255,255,255,0.95)",
};