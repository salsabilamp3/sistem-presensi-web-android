import React, { Component, Fragment } from 'react';
import './dashboard.css';
import { Navbar, Nav, Button, Col, Row, Card, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser, getJumlahSiswa, getJumlahAbsen } from '../../../config/redux/action';

class Dashboard extends Component {
    state = {
        jumlah: '',
        jumlahabsen: '',
    }
    handleLogout = () => {
        const { logout, history } = this.props;
        logout();
        history.push('/')
    }
    componentDidMount() {
        this.props.jumsis();
        this.props.jumab();
        const { jumlahsis, jumlahab } = this.props;
        this.setState({
            jumlah: jumlahsis,
            jumlahabsen: jumlahab
        })
    }
    render() {
        const { jumlahsis, jumlahab } = this.props;
        return (
            <div>
                <Navbar bg="dark" variant="dark" className="mb-4" sticky="top">
                    <Navbar.Brand>
                        <img className="mb-1 float-left" src="/images/logosmk.png" width="48" height="45" />
                    </Navbar.Brand>
                    <Nav activeKey="/dashboard">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/datasiswa">Data Siswa</Nav.Link>
                        <Nav.Link href="/absensi">Data Absensi</Nav.Link>
                    </Nav>
                    <Button className="ml-auto" variant="danger" onClick={this.handleLogout}>Logout</Button>
                </Navbar>

                <Container className="pl-5 pt-5 pr-5">
                    <Card className="ml-5 mr-5 kotak">
                        <Card.Title className="text-center font-weight-bold mb-3">Halo Admin! </Card.Title>
                        <Card.Text>
                            <Row className="mt-5 mb-3">
                                <Col lg={6}>
                                    <Card className="kotak2">
                                        <Card.Title className="text-center font-weight-bold">
                                            Jumlah Data Siswa
                                        </Card.Title>
                                        <Card.Text className="font-weight-bold text-center mt-5">
                                            <h1 className="mb-4"> {jumlahsis} </h1>
                                            <Button href="/datasiswa" className="mt-5 mb-3" variant="primary">Lihat Data</Button>
                                        </Card.Text>
                                    </Card>
                                </Col>
                                <Col lg={6}>
                                    <Card className="kotak2">
                                        <Card.Title className="text-center font-weight-bold">
                                            Jumlah Data Absensi
                                        </Card.Title>
                                        <Card.Text className="font-weight-bold text-center mt-5">
                                            <h1 className="mb-4"> {jumlahab} </h1>
                                            <Button href="/absensi" className="mt-5 mb-3" variant="primary">Lihat Data</Button>
                                        </Card.Text>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card>
                </Container>
                
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    jumlahsis: state.jumlahsiswa,
    jumlahab: state.jumlahabsen
})

const reduxDispatch = (dispatch) => ({
    logout: (data) => dispatch(logoutUser(data)),
    jumsis: (data) => dispatch(getJumlahSiswa(data)),
    jumab: (data) => dispatch(getJumlahAbsen(data))
})

export default connect(reduxState, reduxDispatch)(Dashboard);