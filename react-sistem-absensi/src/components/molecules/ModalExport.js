import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

export const ModalExport = ({
    modalEx,
    handleClose,
    handleExport,
    exportFile,
    handleChangeSelect,
    ustingkat, usjurusan, usrombel,
}) => {
    return (
        <Modal show={modalEx} onHide={handleClose} centered size="md" animation={false} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Export Data User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={4}>
                        <div className="form-group">
                            <label>Tingkat</label>
                            <select id="tingkat" value={ustingkat} onChange={(e) => handleChangeSelect(e, 'ustingkat')} className="form-control">
                                <option value="">- Pilih Tingkat -</option>
                                <option value="10">Tingkat 10</option>
                                <option value="11">Tingkat 11</option>
                                <option value="12">Tingkat 12</option>
                            </select>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="form-group">
                            <label>Jurusan</label>
                            <select id="jurusan" value={usjurusan} onChange={(e) => handleChangeSelect(e, 'usjurusan')} className="form-control">
                                <option value="">- Pilih Jurusan -</option>
                                <option value="RPL">RPL</option>
                                <option value="TKJ">TKJ</option>
                                <option value="TEI">TEI</option>
                                <option value="IOP">IOP</option>
                                <option value="TEDK">TEDK</option>
                                <option value="TPTU">TPTU</option>
                                <option value="TOI">TOI</option>
                                <option value="PFPT">PFPT</option>
                                <option value="MEKA">MEKA</option>
                            </select>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="form-group">
                            <label>Rombel</label>
                            <select id="rombel" value={usrombel} onChange={(e) => handleChangeSelect(e, 'usrombel')} className="form-control">
                                <option value="">- Pilih Rombel -</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Button class="form-control" variant="secondary" onClick={handleExport} block>Cari</Button>
                    </Col>
                </Row>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={exportFile}>Export</Button>
            </Modal.Footer>
        </Modal>
    )
}