import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import client from '../feathers-client'
import { useStyles } from '../styles';
import { stringify } from 'querystring';
//import { Link as RouterLink } from 'react-router-dom';

const allergies: Chip[] = [
    { label: 'Lactose', value: 'lactose' },
    { label: 'Gluten', value: 'gluten' },
    { label: 'Nuts', value: 'nuts' },
]

type Chip = {label: string; value: string};

const tags: Chip[] = [
    { label: 'Vegan', value: 'vegan' },
    { label: 'Meat', value: 'meat' }
]



export default function MyDinners() {

    const classes = useStyles();

    const [credentials, setCredentials] = useState<{
        name: string,
        address: string,
        description: string,
        date: string,
        tags: Chip[],
        ingredients: string[],
        allergens: Chip[],
        attendants: number,
        isDivided: false,
        isOpen: false,
        expenses: number,
        banner: string
    }>({
        name: '',
        address: '',
        description: '',
        date: '',
        tags: [],
        ingredients: [],
        allergens: [],
        attendants: 0,
        isDivided: false,
        isOpen: false,
        expenses: 0,
        banner: ''
    });

    const test = {
        name: 'test',
        address: 'test',
        description: 'test',
        date: '2001-01-01',
        tags: 'test',
        ingredients: '',
        allergens: '',
        attendants: 0,
        isDivided: false,
        isOpen: false,
        expenses: 0,
        banner: ''
    }

    const [checkState, setCheckState] = useState({
        isDivided: false,
        isOpen: false,
    });

    const handleChange = (event: any) => {
        setCheckState({ ...checkState, [event.target.name]: event.target.checked });
    };

    const { isDivided, isOpen } = checkState;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((credentials) => ({
            ...credentials,
            [event.target.name]: event.target.value,
        }));
    }

    const createChipArray = (value: any) => {
        let temp = []
        for (let element of value){
            if (!(element.hasOwnProperty("label")) || !(element.hasOwnProperty("value"))){
                temp.push({label: element, value: element})
            }
            else {
                temp.push(element)
            }
        }
        return temp
    }

    const handleTagChange = (event: any, value: any) => {
        console.log(event);
        
        setCredentials({ ...credentials, tags: createChipArray(value) });
    }

    const handleAllergenChange = (event: any, value: any) => {
        setCredentials({ ...credentials, allergens: createChipArray(value) });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(credentials)
        // const dinner = client.service('dinners').create(credentials)
        const dinner = client.service('dinners').create(test)
            .then()
            .catch((e: Error) => {
                console.log('couldn\'t create user', e);
            });
        console.log(dinner);
    }

    return (
        <div className={classes.spacer}>
            <Container maxWidth="sm">
                <Paper style={{ padding: "50px" }}>
                    <form method='POST' onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Create Dinner
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id='name'
                                            label='Dinner name'
                                            className='form-field'
                                            type='text'
                                            name='name'
                                            value={credentials.name}
                                            style={{ width: "100%" }}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="date"
                                            label="Birthday"
                                            type="date"
                                            name="date"
                                            defaultValue={credentials.date}
                                            // className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='address'
                                    label='Address'
                                    className='form-field'
                                    type='text'
                                    name='address'
                                    value={credentials.address}
                                    style={{ width: "100%" }}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    style={{ width: "100% " }}
                                    defaultValue="Description"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={isDivided} onChange={handleChange} name="isDivided" color="primary" />}
                                        label="Split the bill"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={isOpen} onChange={handleChange} name="isOpen" color="primary" />}
                                        label="Open"
                                    />

                                </FormGroup>
                            </Grid>

                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    value={credentials.allergens}
                                    onChange={handleAllergenChange}
                                    options={allergies}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Allergens"
                                            placeholder="Allergy"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    value={credentials.tags}
                                    options={tags}
                                    freeSolo
                                    onChange={handleTagChange}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Tags"
                                            placeholder="Tag"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" style={{ width: "100%" }} onClick={() => { console.log(credentials) }}>
                                    Create dinner!
                                </Button>
                                {/* <Button type='submit' variant="contained" color="primary" style={{ width: "100%" }}>
                                    Create dinner!
                                </Button> */}
                            </Grid>

                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}