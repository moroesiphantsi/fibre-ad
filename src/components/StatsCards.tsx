import { Grid, Paper, Typography } from "@mui/material";

const StatsCards = ({ leads }: any) => {
  const total = leads.length;
  const newLeads = leads.filter((l: any) => l.status === "New Lead").length;
  const contacted = leads.filter((l: any) => l.status === "Contacted").length;
  const installed = leads.filter((l: any) => l.status === "Installed").length;

  const conversion = total ? ((installed / total) * 100).toFixed(1) : 0;


  const Card = ({ title, value }: any) => (
    <Paper sx={cardStyle}>
      <Typography fontSize={14}>{title}</Typography>
      <Typography fontSize={28} fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={6} md={3}>
        <Card title="Total Leads" value={total} />
      </Grid>

      <Grid item xs={6} md={3}>
        <Card title="New Leads" value={newLeads} />
      </Grid>

      <Grid item xs={6} md={3}>
        <Card title="Installed" value={installed} />
      </Grid>

      <Grid item xs={6} md={3}>
        <Card title="Contacted" value={contacted} />
      </Grid>

      <Grid item xs={6} md={3}>
        <Card title="Conversion %" value={conversion + "%"} />
      </Grid>
    </Grid>
  );
};

export default StatsCards;

const cardStyle = {
  p: 2,
  borderRadius: 3,
  bgcolor: "white",
};