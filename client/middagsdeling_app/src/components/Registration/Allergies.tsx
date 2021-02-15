import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import { useStyles } from '../../styles';

export default function Allergies() {

    const classes = useStyles();
    
    const [state, setState] = React.useState({
        lactose: false,
        gluten: false,
        eggs: false,
        nuts: false,
        test: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { lactose, gluten, eggs, nuts } = state;
    
    return (
        <div className={classes.flexerVertical}>
            <FormLabel component="legend">Choose allergies</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={lactose} onChange={handleChange} name="lactose" />}
                    label="Lactose"
                />
                <FormControlLabel
                    control={<Checkbox checked={gluten} onChange={handleChange} name="gluten" />}
                    label="Gluten"
                />
                <FormControlLabel
                    control={<Checkbox checked={eggs} onChange={handleChange} name="eggs" />}
                    label="Eggs"
                />
                <FormControlLabel
                    control={<Checkbox checked={nuts} onChange={handleChange} name="nuts" />}
                    label="Nuts"
                />
            </FormGroup>
        </div>
    )
}