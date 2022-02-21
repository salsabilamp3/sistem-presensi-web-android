import React, { Component, Fragment } from "react";
import { Container, Row, Col, Button, Navbar, Nav, Table } from "react-bootstrap";
import { ModalAdd } from "../../../components/molecules/ModalAdd";
import { ModalEdit } from "../../../components/molecules/ModalEdit";
import { connect } from "react-redux";
import XLSX from 'xlsx';
import {
    addDataSiswa, getDataSiswa, updateDataSiswa,
    deleteDataSiswa, addDataUser, updateDataUser, deleteDataUser, getDataUser
} from "../../../config/redux/action";
import { ModalHapus } from "../../../components/molecules/ModalHapus";
import { ModalExport } from "../../../components/molecules/ModalExport";

class DataSiswa extends Component {
    state = {
        showModal: false,
        openModal: false,
        bukaModal: false,
        modalEx: false,
        dataSiswa: {
            nis: '',
            nama: '',
            tempat: '',
            tanggal: '',
            alamat: '',
            tingkat: '',
            rombel: '',
            jurusan: '',
        },
        siswaId: '',
        password: '',
        users: [],
        ustingkat: '',
        usrombel: '',
        usjurusan: '',
    }
    componentDidMount() {
        this.props.getData();
    }
    handleClose = () => {
        this.setState({
            showModal: false,
            openModal: false,
            bukaModal: false,
            modalEx: false,
            dataSiswa: {
                nis: '',
                nama: '',
                tempat: '',
                tanggal: '',
                alamat: '',
                tingkat: '',
                rombel: '',
                jurusan: '',
            },
            password: '',
        })
    }
    handleShow = () => {
        this.setState({
            showModal: true
        })
    }
    showEdit = (siswa) => {
        this.setState({
            openModal: true,
            nis: siswa.datas.nis,
            nama: siswa.datas.nama,
            tempat: siswa.datas.tempat,
            tanggal: siswa.datas.tanggal,
            alamat: siswa.datas.alamat,
            tingkat: siswa.datas.tingkat,
            rombel: siswa.datas.rombel,
            jurusan: siswa.datas.jurusan,
            jenkel: siswa.datas.jenkel,
            siswaId: siswa.id

        })
    }
    showConfirm = (siswa) => {
        this.setState({
            bukaModal: true,
            siswaId: siswa.datas.nis,
        })
    }
    handleSaveData = async () => {
        const { nis, nama, tempat, tanggal, alamat, rombel, tingkat, jurusan, password } = this.state;
        const { saveData, saveUser } = this.props;
        this.handleClose();
        const data = {
            nis: nis,
            nama: nama,
            tempat: tempat,
            tanggal: tanggal,
            alamat: alamat,
            tingkat: tingkat,
            rombel: rombel,
            jurusan: jurusan,
            password: password
        }
        const res = await (saveData(data), saveUser(data)).catch(err => err);
        if (res) {
            alert('input success');
            this.setState({
                nis: '',
                nama: '',
                tempat: '',
                tanggal: '',
                alamat: '',
                tingkat: '',
                rombel: '',
                jurusan: '',
            })
        } else {
            console.log('input failed');
        }

    }
    handleChangeText = (e, type) => {
        this.setState({
            [type]: e.target.value,
        })
    }
    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        })
    }
    handleOptionChange = (e) => {
        this.setState({
            jenkel: e.target.value
        })
    }
    handleChangeSelect = (e, type) => {
        this.setState({
            [type]: e.target.value,
        })
    }
    updateSiswa = () => {
        const { nis, nama, tempat, tanggal, alamat, rombel, tingkat, jurusan, siswaId } = this.state;
        const { updateData, updateUser } = this.props;
        this.handleClose();
        const data = {
            nis: nis,
            nama: nama,
            tempat: tempat,
            tanggal: tanggal,
            alamat: alamat,
            tingkat: tingkat,
            rombel: rombel,
            jurusan: jurusan,
        }
        data.siswaId = siswaId;
        updateData(data);
        updateUser(data);
        alert('Data berhasil diubah')
    }
    deleteSiswa = () => {
        const { deleteData, deleteUser } = this.props;
        const {siswaId} = this.state;
        const data = {
            siswaId: siswaId
        }
        deleteData(data);
        deleteUser(data);
        this.handleClose();
        alert('Data dihapus!');
    }
    showmodalEx = () => {
        this.setState({
            modalEx: true,
        })
    }
    handleExport = async () => {
        const { ustingkat, usjurusan, usrombel } = this.state;
        const { getUser, datauser } = this.props;
        const data = {
            ustingkat: ustingkat,
            usrombel: usrombel,
            usjurusan: usjurusan,
        }
        const res = await (getUser(data)).catch(err => err);
        if (res) {
            this.setState({
                ustingkat: '',
                usrombel: '',
                usjurusan: '',
            })
            alert('Data didapatkan, silahkan export')
        } else {

        }
    }
    exportFile(datauser) {
        let users = [["NIS", "Nama", "Username", "Password"]]
        let kelas = '';
        datauser.forEach((user) => {
            let userArray = [user.datausers.nis, user.datausers.nama, user.datausers.nis, user.datausers.password]
            kelas = user.datausers.kelas;
            users.push(userArray)

        })
        const wb = XLSX.utils.book_new()
        const wsAll = XLSX.utils.aoa_to_sheet(users)

        XLSX.utils.book_append_sheet(wb, wsAll, kelas+" Users")
        XLSX.writeFile(wb, "data-user-" + kelas + ".xlsx")
        this.handleClose();
    }
    render() {
        const { datasiswa, datauser } = this.props;
        console.log('datasiswa: ', datasiswa);
        console.log('datauser: ', datauser);
        return (
            <div>
                <Navbar bg="dark" variant="dark" className="mb-4" sticky="top">
                    <Navbar.Brand>
                        <img className="mb-1 float-left" src="/images/logosmk.png" width="48" height="45" />
                    </Navbar.Brand>
                    <Nav activeKey="/datasiswa">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/datasiswa">Data Siswa</Nav.Link>
                        <Nav.Link href="/absensi">Data Absensi</Nav.Link>
                    </Nav>
                </Navbar>

                <Container>
                    <Row>
                        <Col lg={12}>
                            <p className="text-center font-weight-bold">Data Siswa</p>
                            <Row>

                                <Col lg={6}>
                                    <Button onClick={this.showmodalEx}>Export User</Button>
                                    <ModalExport
                                        handleChangeSelect={this.handleChangeSelect}
                                        handleClose={this.handleClose}
                                        handleExport={this.handleExport}
                                        exportFile={() => this.exportFile(datauser)}
                                        {...this.state} />
                                </Col>
                                <Col lg={6}>
                                    <Button className="btn-success float-right" onClick={this.handleShow}>Tambah Data</Button>
                                    <ModalAdd
                                        handleSaveData={this.handleSaveData}
                                        handleChangeText={this.handleChangeText}
                                        handleClose={this.handleClose}
                                        handleChangeSelect={this.handleChangeSelect}
                                        handleOptionChange={this.handleOptionChange}
                                        handleChangePassword={this.handleChangePassword}
                                        {...this.state} />
                                </Col>
                            </Row>
                            <Table striped bordered hover className="mt-4">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>NIS</th>
                                        <th>Kelas</th>
                                        <th>Nama</th>
                                        <th>TTL</th>
                                        <th>Alamat</th>
                                        <th>Alat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        datasiswa.length > 0 ? (
                                            <Fragment>
                                                {
                                                    datasiswa.map((siswa) => (

                                                        <tr key={siswa.id}>
                                                            <td>{siswa.datas.nis}</td>
                                                            <td>{siswa.datas.tingkat + ' ' + siswa.datas.jurusan + ' ' + siswa.datas.rombel}</td>
                                                            <td>{siswa.datas.nama}</td>
                                                            <td>{siswa.datas.tempat + ', ' + siswa.datas.tanggal}</td>
                                                            <td>{siswa.datas.alamat}</td>
                                                            <td>
                                                                <Button onClick={() => this.showEdit(siswa)}>Edit</Button> &nbsp;
                                                                    <ModalEdit
                                                                    updateSiswa={this.updateSiswa}
                                                                    handleChangeText={this.handleChangeText}
                                                                    handleClose={this.handleClose}
                                                                    handleChangeSelect={this.handleChangeSelect}
                                                                    handleOptionChange={this.handleOptionChange}
                                                                    {...this.state} />
                                                                <Button variant="danger" onClick={() => this.showConfirm(siswa)}>Hapus</Button>
                                                                <ModalHapus
                                                                    deleteSiswa={this.deleteSiswa}
                                                                    handleClose={this.handleClose}
                                                                    {...this.state} />
                                                            </td>
                                                        </tr>

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
    userData: state.user,
    datasiswa: state.datasiswa,
    datauser: state.datauser,
})

const reduxDispatch = (dispatch) => ({
    saveData: (data) => dispatch(addDataSiswa(data)),
    saveUser: (data) => dispatch(addDataUser(data)),
    getData: (data) => dispatch(getDataSiswa(data)),
    getUser: (data) => dispatch(getDataUser(data)),
    updateData: (data) => dispatch(updateDataSiswa(data)),
    updateUser: (data) => dispatch(updateDataUser(data)),
    deleteData: (data) => dispatch(deleteDataSiswa(data)),
    deleteUser: (data) => dispatch(deleteDataUser(data))
})

export default connect(reduxState, reduxDispatch)(DataSiswa);