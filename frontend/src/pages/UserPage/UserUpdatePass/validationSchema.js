import { object, string, date } from "yup";

const validationSchema = object({
  firstName: string("First name must be a string")
    .min(2, "Name is too short")
    .max(25, "Name is too long")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    )
    .required("First name is required"),
  lastName: string("Last name must be a string")
    .min(2, "Last name is too short")
    .max(35, "Last name is too long")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Last name can only contain Latin letters."
    )
    .required("Last name is required"),
  telephone: string()
    .matches(
      /^\+380\d{3}\d{2}\d{2}\d{2}$/,
      'Phone number must begin from "+" and contain digits only. Please, fill in the number in format +xx(xxx)xxxxxxx'
    )
    .required("Phone number is required"),
  email: string().email("Invalid email format").required("Email is required"),
  login: string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Allowed characters for login are a-z, A-Z, 0-9."
    )
    .min(3)
    .max(30)
    .required("Login is required"),
  password: string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Allowed characters for password are a-z, A-Z, 0-9."
    )
    .min(7, "Password must be between 7 and 20 characters")
    .max(20)
    .required("Password is required"),
  newPassword: string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Allowed characters for password are a-z, A-Z, 0-9."
    )
    .min(7, "Password must be between 7 and 20 characters")
    .max(20)
    .required("New password is required"),
  newPasswordConfirm: string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Allowed characters for password are a-z, A-Z, 0-9."
    )
    .min(7, "Password must be between 7 and 20 characters")
    .max(20)
    .required("Confirm new password is required"),
  birthDate: date()
    .min("1924-01-01", "Birth date must be later than 1924-01-01")
    .max("2008-01-01", "Birth date must be earlier than 2008-01-01"),
});

export default validationSchema;
