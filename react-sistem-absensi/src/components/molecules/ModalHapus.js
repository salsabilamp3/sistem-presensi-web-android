import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ModalHapus = ({
    bukaModal, 
    handleClose,
    nis,
    siswaId,
    deleteSiswa 
}) => {
    return (
        <Modal show={bukaModal} onHide={handleClose} centered size="md" animation={false} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Hapus Data Siswa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Yakin ingin menghapus data siswa {siswaId}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={deleteSiswa}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}