import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export function MainRibbon() {
  const nav = useNavigate();

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#0b1b3a",
        color: "#fff",
        padding: "14px 0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <div style={{ fontWeight: 700, letterSpacing: 0.3 }}>
              Event Planner
            </div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>
              Create, manage and track your events
            </div>
          </Col>

          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-md-end mt-3 mt-md-0 gap-2"
          >
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => nav("/Home")}
            >
              Dashboard
            </Button>

            <Button
              variant="warning"
              size="sm"
              onClick={() => nav("/Schedule")}
            >
              Add Event
            </Button>

            <Button
              variant="outline-light"
              size="sm"
              onClick={() => nav("/Help")}
            >
              Help
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
