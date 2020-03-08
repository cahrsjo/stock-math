import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    result: {
        minHeight: '70px',
    }
  }),
);

interface Props {
    result: number | null;
    years: number;
}

export function Result ({ result, years }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.result}>
            {result ?
                `After ${years} years you will have ${new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(result)}`
                    : <div className={classes.result} />}
        </div>
    );
}