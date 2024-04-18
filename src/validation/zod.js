import z from 'zod';
import teams from 'constants/teams';

const zodValidationSchema = z.object({
    email: z.string().email("Email is required").min(1, "Email is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    team: z.enum(teams),
})

export default zodValidationSchema;