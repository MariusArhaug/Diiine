import UserCard from '../User/UserCard';
import { User, Dinner } from '../../types'
import Grid from '@material-ui/core/Grid';

export default function ShowAttendants(dinner: Dinner) {
  console.log(dinner)
  return (
    <div>
      {dinner.attendants.map((attendant: User) => (
        <Grid item>
          <UserCard {...{ dinner: dinner, user: attendant }} key={attendant.user_id} />
        </Grid>
      ))}
    </div>
  )
}