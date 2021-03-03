import React, {Component} from 'react';
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
import App from '../App';
import client from '../feathers';


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

/*function useMyStyles(Component: Component) : Component {
    return function WrappedComponent(props: IProps) {
        const classes = useStyles();
        return <Component {}, {...props} classes={classes} />;
    }
}*/

interface IProps {
}

interface IState {
    activeStep: number,
    userInfo: object,
}

export default class Register extends Component<IProps, IState> {
    constructor(props : IProps) {
        super(props);
        this.state = {
            activeStep: 0,
            userInfo : {
                name: '',
                email: '',
                password: '',
                allergies: '',
                isAdmin: '',
            }
        };
    }

    handleNext = () : void => { 
        this.setState((prevState) => ({
            activeStep: prevState.activeStep + 1
        }))
    };

    handleBack = () : void => {
        this.setState((prevState) => ({
            activeStep: prevState.activeStep - 1
        }))
    };

    handleReset = () : void => {
        this.setState({ activeStep: 0});
    };

    handleSubmit = () : void => { //needs validation
        let user : any = {};
        user = this.state.userInfo;
        client.service('users').create(user);
    }

    render() {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const classes = useStyles();

        //const [activeStep, setActiveStep] = React.useState(0);

        const steps = getSteps();
    
        return(
            <div className={classes.wrapper}>
            <img src={logo_colored} alt="logo" className={classes.logo} />
                <Paper className={classes.login}>
                <Grid container spacing={3}> 
                    <Grid item xs={12}>
                        <h1>Register</h1>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>All steps completed</Typography>
                                <Button onClick={this.handleReset}>Reset</Button>
                            </div>
                        ) : (
                            <div>
                                <Typography className={classes.instructions}>{getStepContent(this.state.activeStep)}</Typography>
                            </div>
                            )}
                    </Grid>

                    <Grid item xs={12}>
                        <Stepper activeStep={this.state.activeStep}>
                            {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                            ))}
                        </Stepper>
                    </Grid>

                    <Grid item xs={6}>
                        <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} className={classes.backButton}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        {
                            this.state.activeStep < steps.length - 1 && 
                            <Button variant="contained" color="primary" onClick={this.handleNext}>
                                Next
                            </Button>
                        }
                        {
                            this.state.activeStep === steps.length - 1 && 
                            <Button component={RouterLink} to="/login" variant="contained" color="primary" type="submit" onClick={() => {this.handleNext(); this.handleSubmit()}}>
                                Register
                            </Button>
                        }
                    </Grid>
                </Grid>
                </Paper>
            </div>
        )
    }
}