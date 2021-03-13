import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      maxWidth: 500,
      margin: 'auto',
      marginTop: '1rem'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);


export default function SearchBar() {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const searchInput = event.target.value.toLowerCase();
    //Get all dinnerCard DOMs
    const dinnerCards = Array.from(document.getElementsByClassName('DinnerCard') as HTMLCollectionOf<HTMLElement>);

    //Display dinnerCard that matches with search input
    dinnerCards.forEach((dinnerCard: HTMLElement) => {
      let dinnerInfo = Array.from(dinnerCard.getElementsByClassName('dinnerInfo'));

      const dinnerText = [...dinnerInfo.map(info => info.textContent?.toLocaleLowerCase())]
      console.log(dinnerText)
      if (dinnerText.find(a => a?.includes(searchInput))) {
        dinnerCard.style.display = 'block';
      } else {
        dinnerCard.style.display = 'none';
      }
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }


  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search for dinners"
        inputProps={{ 'aria-label': 'search for dinners' }}
        onChange={handleChange}
      />
      <IconButton type="submit" onSubmit={handleSubmit} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );


}