import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {
    return (
        <>
            <Modal show={props.isShow} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user: {props.dataUser.username}?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={props.confirmDeleteUser}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;