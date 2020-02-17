import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MoneyOutlinedIcon from '@material-ui/icons/MoneyOutlined';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Button from '@material-ui/core/Button';

// TODO: Move to enums
enum AccountType {
    ISK = 'ISK',
    REGULAR = 'Regular',
};

const ISK_TAX_PER_YEAR = 0.004;
const REGULAR_EARNINGS_TAX = 0.3;

const useStyles = makeStyles(() =>
  createStyles({
    marginTop: {
      marginTop: '20px',
    },
    result: {
        minHeight: '70px',
    }
  }),
);

export function StockMath () {
    // TODO: Refactor to use one useState for all, i.e.
    // const [values, setValues] = React.useState<State>({
    //     amount: '',
    //     password: '',
    //     weight: '',
    //     weightRange: '',
    //     showPassword: false,
    //   });
    
    //   const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValues({ ...values, [prop]: event.target.value });
    //   };
    const classes = useStyles();
    const [accountType, setAccountType] = useState<AccountType>(AccountType.ISK);
    const [startAmount, setStartAmount] = useState<number>(0);
    const [investmentPerYear, setInvestmentPerYear] = useState<number>(5000);
    const [yieldPerYear, setYieldPerYear] = useState<number>(7);
    const [years, setYears] = useState<number>(30);
    const [result, setResult] = useState<number | null>(null);

    const handleAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountType(event.target.value as AccountType);
        setResult(null);
    }

    const calculateISK = (tax: number) => {
        let result: number = 0;
        for (let i: number = 1; i <= years; i++) {
            // ISK
            if (i === 1) {
                // First year
                result = (startAmount + investmentPerYear) * (1 + (yieldPerYear / 100));
            } else {
                result = (result + investmentPerYear) * (1 + (yieldPerYear / 100));
            }
            result = result - (result * tax);
        }
        return result;
    }

    const calculateRegular = (tax: number) => {
        let result: number = 0;
        for (let i: number = 1; i <= years; i++) {
            // ISK
            if (i === 1) {
                // First year
                result = (startAmount + investmentPerYear) * (1 + (yieldPerYear / 100));
            } else {
                result = (result + investmentPerYear) * (1 + (yieldPerYear / 100));
            }
        }
        const earningsTax: number = (result - (startAmount + (investmentPerYear * years))) * tax;
        return result - earningsTax;
    }
    
    const calculateEarnings = () => {
        let tax: number;
        let result: number = 0;
        if (accountType === AccountType.ISK) {
            tax = ISK_TAX_PER_YEAR;
            result = calculateISK(tax);
        } else {
            tax = REGULAR_EARNINGS_TAX;
            result = calculateRegular(tax);
        }
        setResult(result);
    }

    // TODO: Make individual components
    return (
        <>
            <div className={classes.result}>
                {result ?
                    `After ${years} years you will have ${new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(result)}`
                        : <div className={classes.result} />}
            </div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Account type:</FormLabel>
                <RadioGroup aria-label="accountType" name="accountType" value={accountType} onChange={handleAccountTypeChange}>
                    <FormControlLabel value={AccountType.ISK} control={<Radio />} label="ISK (0.4% per year)" />
                    <FormControlLabel value={AccountType.REGULAR} control={<Radio />} label="Regular (30% on profit)" />
                </RadioGroup>
            </FormControl>
            <TextField
                className={classes.marginTop}
                fullWidth
                label="Start amount:"
                type="number"
                value={startAmount} 
                onChange={
                    (ev: React.ChangeEvent<HTMLInputElement>) => {
                        setStartAmount(parseInt(ev.target.value, 10))
                        setResult(null);
                    }
                }
                InputProps={
                    {
                        startAdornment: (
                            <InputAdornment position="start">
                                <MoneyOutlinedIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">SEK</InputAdornment>
                        ),
                        inputProps: { 
                            min: 0 
                        }
                    }
                }
            />
            <TextField
                className={classes.marginTop}
                fullWidth
                label="Investment per year:"
                type="number"
                value={investmentPerYear} 
                onChange={
                    (ev: React.ChangeEvent<HTMLInputElement>) => {
                        setInvestmentPerYear(parseInt(ev.target.value, 10))
                        setResult(null);
                    }
                }
                InputProps={
                    {
                        startAdornment: (
                            <InputAdornment position="start">
                                <MoneyOutlinedIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">SEK</InputAdornment>
                        ),
                        inputProps: { 
                            min: 0,
                        }
                    }
                }
            />
            <TextField
                className={classes.marginTop}
                fullWidth
                label="Yield per year:"
                type="number"
                value={yieldPerYear} 
                onChange={
                    (ev: React.ChangeEvent<HTMLInputElement>) => {
                        setYieldPerYear(parseInt(ev.target.value, 10))
                        setResult(null);
                    }
                }
                InputProps={
                    {
                        startAdornment: (
                            <InputAdornment position="start">
                                {yieldPerYear > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: { 
                            min: -100,
                            max: 100, 
                        }
                    }
                }
            />
            <TextField
                className={classes.marginTop}
                fullWidth
                label="Number of years:"
                type="number"
                value={years} 
                onChange={
                    (ev: React.ChangeEvent<HTMLInputElement>) => {
                        setYears(parseInt(ev.target.value, 10));
                        setResult(null);
                    }
                }
                InputProps={
                    {
                        startAdornment: (
                            <InputAdornment position="start">
                                <ScheduleOutlinedIcon />
                            </InputAdornment>
                        ),
                        inputProps: { 
                            min: 0 
                        }
                    }
                }
            />
            <Button className={classes.marginTop} fullWidth variant="contained" color="primary" onClick={() => calculateEarnings()}>
               Calculate
            </Button>
        </>
    );
}