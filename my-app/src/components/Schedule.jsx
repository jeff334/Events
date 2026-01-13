import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form as RBForm,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { displayContext } from "../Context/HomeContxet.jsx";
import DisplayCurrentEvents from "./DisplayCurrentEvents.jsx";
import { MainRibbon } from "./mainRibbon.jsx";

export default function Schedule() {
  //values needed from context
  const {
    setNameOfEvent,
    setDate,
    setTime,
    setAddress,
    setNote,
    //stores event rows so they persist between pages
    setRows,
  } = useContext(displayContext);

  const validationSchema = Yup.object({
    nameOfEvent: Yup.string()
      .required("Event name is required")
      .max(30, "Maximum 30 characters"),
    date: Yup.date().nullable().required("Please select a date"),
    time: Yup.string()
      .required("Please enter a time")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Use 24-hour format (HH:MM)"),
    address: Yup.string().max(45, "Maximum 45 characters"),
    note: Yup.string().max(300, "Maximum 300 characters"),
  });

  return (
    <div>
      <div>
        <MainRibbon />
      </div>

      <Container className="py-4">
        <Row className="g-4">
          <Col lg={5}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title style={{ fontWeight: 700 }}>
                  Schedule a new event
                </Card.Title>
                <Card.Text className="text-muted">
                  Fill in the details below to add a new event to your
                  dashboard.
                </Card.Text>

                <Formik
                  initialValues={{
                    nameOfEvent: "",
                    date: null,
                    time: "",
                    address: "",
                    note: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    //keeps your existing context values
                    setNameOfEvent(values.nameOfEvent);
                    setDate(values.date);
                    setTime(values.time);
                    setAddress(values.address);
                    setNote(values.note);

                    //adds the row with a unique id (no duplicates)
                    setRows((prevRows) => [
                      ...prevRows,
                      {
                        Event: values.nameOfEvent,
                        Date: values.date,
                        Time: values.time,
                        Address: values.address,
                        Notes: values.note,
                        Id: crypto.randomUUID(),
                      },
                    ]);

                    resetForm();
                  }}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <FormikForm>
                      <RBForm.Group className="mb-3">
                        <RBForm.Label>Event name</RBForm.Label>
                        <Field
                          name="nameOfEvent"
                          className={`form-control ${
                            touched.nameOfEvent && errors.nameOfEvent
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="e.g. Team meeting"
                        />
                        {touched.nameOfEvent && errors.nameOfEvent && (
                          <div className="invalid-feedback">
                            {errors.nameOfEvent}
                          </div>
                        )}
                      </RBForm.Group>

                      <RBForm.Group className="mb-3">
                        <RBForm.Label>Date</RBForm.Label>
                        <DatePicker
                          selected={values.date}
                          onChange={(val) => setFieldValue("date", val)}
                          dateFormat="dd-MM-yyyy"
                          placeholderText="DD-MM-YYYY"
                          className={`form-control ${
                            touched.date && errors.date ? "is-invalid" : ""
                          }`}
                        />
                        {touched.date && errors.date && (
                          <div className="invalid-feedback d-block">
                            {errors.date}
                          </div>
                        )}
                      </RBForm.Group>

                      <RBForm.Group className="mb-3">
                        <RBForm.Label>Time</RBForm.Label>
                        <Field
                          name="time"
                          className={`form-control ${
                            touched.time && errors.time ? "is-invalid" : ""
                          }`}
                          placeholder="HH:MM"
                        />
                        {touched.time && errors.time && (
                          <div className="invalid-feedback">{errors.time}</div>
                        )}
                      </RBForm.Group>

                      <RBForm.Group className="mb-3">
                        <RBForm.Label>Address (optional)</RBForm.Label>
                        <Field
                          name="address"
                          className="form-control"
                          placeholder="Event location"
                        />
                        {touched.address && errors.address && (
                          <div className="invalid-feedback d-block">
                            {errors.address}
                          </div>
                        )}
                      </RBForm.Group>

                      <RBForm.Group className="mb-3">
                        <RBForm.Label>Notes (optional)</RBForm.Label>
                        <Field
                          as="textarea"
                          rows={3}
                          name="note"
                          className="form-control"
                          placeholder="Additional information"
                        />
                        {touched.note && errors.note && (
                          <div className="invalid-feedback d-block">
                            {errors.note}
                          </div>
                        )}
                      </RBForm.Group>

                      <Button type="submit" variant="warning" className="w-100">
                        Save event
                      </Button>
                    </FormikForm>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title style={{ fontWeight: 700 }}>
                  Current events
                </Card.Title>
                <Card.Text className="text-muted">
                  Events you’ve already added appear below. You can edit, mark
                  them as done, or clear them.
                </Card.Text>
              </Card.Body>
            </Card>

            <div className="mt-3">
              <DisplayCurrentEvents />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
