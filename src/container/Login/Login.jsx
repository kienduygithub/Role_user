import React, { useContext, useEffect, useState } from "react";
import './Login.scss';
import { connect } from "react-redux";
import {
    useHistory
} from 'react-router-dom';
import { toast } from "react-toastify";
import * as authServices from '../../services/authServices';
import {
    UserContext
} from '../../context/UserContext';
const Login = () => {
    const navigate = useHistory();
    const { loginContext, user } = useContext(UserContext);
    const [ form, setForm ] = useState({
        valueLogin: '',
        password: ''
    });
    const defaultValidInput = {
        isValueLoginValid: true,
        isPasswordValid: true
    }
    const [ objCheckInput, setObjCheckInput ] = useState(defaultValidInput);
    const handleOnChangeInput = (e, name) => {
        setForm({
            ...form,
            [name]: e.target.value
        })
    }
    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);
        if (!form.valueLogin) {
            toast.error('Email or phone number is required!');
            setObjCheckInput({
                ...objCheckInput, isEmailValid: false
            })
            return false;
        }
        if (!form.password) {
            toast.error('Password is required!');
            setObjCheckInput({
                ...objCheckInput, isPasswordValid: false
            });
            return false;
        }

        return true;
    }
    const handleSubmit = async () => {
        const isValid = isValidInputs();
        if (isValid) {
            const response = await authServices.handleLogin({
                valueLogin: form.valueLogin,
                password: form.password
            });
            if (response && +response.EC === 0) {
                toast.success(response.EM);
                let userData = {
                    isAuthenticated: true,
                    token: response.DT.token,
                    account: {
                        ...response.DT.groupWithRoles,
                        email: response.DT.email,
                        username: response.DT.username
                    }
                }
                localStorage.setItem('jwt_token', response.DT.token)
                loginContext(userData);
                navigate.push('/users');
            } else {
                if (+response.DT === 2) {
                    setObjCheckInput({
                        ...objCheckInput,
                        isPasswordValid: false,
                        isValueLoginValid: false
                    })
                    toast.error(response.EM);
                } else {
                    toast.error(response.EM);
                }
            }
        }
    }
    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }
    useEffect(() => {
        // Khi người dùng đã đăng nhập thì không vô được
        // trang login
        if (user && user.isAuthenticated === true) {
            console.log('user', user);
            navigate.push('/');
        }
    }, [user]);
    return (
         <div className="login-container d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-7 d-none d-sm-flex d-sm-flex flex-column justify-content-center">
                        <div className="brand">
                            Kiến Duy
                        </div>
                        <div className="detail">
                            Learn everything
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column py-3 gap-2">
                        <span className="mobile-brand text-center d-sm-none d-block">Kiến Duy</span>
                        <input type="text" className={objCheckInput.isValueLoginValid ? "form-control" : "form-control is-invalid"} placeholder="Email address or phone number" required
                            value={form.valueLogin} onChange={(e) => handleOnChangeInput(e, 'valueLogin')}
                        />
                        <input type="password" className={objCheckInput.isPasswordValid ? "form-control" : "form-control is-invalid"} placeholder="Password" required
                            value={form.password} onChange={(e) => handleOnChangeInput(e, 'password')}
                            onKeyDown={(e) => handleOnKeyDown(e)}
                        />
                        <button className="btn btn-primary" onClick={() => handleSubmit()}>Login</button>
                        <span className="forgot-password text-center">
                            Forgot your password?
                        </span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => navigate.push('/register')}>Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Login);