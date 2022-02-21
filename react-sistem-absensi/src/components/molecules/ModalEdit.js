import React from "react";
import { Modal, Button, Row, Col} from "react-bootstrap";

export const ModalEdit = ({
    openModal, 
    handleClose, 
    updateSiswa, 
    dataSiswa, 
    handleChangeText,
    handleChangeSelect,
    handleOptionChange,
    nis,nama,tempat,tanggal,alamat,tingkat,rombel,jurusan,
}) => {
    return(
        <Modal show={openModal} onHide={handleClose} centered size="lg" animation={false} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Edit Data Siswa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>NIS</label>
                            <input id="nis" disabled type="text" className="form-control" onChange={(e) => handleChangeText(e, 'nis')} value={nis}/>
                        </div>
                        <div className="form-group">
                            <label>Nama</label>
                            <input id="nama" type="text" className="form-control" onChange={(e) => handleChangeText(e, 'nama')} value={nama}/>
                        </div>
                        <div className="form-group">
                            <label>Tempat Lahir</label>
                            <input id="tempat" type="text" className="form-control" onChange={(e) => handleChangeText(e, 'tempat')} value={tempat}/>
                        </div>
                        <div className="form-group">
                            <label>Tanggal Lahir</label>
                            <input id="tanggal" type="date" className="form-control" onChange={(e) => handleChangeText(e, 'tanggal')} value={tanggal}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Alamat</label>
                            <input id="alamat" type="text" className="form-control" onChange={(e) => handleChangeText(e, 'alamat')} value={alamat}/>
                        </div>
                        <div className="form-group">
                            <label>Tingkat</label>
                            <select id="tingkat" value={tingkat} onChange={(e) => handleChangeSelect(e, 'tingkat')} className="form-control">
                                <option value="">- Pilih Tingkat -</option>
                                <option value="10">Tingkat 10</option>
                                <option value="11">Tingkat 11</option>
                                <option value="12">Tingkat 12</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Rombel</label>
                            <select id="rombel" value={rombel} onChange={(e) => handleChangeSelect(e, 'rombel')} className="form-control">
                                <option value="">- Pilih Rombel -</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Jurusan</label>
                            <select id="jurusan" value={jurusan} onChange={(e) => handleChangeSelect(e, 'jurusan')} className="form-control">
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
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={updateSiswa}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}