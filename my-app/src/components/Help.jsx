import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MainRibbon } from "./mainRibbon.jsx";

export default function Help() {
  const nav = useNavigate();

  return (
    <div>
      <MainRibbon />

      <Container className="py-4">
        <Row className="g-3">
          <Col lg={7}>
            <Card className="shadow-sm mt-3">
              <Card.Body>
                <Card.Title style={{ fontWeight: 700 }}>
                  How to add an event
                </Card.Title>

                <ul className="mb-0">
                  <li>Go to the Scheduling page.</li>
                  <li>Enter an event name (required).</li>
                  <li>Select a date (required).</li>
                  <li>Enter time in 24-hour format (e.g. 14:30).</li>
                  <li>Add address and notes if needed (optional).</li>
                  <li>Click “Save event”.</li>
                </ul>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mt-3">
              <Card.Body>
                <Card.Title style={{ fontWeight: 700 }}>
                  How to manage events
                </Card.Title>

                <ul className="mb-0">
                  <li>Tick “Done” to mark an event complete.</li>
                  <li>Untick “Done” to make it active again.</li>
                  <li>Use “Edit” to update details (disabled when Done).</li>
                  <li>Use “Clear” to delete the event permanently.</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title style={{ fontWeight: 700 }}>Quick tips</Card.Title>

                <div className="mt-2">
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>
                    Time format
                  </div>
                  <div className="text-muted">
                    Use 24-hour time, for example: <strong>09:15</strong> or{" "}
                    <strong>14:30</strong>.
                  </div>
                </div>

                <div className="mt-4">
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>
                    Editing dates
                  </div>
                  <div className="text-muted">
                    When editing, make sure the date is selected correctly
                    before clicking “Save Changes”.
                  </div>
                </div>

                <div className="mt-4">
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>
                    Clearing events
                  </div>
                  <div className="text-muted">
                    “Clear” permanently removes an event from your list.
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
