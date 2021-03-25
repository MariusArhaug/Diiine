import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import client from '../../feathers-client'
import { useStyles } from '../../styles';
import { Chip, User } from '../../types';
import { Dinner } from '../../types';
import { useParams } from 'react-router-dom';

const allergies: Chip[] = [
	{ label: 'Lactose', value: 'lactose' },
	{ label: 'Gluten', value: 'gluten' },
	{ label: 'Shellfish', value: 'shellfish' },
	{ label: 'Egg', value: 'egg' },
	{ label: 'Fish', value: 'fish' },
	{ label: 'Mustard', value: 'mustard' },
	{ label: 'Celleri', value: 'celleri' },
	{ label: 'Peanuts', value: 'peanuts' },
	{ label: 'Soy', value: 'soy' },
	{ label: 'Molluscs', value: 'molluscs' },
	{ label: 'Lupin', value: 'lupin' },
	{ label: 'Sulfites', value: 'sulfites' },
]

const tags: Chip[] = [
	{ label: 'Vegan', value: 'vegan' },
	{ label: 'Meat', value: 'meat' },
	{ label: 'Pasta', value: 'pasta' }
]

export default function EditDinner() {

	const classes = useStyles();
	let { dinnerId }: { dinnerId: string } = useParams();
	const [state, setState] = useState<{ owner: User | null, dinner: Dinner | null }>({
		owner: null,
		dinner: null
	});

	type Cred = {
		title: string,
		address: string,
		description: string,
		date: Date,
		tags: Chip[],
		allergens: Chip[],
		attendants: number,
		isDivided: boolean,
		isOpen: boolean,
		expenses: number,
		banner: string
	}

	const [credentials, setCredentials] = useState<Cred>
		({
			title: "",
			address: "",
			description: "",
			date: new Date(),
			tags: [],
			allergens: [],
			attendants: 0,
			isDivided: false,
			isOpen: false,
			expenses: 0,
			banner: ''
		});

	useEffect(() => {
		//Find dinner that we clicked on
		let dinner: Dinner;
		client.service('dinners')
			.get(dinnerId)
			.then((resDinner: Dinner) => {
				dinner = resDinner;
				console.log(dinner);
				client.service('users')
					.get(dinner.user_id)
					.then((resOwner: User) => {
						const allergensChipArray: Chip[] = createChipArray(dinner.allergens.split(","));
						const tagsChipArray: Chip[] = createChipArray(dinner.tags.split(","));
						const newDate: Date = resDinner.date
						let newDinner: Cred = {
							...resDinner,
							allergens: allergensChipArray,
							tags: tagsChipArray,
							date: newDate
						};
						setCredentials(newDinner);
					})
			})
			.catch((e: Error) => { console.log('error', e); })
	}, []);


	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === 'isDivided' || event.target.name === 'isOpen') {
			setCredentials((credentials) => ({
				...credentials,
				[event.target.name]: event.target.checked,
			}));
		} else {
			setCredentials((credentials) => ({
				...credentials,
				[event.target.name]: event.target.value,
			}));
		}

	}

	const createChipArray = (value: any) => {
		let temp = []
		for (let element of value) {
			if (!(element.hasOwnProperty("label")) || !(element.hasOwnProperty("value"))) {
				temp.push({ label: element, value: element })
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
		console.log('hello')
		event.preventDefault();
		setCredentials(credentials)

		const form = {
			...credentials,
			allergens: credentials.allergens.map(a => a.label).join(","),
			tags: credentials.tags.map(t => t.value).join(",")/* ,
            ingredients: credentials.ingredients.join(",") */
		};

		client.service('dinners').patch(dinnerId, form)
			.then()
			.catch((e: Error) => {
				console.log('couldn\'t create dinner', e);
			});
	}

	return (
		<div className={classes.spacer}>
			<Container maxWidth="sm">
				<Paper style={{ padding: "50px" }}>
					<form method='POST' onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Typography variant="h4">
									Edit Dinner
                                </Typography>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={3}>
									<Grid item xs={6}>
										<TextField
											id='title'
											label='Dinner name'
											className='form-field'
											type='text'
											name='title'
											value={credentials.title}
											style={{ width: "100%" }}
											onChange={handleInputChange}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											id="date"
											label="Date"
											type="date"
											name="date"
											value={credentials.date}
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
									id="description"
									label="Description"
									name="description"
									multiline
									rows={4}
									style={{ width: "100% " }}
									value={credentials.description}
									onChange={handleInputChange}
									variant="outlined"
								/>
							</Grid>

							<Grid item xs={12}>
								<FormGroup>
									<FormControlLabel
										control={<Checkbox checked={credentials.isDivided} onChange={handleInputChange} name="isDivided" color="primary" />}
										label="Split the bill"
									/>
									<FormControlLabel
										control={<Checkbox checked={credentials.isOpen} onChange={handleInputChange} name="isOpen" color="primary" />}
										label="Open"
									/>
								</FormGroup>
							</Grid>

							<Grid item xs={12}>
								<Autocomplete
									multiple
									id="tags-standard"
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
									/* value={credentials.tags} */
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
								<Button onClick={handleSubmit} variant="contained" color="primary" style={{ width: "100%" }}>
									Save changes
                </Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Container>
		</div>
	)
}
