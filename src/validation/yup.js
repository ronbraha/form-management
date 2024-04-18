import * as yup from 'yup';
import teams from 'constants/teams.js';

const yupValidationSchema = yup.object({
    email: yup.string().required().email().label("Email"),
    firstName: yup.string().required().label("First Name"),
    lastName: yup.string().required().label("Last Name"),
    team: yup.string().required().oneOf(teams),
})

export default yupValidationSchema;