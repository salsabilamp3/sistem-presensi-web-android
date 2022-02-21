import React, { Component, Fragment } from "react";
import { Navbar, Nav, Container, Row, Col, Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { getDataAbsen } from "../../../config/redux/action";
import Moment from 'moment';
import XLSX from 'xlsx';

class Absensi extends Component {
    state = {
        tingkat: '',
        rombel: '',
        jurusan: '',
        dateStart: Moment("").format('YYYY-MM-DD'),
        dateEnd: Moment("").format('YYYY-MM-DD'),
        absens: [],
        timeStart: '',
        timeEnd: ''
    }
    handleChangeSelect = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    handleCariKelas = () => {
        const { tingkat, rombel, jurusan, dateStart, dateEnd } = this.state;
        const { getAbsen } = this.props;
        const data = {
            tingkat: tingkat,
            rombel: rombel,
            jurusan: jurusan,
            dateStart: dateStart,
            dateEnd: dateEnd,
            timeStart: '00:00:00',
            timeEnds: '23:59:59'
        }
        getAbsen(data);
        localStorage.setItem('data', getAbsen(data));
    }
    handleCariTanggal = () => {
        const { tingkat, rombel, jurusan, dateStart, dateEnd } = this.state;
        const { getAbsen } = this.props;
        const data = {
            tingkat: tingkat,
            rombel: rombel,
            jurusan: jurusan,
            dateStart: Moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: Moment(dateEnd).format('DD/MM/YYYY'),
            timeStart: '00:00:00',
            timeEnds: '23:59:59'
        }
        getAbsen(data);
        localStorage.setItem('data', getAbsen(data));
    }
    exportFile(dataabsen) {
        let absens = [["NIS", "Nama", "Tanggal", "Keterangan"]]
        let kelas = '';
        dataabsen.forEach((absen) => {
            let absenArray = [absen.dataabs.nis, absen.dataabs.nama, absen.dataabs.waktu, absen.dataabs.name]
            kelas = absen.dataabs.kelas;
            console.log("datarekap: ", absenArray);
            absens.push(absenArray)
        })
        const wb = XLSX.utils.book_new()
        const wsAll = XLSX.utils.aoa_to_sheet(absens)

        XLSX.utils.book_append_sheet(wb, wsAll, "Presensi " + kelas)
        XLSX.writeFile(wb, "data-absensi-" + kelas + ".xlsx")
    }

    render() {
        const { dataabsen } = this.props;
        const {tingkat, jurusan, rombel} = this.state;
        return (
            <div>
                <Navbar bg="dark" variant="dark" className="mb-4" sticky="top">
                    <Navbar.Brand>
                        <img className="mb-1 float-left" src="/images/logosmk.png" width="48" height="45" />
                    </Navbar.Brand>
                    <Nav activeKey="/absensi">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/datasiswa">Data Siswa</Nav.Link>
                        <Nav.Link href="/absensi">Data Absensi</Nav.Link>
                    </Nav>
                </Navbar>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <p className="text-center font-weight-bold mb-5">Data Absensi Siswa</p>
                            <Row>
                                <Col lg={11}>
                                    <Row>
                                        <Col lg={2}>
                                            <select id="tingkat" value={this.state.tingkat} onChange={this.handleChangeSelect} className="form-control">
                                                <option value="">Tingkat</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                        </Col>
                                        <Col lg={2}>
                                            <select id="jurusan" className="form-control" value={this.state.jurusan} onChange={this.handleChangeSelect}>
                                                <option value="">Jurusan</option>
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
                                        </Col>
                                        <Col lg={2}>
                                            <select id="rombel" className="form-control" value={this.state.rombel} onChange={this.handleChangeSelect}>
                                                <option value="">Rombel</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                            </select>
                                        </Col>
                                        <Col lg={2}>
                                            <input id="dateStart" type="date" className="form-control" value={this.state.dateStart}
                                                onChange={this.handleChangeText} />
                                        </Col>
                                        <Col lg={2}>
                                            <input id="dateEnd" type="date" className="form-control" value={this.state.dateEnd}
                                                 onChange={this.handleChangeText} />
                                        </Col>
                                        
                                        <Col lg={1}>
                                            <Button variant="secondary" onClick={this.handleCariKelas}>Cari</Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={1}>
                                    <Button onClick={() => this.exportFile(dataabsen)} variant="success" className="float-right">Rekap</Button>
                                </Col>
                            </Row> 
                            <Table striped bordered hover className="mt-5">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>NIS</th>
                                        <th>Kelas</th>
                                        <th>Nama</th>
                                        <th>Tanggal</th>
                                        <th>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataabsen.length > 0 ? (
                                            <Fragment>
                                                {
                                                    dataabsen.map((absen) => (
                                                        absen.dataabs.kelas == tingkat+jurusan+rombel ? (
                                                            <tr key={absen.id}>
                                                            <td>{absen.dataabs.nis}</td>
                                                            <td>{absen.dataabs.kelas}</td>
                                                            <td>{absen.dataabs.nama}</td>
                                                            <td>{absen.dataabs.waktu}</td>
                                                            <td>{absen.dataabs.name}</td>
                                                        </tr>
                                                        ): null
                                                        
                                                    ))
                                                }
                                            </Fragment>
                                        ) : null
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
const reduxState = (state) => ({
    dataabsen: state.dataabsen,
})

const reduxDispatch = (dispatch) => ({
    getAbsen: (data) => dispatch(getDataAbsen(data))
})

export default connect(reduxState, reduxDispatch)(Absensi);