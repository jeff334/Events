import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DisplayCurrentEvents from "./DisplayCurrentEvents.jsx";
import { MainRibbon } from "./mainRibbon.jsx";
export default function Home() {
  const nav = useNavigate();

  return (
    <div>
      <MainRibbon />

      <Container className="py-4">
        <Row className="g-3">
          <Col lg={5}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title style={{ fontWeight: 700 }}>
                  Welcome to your dashboard
                </Card.Title>
                <Card.Text className="text-muted">
                  View your events, mark them as done, edit them, or clear them.
                  Use the “Add Event” button to schedule a new one.
                </Card.Text>

                <div className="mt-3">
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>
                    Quick actions
                  </div>

                  <div className="d-flex gap-2 flex-wrap">
                    <Button variant="primary" onClick={() => nav("/Home")}>
                      View Dashboard
                    </Button>
                    <Button variant="warning" onClick={() => nav("/Schedule")}>
                      Add New Event
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Tips</div>
                  <ul className="mb-0">
                    <li>Use 24-hour time (e.g. 14:30).</li>
                    <li>Tick “Done” to mark an event complete.</li>
                    <li>Untick “Done” to make it active again.</li>
                    <li>Use “Clear” to delete an event permanently.</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            <Card id="help" className="shadow-sm mt-3">
              <Card.Body>
                <Card.Title style={{ fontWeight: 700 }}>Help</Card.Title>

                <div style={{ fontWeight: 700, marginTop: 10 }}>
                  How to add an event
                </div>
                <ul className="mb-0">
                  <li>Click “Add Event” or go to the Scheduling page.</li>
                  <li>Fill in the event name, date, and time.</li>
                  <li>Add address and notes if needed (optional).</li>
                  <li>Click “Save my event”.</li>
                </ul>

                <div style={{ fontWeight: 700, marginTop: 14 }}>
                  How to manage events
                </div>
                <ul className="mb-0">
                  <li>Use “Edit” to update the event details.</li>
                  <li>Tick “Done” to strike through the event.</li>
                  <li>Untick “Done” to make it active again.</li>
                  <li>Use “Clear” to delete an event.</li>
                </ul>
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
                  Your saved events appear below. To add a new event, use the
                  “Add Event” button.
                </Card.Text>

                <div className="d-flex gap-2 flex-wrap mt-2">
                  <Button variant="warning" onClick={() => nav("/Schedule")}>
                    Go to Scheduling Page
                  </Button>
                </div>
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
