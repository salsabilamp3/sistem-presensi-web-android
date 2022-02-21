import React from "react";
import { Modal, Button, Row, Col} from "react-bootstrap";

export const ModalAdd = ({ 
    showModal, 
    handleClose, 
    handleSaveData, 
    dataSiswa, 
    handleChangeText,
    handleChangeSelect,
    handleOptionChange,
    password,
    handleChangePassword
}) => {
    return (
        <Modal show={showModal} onHide={handleClose} centered size="lg" animation={false} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Tambah Data Siswa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>NIS</label>
                            <input id="nis" type="text" className="form-control" onChange={(e) => handleChangeText(e, 'nis')} value={dataSiswa[0]}/>
                        </div>
                        <div className="form-group">
                            <label>Nama</label>
                            <input id="nama" type="text" className="form-control" onChange={(e) => handleChangeText(e, 'nama')} value={dataSiswa[1]}/>
                        </div>
                        <div className="form-group">
                            <label>Tempat Lahir</label>
                            <input id="tempat" type="text" className="form-control" onChange={(e) => handleChangeText(e, 'tempat')} value={dataSiswa[2]}/>
                        </div>
                        <div className="form-group">
                            <label>Tanggal Lahir</label>
                            <input id="tanggal" type="date" className="form-control" onChange={(e) => handleChangeText(e, 'tanggal')} value={dataSiswa[3]}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Alamat</label>
                            <input id="alamat" type="text" className="form-control" onChange={(e) => handleChangeText(e, 'alamat')} value={dataSiswa[4]}/>
                        </div>
                        <div className="form-group">
                            <label>Tingkat</label>
                            <select id="tingkat" value={dataSiswa[5]} onChange={(e) => handleChangeSelect(e, 'tingkat')} className="form-control">
                                <option value="">- Pilih Tingkat -</option>
                                <option value="10">Tingkat 10</option>
                                <option value="11">Tingkat 11</option>
                                <option value="12">Tingkat 12</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Rombel</label>
                            <select id="rombel" value={dataSiswa[6]} onChange={(e) => handleChangeSelect(e, 'rombel')} className="form-control">
                                <option value="">- Pilih Rombel -</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Jurusan</label>
                            <select id="jurusan" value={dataSiswa[7]} onChange={(e) => handleChangeSelect(e, 'jurusan')} className="form-control">
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
                        <label>Password</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="password" onChange={(e) => handleChangePassword(e)} aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <Button variant="secondary" onClick={random_pass} type="button">Generate</Button>
                                </div>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveData}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}
function random_pass() {
    var campur = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var panjang = 8;
    var pass = '';
    for (var i=0; i<panjang; i++) {
        var hasil = Math.floor(Math.random() * campur.length);
        pass += campur.substring(hasil,hasil+1);
    }
    document.getElementById("password").value = pass;
}