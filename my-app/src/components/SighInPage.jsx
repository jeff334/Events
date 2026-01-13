import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useState } from "react";

export default function SighInPage() {
  const nav = useNavigate();

  // localStorage returns strings, so parse to boolean
  const stayLoggedIN = JSON.parse(localStorage.getItem("STAY_LOGGED_IN"));
  // make sure if the user chose to always stay logged in they do not get take to the sign in page
  useEffect(() => {
    if (stayLoggedIN) {
      nav("/Home"); // make sure your route path matches exactly
    }
  }, [stayLoggedIN, nav]);

  // var required for staying logged in
  const [staySignedIn, setStaySignedIn] = useState(true);
  const STAY_LOGGED_IN_KEY = "STAY_LOGGED_IN";
  //get require  info from localStorage
  const storedUsername = localStorage.getItem("USERNAME");
  const storedEmail = localStorage.getItem("EMAIL");
  const storedPassword = localStorage.getItem("PASSWORD");

  //Validation schema
  const validationSchema = Yup.object({
    /* Validation for user name*/
    userName: Yup.string()
      .required("Username is required")
      .test(
        "match-username",
        "Incorrect username",
        (value) => value === storedUsername
      ),
    /*Validation for email */
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required")
      .test("match-email", "Incorrect email", (value) => value === storedEmail),
    /* Validation for password */
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .test(
        "match-password",
        "Incorrect password",
        (value) => value === storedPassword
      ),
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
        padding: "48px 0",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={9} lg={6} xl={5}>
            <Card className="shadow-sm" style={{ border: "0" }}>
              <Card.Body style={{ padding: 28 }}>
                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{ fontSize: 26, fontWeight: 800, color: "#0b1b3a" }}
                  >
                    Sign in
                  </div>
                  <div style={{ color: "#5b6472", marginTop: 6 }}>
                    Enter your details to access your dashboard.
                  </div>
                </div>

                <Formik
                  initialValues={{ userName: "", email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log("Submitted values:", values);
                    localStorage.setItem(
                      STAY_LOGGED_IN_KEY,
                      JSON.stringify(staySignedIn)
                    );
                    nav("/Home");
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Container fluid className="p-0">
                        <Row className="mb-3">
                          <label
                            htmlFor="userName"
                            style={{
                              fontWeight: 700,
                              color: "#0b1b3a",
                              marginBottom: 6,
                            }}
                          >
                            Username
                          </label>
                          <Field
                            id="userName"
                            name="userName"
                            placeholder="my username"
                            type="text"
                            className={`form-control ${
                              touched.userName && errors.userName
                                ? "is-invalid"
                                : ""
                            }`}
                            style={{ padding: "10px 12px", borderRadius: 10 }}
                          />
                          {touched.userName && errors.userName && (
                            <div className="invalid-feedback d-block">
                              {errors.userName}
                            </div>
                          )}
                        </Row>

                        <Row className="mb-3">
                          <label
                            htmlFor="email"
                            style={{
                              fontWeight: 700,
                              color: "#0b1b3a",
                              marginBottom: 6,
                            }}
                          >
                            Email
                          </label>
                          <Field
                            id="email"
                            name="email"
                            placeholder="my@email.com"
                            type="email"
                            className={`form-control ${
                              touched.email && errors.email ? "is-invalid" : ""
                            }`}
                            style={{ padding: "10px 12px", borderRadius: 10 }}
                          />
                          {touched.email && errors.email && (
                            <div className="invalid-feedback d-block">
                              {errors.email}
                            </div>
                          )}
                        </Row>

                        <Row className="mb-3">
                          <label
                            htmlFor="password"
                            style={{
                              fontWeight: 700,
                              color: "#0b1b3a",
                              marginBottom: 6,
                            }}
                          >
                            Password
                          </label>
                          <Field
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            type="password"
                            className={`form-control ${
                              touched.password && errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            style={{ padding: "10px 12px", borderRadius: 10 }}
                          />
                          {touched.password && errors.password && (
                            <div className="invalid-feedback d-block">
                              {errors.password}
                            </div>
                          )}
                        </Row>

                        <Row className="mb-3">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "10px 12px",
                              borderRadius: 10,
                              background: "#ffffff",
                              border: "1px solid rgba(0,0,0,0.08)",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={staySignedIn}
                              onChange={(e) =>
                                setStaySignedIn(e.target.checked)
                              }
                              style={{ width: 18, height: 18 }}
                            />
                            <span style={{ color: "#0b1b3a", fontWeight: 600 }}>
                              Keep me signed in
                            </span>
                          </div>
                        </Row>

                        <Row className="mb-2">
                          <Button
                            type="submit"
                            variant="primary"
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              borderRadius: 12,
                              fontWeight: 700,
                              background: "#0b1b3a",
                              border: "none",
                            }}
                          >
                            Sign in
                          </Button>
                        </Row>

                        <Row className="mt-3">
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 8,
                              alignItems: "center",
                              color: "#5b6472",
                            }}
                          >
                            <span>I still need to create an account.</span>
                            <Button
                              type="button"
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => nav("/Registration")}
                              style={{ borderRadius: 999, fontWeight: 700 }}
                            >
                              Register
                            </Button>
                          </div>
                        </Row>
                      </Container>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>

            <div
              style={{
                textAlign: "center",
                marginTop: 14,
                color: "#8a93a3",
                fontSize: 12,
              }}
            >
              Tip: Use 24-hour time for events (e.g. 14:30).
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
