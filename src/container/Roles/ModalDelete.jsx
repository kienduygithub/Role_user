import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {
    const handleDeleteRole = () => {
        const roleId = props.dataRole.id;
        props.confirmDeleteRole(roleId);
    }
    return (
        <>
            <Modal show={props.isShow} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete role</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this role: {props.dataRole.url}?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={() => handleDeleteRole()}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;