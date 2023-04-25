import { useState } from "react"
import { Card, Modal, Button } from 'react-bootstrap'

function FacultyCard({ faculty, onDelete }) {

    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleDelete = () => {
        setShowConfirmation(true)
    }
    
    const handleConfirmation = (confirmed) => {
        setShowConfirmation(false)
    
        if (confirmed) {
            onDelete(faculty._id)
        }
    }

    return (
        <Card>
            <Card.Header>{faculty.username}</Card.Header>
            <Card.Body>
                <Card.Title>{faculty.fullName}</Card.Title>
                <Card.Text>
                    Department: {faculty.department}
                </Card.Text>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Card.Body>
            <Card.Footer className="text-muted">
                ID: {faculty._id}
            </Card.Footer>

            <Modal show={showConfirmation} onHide={() => handleConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this faculty?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleConfirmation(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleConfirmation(true)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    )

}

export default FacultyCard