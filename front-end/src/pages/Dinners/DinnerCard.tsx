import { Chip, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Dinner } from '../../types';
import { useHistory } from 'react-router-dom';

const useStylesModified = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      margin: 'auto',
      maxWidth: 500,
      backgroundColor: "#ffffff",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#fafafa"
      }
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
  }),
);

export default function DinnerCard(dinner: Dinner) {
  const classes = useStylesModified();
  const componentName = "DinnerCard"
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: `/dinner/${dinner.dinners_id}`,
      state: {
        dinnerFromLocation: dinner,
      }
    })
  }

  return (
    <div className={`${classes.root}  ${componentName}`}>
      <Paper className={classes.paper} style={{ textAlign: "left" }} onClick={handleClick}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary" className="dinnerInfo">
              {dinner.address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" className="dinnerInfo">
              {dinner.title}
            </Typography>
          </Grid>
          {dinner.allergens.length > 0 &&
            <Grid item xs={12}>
              <Typography variant="body2" className="dinnerInfo">
                Allergens: {dinner.allergens.split(',').join(', ')}
              </Typography>
            </Grid>
          }
          <Grid item container spacing={1}>
            {dinner.tags.split(',').map(a => (
              <Grid item key={a.charCodeAt(0)}>
                <Chip size="small" label={a} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
