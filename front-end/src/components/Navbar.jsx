import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {

    return (
        <div>
            <ul>
                <li>
                    <RouterLink to="/dinners"> Middagspåmelding</RouterLink>
                </li>
                <li>
                    <RouterLink to="/dinners"> Mine middager</RouterLink>
                </li>
                <li style={{float: "right"}}>
                    <RouterLink to="/signup"> Registrer deg</RouterLink>
                </li>
                <li style={{float: "right"}}>
                    <RouterLink to="/signin"> Log in</RouterLink>
                </li>
                
            </ul>
        </div>
    )
}