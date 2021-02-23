import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar, Link } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from '../styles';
import { Link as RouterLink } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';


type Allergene = {
    name: string;
    tag: string;
}

type Tags = {
    name: string;
    tag: string; 
}

const allergenes = [{name: "Lactose", tag: "lactose"}, {name: "Gluten", tag: "gluten"}, {name: "Nuts", tag: "nuts"}, 
{name: "Sesame seeds", tag: "sesameseeds"}, {name: "Shellfish", tag: "shellfish"}, {name: "Egg", tag: "egg"}, 
{name: "Fish", tag: "fish"}, {name: "Mustard", tag: "mustard"}, {name: "Celery", tag: "celery"}, {name: "Peanuts", tag: "peanuts"}, 
{name: "Soy", tag: "soy"}, {name: "Molluscs", tag: "molluscs"}, {name: "Lupine", tag: "lupine"}, 
{name: "Sulfur Dioxide", tag: "sulfurdioxide"}, {name: "Other", tag: "other"}]

const tags = [{name: "Vegan", tag: "vegan"}, {name: "Healthy", tag: "healthy"}, {name: "Meatlover", tag: "meatlover"}, 
{name: "PizzaParty", tag: "pizzaparty"}, {name: "Delicious", tag: "delicious"}, {name: "Italian", tag: "italian"}]



export default function NewDinner() {
    
    const classes = useStyles();

    const [state, setState] = React.useState({
        checked: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return(
        <div >
            <Paper className={classes.newDinner}>
                <div className={classes.flexerVertical}>
                    <Avatar className={classes.icon}><FastfoodIcon /></Avatar>
                    <h1>Add new dinner</h1>
                    <h5>Please enter information about your dinner</h5>
                    <TextField label="Dinner name" placeholder='Enter name' />
                    <TextField label="Description" placeholder='Enter description' multiline rows={4} variant="outlined"/>
                    <TextField label="Location" placeholder='Enter location' />
                    <TextField label="Maximum guests" placeholder='Enter maximum guests' type="number" />
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={allergenes}
                        getOptionLabel={(option: Allergene) => option.name}
                        // defaultValue={[allergenes[0]]}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Allergies"
                            placeholder="Allergy"
                        />
                        )}
                        />
                        <Autocomplete
                            multiple
                                id="tags-filled"
                                options={tags.map((option) => option.name)}
                                // defaultValue={[tags[0].name]}
                                freeSolo
                                renderTags={(value: string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                                }
                                renderInput={(params) => (
                                <TextField {...params} label="Tags" placeholder="Tag" />
                                )}
                        />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.checked}
                                onChange={handleChange}
                                name="checked"
                                color="primary"
                            />
                        }
                        label="Share the recepit?"
                    />
                    <Button component={RouterLink} to="/" variant="contained" color="primary">
                        Add dinner
                    </Button>

                </div>
            </Paper>
        </div>


    )


}    