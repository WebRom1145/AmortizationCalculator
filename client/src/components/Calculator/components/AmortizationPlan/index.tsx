import {
  CardStyle,
  ContainerStyle,
  TablHeadStyle,
  TableRowStyle,
  TableStlye,
  TitleStyle,
  TypographyStlye,
} from "./css";

import { AmortizationScheduleData } from "../../typings";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type AmortizationPlanProps = {
  monthlyRate: number;
  residualDebts: number;
  amortizationScheduleData: Array<AmortizationScheduleData>;
};

const AmortizationPlan = ({
  monthlyRate,
  residualDebts,
  amortizationScheduleData,
}: AmortizationPlanProps): JSX.Element => {
  return (
    <Container sx={ContainerStyle} maxWidth="md">
      <TableContainer component={Paper}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={TitleStyle} variant="h5" component="div">
            TILGUNGSPLAN
          </Typography>
          <Card variant="outlined" sx={CardStyle}>
            <CardContent>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={TypographyStlye}
                  color="text.secondary"
                  gutterBottom
                >
                  Monats Rate:
                </Typography>
                <Typography
                  sx={TypographyStlye}
                  color="text.secondary"
                  gutterBottom
                >
                  {monthlyRate} EUR
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={TypographyStlye}
                  color="text.secondary"
                  gutterBottom
                >
                  Restschuld:
                </Typography>
                <Typography
                  sx={TypographyStlye}
                  color="text.secondary"
                  gutterBottom
                >
                  {residualDebts} EUR
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Table sx={TableStlye} stickyHeader>
          <TableHead sx={TablHeadStyle}>
            <TableRow>
              <TableCell>Jahr</TableCell>
              <TableCell align="right">Rate </TableCell>
              <TableCell align="right">Zinsanteil</TableCell>
              <TableCell align="right">Tilgungsanteil</TableCell>
              <TableCell align="right">Restschuld</TableCell>
            </TableRow>
          </TableHead>
          {
            <TableBody>
              {amortizationScheduleData?.map((row) => (
                <TableRow key={row.year} sx={TableRowStyle} hover>
                  <TableCell component="th" scope="row">
                    {row.year}
                  </TableCell>
                  <TableCell align="right">{row.rate} EUR</TableCell>
                  <TableCell align="right">{row.interestPortion} EUR</TableCell>
                  <TableCell align="right">{row.repaymentPart} EUR</TableCell>
                  <TableCell align="right">{row.residualDebt} EUR</TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
        </Table>
      </TableContainer>
    </Container>
  );
};
export default AmortizationPlan;
