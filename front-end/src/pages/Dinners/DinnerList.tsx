import React, { useEffect, useState } from 'react';
import DinnerCard from './DinnerCard';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import { Dinner } from '../../types'
import { User } from '../../types'
import client from '../../feathers-client';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 10000,
      // backgroundColor: '#b3cbb9',
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    button: {
      margin: theme.spacing(0.5),
      backgroundColor: "white",
    },
  }),
);

export default function DinnerList() {
  const classes = useStyles();
  const [dinners, setDinners] = useState([]);
  const componentName = "dinnerList";
  //const [clicked, setClicked] = useState(false)
  const [clicked, setClicked] = useState([false, false, false, false]);
  //const [activeButton, setActiveButton] = useState<number>();
  const [alignment, setAlignment] = useState<string | null>();

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  const defaultPage = () => {
    client.service('dinners')
      .find({
        query: {
          $sort: {
            dinners_id: 1
          }
        }
      })
      .then((res: any) => {
        //console.log(res.data);
        setDinners(res.data);
      })
      .catch((e: Error) => { console.log('error', e); })
  }

  useEffect(() => defaultPage(), []);

  const handleClick = (input: number) => {

    let clickedArray = [...clicked];
    if (clickedArray[input] === true) {
      defaultPage()
      clickedArray[input] = false;
      setClicked(clickedArray)
      return;
    }

    clickedArray[input] = !clickedArray[input]
    setClicked(clickedArray)

    let query: any = { $sort: {} }
    switch (input) {
      case 0:
        query['$sort'].tags = 1;
        break
      case 1:
        query['$sort'].allergens = 1;
        break
      case 2:
        query['$sort'].address = 1;
        break
      case 3:
        query['$sort'].name = 1;
        break
    }
    console.log(query)
    client.service('dinners')
      .find({
        query
      })
      .then((res: any) => {
        setDinners(res.data);
      })
      .catch((e: Error) => { console.log('error', e); })
  };


  return (
    <div>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton
          size="medium"
          value="tags"
          className={classes.button}
          onClick={() => handleClick(0)}
          aria-label="tags"
        >
          Tags
        </ToggleButton>
        <ToggleButton
          size="medium"
          value="allergens"
          className={classes.button}
          onClick={() => handleClick(1)}
          aria-label="allergens"
        >
          Allergens
        </ToggleButton>
        <ToggleButton
          size="medium"
          value="address"
          className={classes.button}
          onClick={() => handleClick(2)}
          aria-label="address">
          Address
        </ToggleButton>
        <ToggleButton
          size="medium"
          value="title"
          className={classes.button}
          onClick={() => handleClick(3)}
          aria-label="tile">
          Title
        </ToggleButton>
      </ToggleButtonGroup>
      <div className={classes.root}>
        <Grid
          container spacing={3}
          className={componentName}
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
        >
          {dinners.length && dinners!.map((dinner: Dinner) => (
            <Grid item>
              <DinnerCard {...dinner} key={dinner.dinners_id} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}