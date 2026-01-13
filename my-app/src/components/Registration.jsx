import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
export default function Registration() {
  const nav = useNavigate();
  const [staySignedIn, setStaySignedIn] = useState(true);
  //requirements from the user
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  /********************************************************** */
  //local storage keys
  const USERNAME_KEY = "USERNAME";
  const EMAIL_KEY = "EMAIL";
  const PASSWORD_KEY = "PASSWORD";
  const STAY_LOGGED_IN_KEY = "STAY_LOGGED_IN";
  /********************************************************** */
  //Validation schema
  const validationSchema = Yup.object({
    /*validation for first name */
    firstName: Yup.string()
      .required("First name is required")
      .max(15, "Should not exceed 15 characters"),
    /*validation for surname */
    surname: Yup.string()
      .required("Surname is required")
      .max(20, "Should not exceed 20 characters"),
    /*validation for email  */
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    /*validation for user name */
    userName: Yup.string()
      .required("This is a required field")
      .max(10, "Max of 10 characters "),
    /*validation for password */
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Password must have 8+ characters, include uppercase, lowercase, a number, and a special character"
      ),
    /*validation password conformation */
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });
  /************************************************************************* */
  return (
    <div className="formPage">
      {/*requirements */}
      <Formik
        initialValues={{
          firstName: "",
          surname: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema} /*validation schema */
        onSubmit={(values) => {
          /* set values to the values that the user inputs  */
          setFirstName(values.firstName);
          setSurname(values.surname);
          setEmail(values.email);
          setPassword(values.password);
          setUserName(values.userName);
          /*shows values for debugging*/
          console.log("Submitted values:", values);
          /*stores the Log in info in localStorage so that it can easily be accessed also allows us to check if a user checked stay logged in  */
          localStorage.setItem(USERNAME_KEY, values.userName);
          localStorage.setItem(EMAIL_KEY, values.email);
          localStorage.setItem(PASSWORD_KEY, values.password);
          localStorage.setItem(
            STAY_LOGGED_IN_KEY,
            JSON.stringify(staySignedIn)
          );
          /*for debugging */
          console.log("test1 Hit");
          /* take us to the home page */
          nav("/Home");
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Container>
              {/* first name field*/}
              <Row>
                <label htmlFor="firstName">please enter your first name:</label>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="my name"
                  type="text"
                />
                {touched.firstName && errors.firstName && (
                  <div className="error">{errors.firstName}</div>
                )}
              </Row>
              {/*surname field */}
              <Row>
                <label htmlFor="surname">please enter your surname:</label>
                <Field
                  id="surname"
                  name="surname"
                  placeholder="my surname"
                  type="text"
                />
                {touched.surname && errors.surname && (
                  <div className="error">{errors.surname}</div>
                )}
              </Row>
              {/*user name field */}
              <Row>
                <label htmlFor="userName">please enter your username:</label>
                <Field
                  id="userName"
                  name="userName"
                  placeholder="my username"
                  type="text"
                />
                {touched.userName && errors.userName && (
                  <div className="error">{errors.userName}</div>
                )}
              </Row>
              {/*email field */}
              <Row>
                <label htmlFor="email">please enter your email:</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="my@email.com"
                  type="email"
                />
                {touched.email && errors.email && (
                  <div className="error">{errors.email}</div>
                )}
              </Row>
              {/*password field */}
              <Row>
                <label htmlFor="password">please enter your password:</label>
                <Field
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                />
                {touched.password && errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </Row>
              {/*password verification field */}
              <Row>
                <label htmlFor="confirmPassword">
                  please confirm your password:
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="error">{errors.confirmPassword}</div>
                )}
              </Row>
              {/* submit btn */}
              <Row>
                <button type="submit">Register now</button>
                {/* check box so user can decided if they wanna stay signed in */}
                <div>
                  <label>
                    Would you like to always remain signed in?
                    <input
                      type="checkbox"
                      checked={staySignedIn}
                      onChange={(e) => setStaySignedIn(e.target.checked)}
                    />
                  </label>
                </div>
              </Row>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
}
