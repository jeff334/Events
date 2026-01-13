import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Table,
  Button,
  Modal,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { displayContext } from "../Context/HomeContxet.jsx";

export default function DisplayCurrentEvents() {
  //helper function so that the date displays correctly
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // Stores the row currently being edited
  const [editing, setEditing] = useState(null);

  // show controls whether the modal is open
  const [show, setShow] = useState(false);

  // values needed from context
  const { completedIds, setCompletedIds, rows, setRows } =
    useContext(displayContext);

  // toggle completed
  const toggleCompleted = (rowId) => {
    setCompletedIds((prev) =>
      prev.includes(rowId) ? prev.filter((x) => x !== rowId) : [...prev, rowId]
    );
  };

  // clear/delete a row
  const clearRow = (rowId) => {
    setRows((prev) => prev.filter((r) => r.Id !== rowId));
    setCompletedIds((prev) => prev.filter((x) => x !== rowId));
  };

  // edit function
  const openEdit = (row) => {
    setEditing({ ...row });
    setShow(true);
  };

  // close edit
  const closeEdit = () => {
    setShow(false);
    setEditing(null);
  };

  // save changes
  const saveChanges = () => {
    setRows((prev) => prev.map((r) => (r.Id === editing.Id ? editing : r)));
    closeEdit();
  };

  return (
    <Container className="py-4">
      <h3 className="mb-3">My Events:</h3>

      {rows.length === 0 && (
        <p style={{ color: "red", fontWeight: "bold" }}>No events at present</p>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Done</th>
            <th>Event</th>
            <th>Date &amp; time</th>
            <th>Address</th>
            <th>Notes</th>
            <th>Edit</th>
            <th>Clear</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => {
            const isCompleted = completedIds.includes(row.Id);

            return (
              <tr
                key={row.Id}
                style={{
                  textDecoration: isCompleted ? "line-through" : "none",
                  opacity: isCompleted ? 0.6 : 1,
                }}
              >
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => toggleCompleted(row.Id)}
                  />
                </td>

                <td>{row.Event}</td>

                <td>
                  on {formatDate(row.Date)} at {row.Time}
                </td>

                <td>{row.Address}</td>
                <td>{row.Notes}</td>

                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => openEdit(row)}
                    disabled={isCompleted}
                  >
                    Edit
                  </Button>
                </td>

                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => clearRow(row.Id)}
                  >
                    Clear
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={show} onHide={closeEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {editing && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Event</Form.Label>
                <Form.Control
                  type="text"
                  value={editing.Event || ""}
                  onChange={(e) =>
                    setEditing((prev) => ({ ...prev, Event: e.target.value }))
                  }
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={editing.Date || ""}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          Date: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      type="text"
                      value={editing.Time || ""}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          Time: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={editing.Address || ""}
                  onChange={(e) =>
                    setEditing((prev) => ({ ...prev, Address: e.target.value }))
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editing.Notes || ""}
                  onChange={(e) =>
                    setEditing((prev) => ({ ...prev, Notes: e.target.value }))
                  }
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveChanges} disabled={!editing}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
