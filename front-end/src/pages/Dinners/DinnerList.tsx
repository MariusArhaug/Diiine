import React, { useEffect, useState } from 'react';
import DinnerCard from './DinnerCard';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Dinner } from '../../types'
import client from '../../feathers-client';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3)
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
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const componentName = "dinnerList";
  const [toggleButtons, setToggleButtons] = useState<{
    [key: string]: boolean
  }>({
    'tags': false,
    'allergens': false,
    'address': false,
    'title': false,
  });

  const [alignment, setAlignment] = useState<string | null>();

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  const defaultPage = () => {
    client.service('dinners')
      .find({ query: { $sort: { dinners_id: 1 } } })
      .then((res: any) => (console.log(res), setDinners(res.data)))
      .catch((e: Error) => { console.log(e); })
  }

  useEffect(() => defaultPage(), []);

  const handleClick = (input: string) => {

    if (toggleButtons[input] === true) {
      toggleButtons[input] = false;
      setToggleButtons(toggleButtons);
      defaultPage();
      return;
    }

    Object.values(toggleButtons).map((e: boolean) => e = false);
    toggleButtons[input] = true;
    setToggleButtons(toggleButtons);
    let query: any = { $sort: {} }

    query['$sort'][input] = 1;
    console.log(query)
    client.service('dinners')
      .find({
        query
      })
      .then((res: any) => {
        setDinners(res.data);
      })
      .catch((e: Error) => { console.log('error', e); })

  }
  return (
    <div>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        {Object.keys(toggleButtons).length && Object.keys(toggleButtons)!.map((key: string, i: number) => (
          <ToggleButton
            key={i}
            size="medium"
            value={key}
            className={classes.button}
            onClick={() => handleClick(key)}
            aria-label={key}
          >
            {key}
          </ToggleButton>))}

      </ToggleButtonGroup>
      <div className={classes.root}>
        <Grid
          container spacing={3}
          className={componentName}
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
        >
          {dinners.length && dinners!.map((dinner: Dinner, i: number) => (
            <Grid item>
              <DinnerCard {...dinner} key={i} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}