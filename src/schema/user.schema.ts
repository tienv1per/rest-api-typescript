import {TypeOf, object, string} from "zod";


// define a Zod schema for data when creating new user
// ket hop voi validate resource de kiem tra du lieu dau vao
// schema: tap hop cac quy tac rang buoc dinh nghia cach du lieu dc bieu dien
export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password is too short - must be at least 6 characters"),
        passwordConfirmation: string({
            required_error: "Password Confirmation is required"
        }),
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ["passwordConfirmation"],
    }),
});

// define new datatype that have all fields from createUserSchema except passwordConfirmation
export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>,
    "body.passwordConfirmation"
>;