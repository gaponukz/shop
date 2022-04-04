import { Modal, Form } from 'react-bootstrap'

const OfferModal = (props) => {
    const handleClose = () => props.setShow(false);
  
    return (
        <Modal tabIndex="0" size="lg" show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Let's order!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Telegram @</Form.Label>
                        <Form.Control type="text" defaultValue="s"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Caption</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default OfferModal