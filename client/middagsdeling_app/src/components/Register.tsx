import React from 'react';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import logo_colored from '../media/logo_colored.svg';
import { useStyles } from '../styles';
import Avatar from '@material-ui/core/Avatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountInformation from './Registration/AccountInformation'
import Allergies from './Registration/Allergies';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

function getSteps() {
    return ['Account information', 'Allergies'];
}

function getStepContent(stepIndex: Number) {
    switch (stepIndex) {
        case 0:
            return <AccountInformation />;
        case 1:
            return <Allergies />;
        default:
            return 'Unknown stepIndex';
    }
}

export default function Register() {

    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(0);

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };

    return(
        <div className={classes.wrapper}>

        <img src={logo_colored} alt="logo" className={classes.logo} />

            <Paper className={classes.login}>

            <Grid container spacing={3}>
                {/* <Grid item xs={12}>
                    <Avatar className={classes.icon}>
                        <PersonAddIcon />
                    </Avatar>
                </Grid> */}
                <Grid item xs={12}>
                    <h1>Register</h1>
                </Grid>

                <Grid item xs={12}>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        </div>
                        )}
                </Grid>

                <Grid item xs={12}>
                    <Stepper activeStep={activeStep}    >
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                </Grid>

                <Grid item xs={6}>
                    <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                            Back
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    {
                        activeStep < steps.length - 1 && 
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Next
                        </Button>
                    }
                    {
                        activeStep === steps.length - 1 && 
                        <Button component={RouterLink} to="/login" variant="contained" color="primary" onClick={handleNext}>
                            Register
                        </Button>
                    }
                </Grid>
            </Grid>

            </Paper>
        </div>
    )

}