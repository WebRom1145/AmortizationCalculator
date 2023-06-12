import { AmortizationScheduleData, LoanData } from "./typings";
import {
  CardStyle,
  FormControlStyle,
  SelectStyle,
  TextFieldStyle,
  TypographyStyle,
} from "./css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  getAmortizationScheduleData,
  getMonthlyRate,
  getResidualDebts,
} from "./api";

import AmortizationPlan from "./components/AmortizationPlan";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const getDropList = () => {
  return [...Array(30)].map((x, i) => (
    <MenuItem key={"period-" + i} value={i + 1}>
      {i + 1}
    </MenuItem>
  ));
};

const createDateObject = (
  loanAmount: number,
  debitInterest: number,
  redemption: number,
  period: number
): LoanData => {
  return { loanAmount, debitInterest, redemption, period };
};

const Calculator = () => {
  const [loanAmount, setLoanAmount] = useState("150000");
  const [debitInterest, setDebitInterest] = useState("3.5");
  const [redemption, setRedemption] = useState("5.5");
  const [period, setPeriod] = useState("10");
  const [monthlyRate, setmonthlyRate] = useState(0);
  const [residualDebts, setresidualDebts] = useState(0);
  const [amortizationScheduleData, setAmortizationScheduleData] = useState<
    Array<AmortizationScheduleData>
  >([]);
  const showResult = useRef(false);

  const handleChangeLoanAmount = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLoanAmount(event.target.value);
  };

  const handleChangeDebitInterest = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDebitInterest(event.target.value);
  };

  const handleChangeRedemption = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRedemption(event.target.value);
  };

  const handleChangePeriod = (event: SelectChangeEvent<string>) => {
    setPeriod(event.target.value);
  };

  const calculate = useCallback(() => {
    showResult.current = false;
    var loanData: LoanData = createDateObject(
      parseFloat(loanAmount),
      parseFloat(debitInterest),
      parseFloat(redemption),
      parseInt(period)
    );
    if (
      loanAmount === "" ||
      debitInterest === "" ||
      redemption === "" ||
      period === ""
    ) {
      return;
    }
    try {
      Promise.all([
        getAmortizationScheduleData(loanData),
        getMonthlyRate(loanAmount, debitInterest, redemption),
        getResidualDebts(loanData),
      ]).then((results) => {
        setAmortizationScheduleData(results[0].amortizationScheduleData);
        setmonthlyRate(results[1].monthlyRate);
        setresidualDebts(results[2].residualDebt);
        showResult.current = true;
      });
    } catch (e) {
      console.error(e);
    }
  }, [loanAmount, debitInterest, redemption, period]);

  useEffect(() => {
    if (showResult.current) {
      calculate();
    }
  }, [loanAmount, debitInterest, redemption, period, calculate]);

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={CardStyle}>
          <CardContent>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" component="div">
                TILGUNGSRECHNER
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={TypographyStyle}
                color="text.secondary"
                gutterBottom
              >
                Darlehensbetrag in Euro
              </Typography>
              <TextField
                id="loanAmount"
                variant="outlined"
                type="number"
                size="small"
                style={TextFieldStyle}
                value={loanAmount}
                onChange={handleChangeLoanAmount}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">EUR</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={TypographyStyle}
                color="text.secondary"
                gutterBottom
              >
                Sollzins % p.a.
              </Typography>

              <TextField
                size="small"
                style={TextFieldStyle}
                id="debitInterest"
                variant="outlined"
                type="number"
                value={debitInterest}
                onChange={handleChangeDebitInterest}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={TypographyStyle}
                color="text.secondary"
                gutterBottom
              >
                Tilgung % p.a.
              </Typography>

              <TextField
                id="redemption"
                variant="outlined"
                size="small"
                style={TextFieldStyle}
                type="number"
                value={redemption}
                onChange={handleChangeRedemption}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={TypographyStyle}
                color="text.secondary"
                gutterBottom
              >
                Zinsbindungsdauer
              </Typography>
              <FormControl sx={FormControlStyle} size="small">
                <InputLabel shrink={true} id="select-period">
                  Jahre
                </InputLabel>
                <Select
                  labelId="period"
                  id="period"
                  value={period}
                  onChange={handleChangePeriod}
                  style={SelectStyle}
                >
                  {getDropList()}
                </Select>
              </FormControl>
            </Grid>
            <Typography variant="h5" component="div"></Typography>
          </CardContent>
          <CardActions>
            <Button onClick={calculate} variant="outlined" size="small">
              berechnen
            </Button>
          </CardActions>
        </Card>
      </Container>
      {showResult.current && (
        <AmortizationPlan
          monthlyRate={monthlyRate}
          residualDebts={residualDebts}
          amortizationScheduleData={amortizationScheduleData}
        ></AmortizationPlan>
      )}
    </>
  );
};

export default Calculator;
