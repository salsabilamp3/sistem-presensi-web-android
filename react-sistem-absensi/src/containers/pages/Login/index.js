import React, {Component} from 'react';
import { connect } from 'react-redux';
import './login.css';
import { loginUserAPI } from '../../../config/redux/action';
import { Navbar, Nav } from 'react-bootstrap';

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleLoginSubmit = async () => {
        const {email, password} = this.state;
        const {history} = this.props;
        const res = await this.props.loginAPI({email, password}).catch(err => err);
        if (res) {
            console.log('login success', res);
            this.setState({
                email: '',
                password: '',
            })
            history.push('/dashboard')
        }else{
            alert('Login Gagal!')
        }
    }

    render(){
        return(
            <div className="">
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand>
                        <img className="mb-1 float-left" src="/images/logosmk.png" width="48" height="45" />
                    </Navbar.Brand>
                    <Nav activeKey="/">
                        <Nav.Link href="/">Sistem Presensi Peserta Didik</Nav.Link>
                    </Nav>
                </Navbar>
                <div className="card border-primary w-25 text-center tengah">
                    <div className="card-body">
                            <img className="mb-1" src="/images/logosmk.png" width="110"></img>
                            <h3 className="mb-3">Login</h3>
                            <input id="email" className="form-control mb-1" type="email" placeholder="email" onChange={this.handleChangeText} value={this.state.email}/>
                            <input id="password" className="form-control" type="password" placeholder="password" onChange={this.handleChangeText} value={this.state.password}/>
                            <button onClick={this.handleLoginSubmit} className="btn btn-primary mt-3">Login</button>
                    </div>  
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login);