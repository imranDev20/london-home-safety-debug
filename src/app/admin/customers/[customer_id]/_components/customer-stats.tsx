import Card from "@mui/joy/Card";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";

function CustomerStatBlock({
  title,
  count,
  additional,
}: {
  title: string;
  count: number;
  additional: string;
}) {
  return (
    <Grid xs={12} md={6} lg={3}>
      <Card>
        <Typography level="title-md">{title}</Typography>
        <Typography level="h3" color="primary">
          {count}
        </Typography>
        <Typography level="body-sm" color="neutral">
          {additional}
        </Typography>
      </Card>
    </Grid>
  );
}

export default function CustomerStats() {
  return (
    <Grid spacing={2} my={3} container>
      <CustomerStatBlock
        title="Total Spent"
        count={10440.2}
        additional="New cost last 365 days"
      />

      <CustomerStatBlock
        title="Total Orders"
        count={127}
        additional="New cost last 365 days"
      />

      <CustomerStatBlock
        title="Completed"
        count={100}
        additional="New cost last 365 days"
      />

      <CustomerStatBlock
        title="Cancelled"
        count={12}
        additional="New cost last 365 days"
      />
    </Grid>
  );
}
