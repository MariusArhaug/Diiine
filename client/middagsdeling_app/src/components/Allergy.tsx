import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        allergy: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        allergyField: {
            width: "100%",
            textAlign: "start",
        },
    }),
);

const allergies = [
    {
        value: 'lactose',
        label: 'Lactose'
    },
    {
        value: 'gluten',
        label: 'Gluten'
    },
    {
        value: 'egg',
        label: 'Egg'
    },
    {
        value: 'nuts',
        label: 'Nuts'
    },
    {
        value: 'other',
        label: 'Other'
    },
];

type AllergyProps = {
    deleteSelf: () => typeof Allergy
}

export default function Allergy(props: AllergyProps) {

    const classes = useStyles();

    const [allergy, setAllergy] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllergy(event.target.value);
    };

    return (
        <div className={classes.allergy}>
            <TextField
                className={classes.allergyField}
                select
                value={allergy}
                onChange={handleChange}
                >
                {allergies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <IconButton onClick={props.deleteSelf}>
                <ClearIcon />
            </IconButton >
        </div>
        )

}