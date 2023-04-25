import { useState } from "react"
import { Card, Modal, Button } from 'react-bootstrap'

function ClassCard({ _class, onDelete }) {

    const [showConfirmation, setShowConfirmation] = useState(false) 

    const handleDelete = () => {
        setShowConfirmation(true)
    }
    
    const handleConfirmation = (confirmed) => {
        setShowConfirmation(false)
    
        if (confirmed) {
            onDelete(_class._id)
        }
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title>{_class.name}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Class Teacher: {_class.classTeacher}
                    <br />
                    Number of students: {_class.students.length}
                </Card.Text>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Card.Body>
            <Card.Footer className="text-muted">
                ID: {_class._id}
            </Card.Footer>

            <Modal show={showConfirmation} onHide={() => handleConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this class?</Modal.Body>
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

export default ClassCard