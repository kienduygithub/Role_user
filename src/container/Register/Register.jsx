import React, { useState } from "react";
import './Register.scss';
import { connect } from "react-redux";
import {
    useHistory
} from 'react-router-dom';
import { toast } from "react-toastify";
import * as authServices from '../../services/authServices';
const Register = () => {
    const navigate = useHistory();
    const [ form, setForm ] = useState({
        email: '',
        phone: '',
        username: '',
        password: '',
        reType: ''
    });
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [ objCheckInput, setObjCheckInput ] = useState(defaultValidInput)
    const handleOnChangeInput = (e, name) => {
        setForm({
            ...form,
            [name]: e.target.value
        })
    }
    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);
        const { email, phone, password, reType } = form;
        if (!email) {
            toast.error('Email is required!');
            setObjCheckInput({
                ...defaultValidInput,
                isValidEmail: false
            })
            return false;
        }
        let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValidEmail = reg.test(email);
        if (!isValidEmail) {
            toast.error('Please enter a valid email address!');
            setObjCheckInput({
                ...defaultValidInput,
                isValidEmail: false
            })
            return false;
        }
        if (!phone) {
            toast.error('Phone is required!');
            setObjCheckInput({
                ...defaultValidInput,
                isValidPhone: false
            })
            return false;
        }
        if (!password) {
            toast.error('Password is required!');
            setObjCheckInput({
                ...defaultValidInput,
                isValidPassword: false
            })
            return false;
        }
        if (password !== reType) {
            toast.error('Your password is not the same!');
            setObjCheckInput({
                ...defaultValidInput,
                isValidPassword: false,
                isValidConfirmPassword: false
            })
            return false;
        }

        return true;
    }
    const handleSubmit = async () => {
        let check = isValidInputs();
        if (check === true) {
            const response = await authServices.handleRegister({
                email: form.email,
                phone: form.phone,
                username: form.username,
                password: form.password,
            });
            if (response && +response.EC === 0) {
                toast.success(response.EM);
                navigate.push('/login');
            } else {
                toast.error(response.EM);
            }
        }
    }
    return (
        <div className="register-container d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-7 d-none d-sm-flex d-sm-flex flex-column justify-content-center">
                        <div className="brand">
                            Kiến Duy
                        </div>
                        <div className="detail">
                            Create everything
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column py-3 gap-2">
                        <span className="mobile-brand text-center d-sm-none d-block">Kiến Duy</span>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text" className={objCheckInput.isValidEmail ? "form-control" : "form-control is-invalid"} placeholder="Email address"
                                value={form.email} onChange={(e) => handleOnChangeInput(e, "email")} required
                            />
                        </div>
                        <div className="row d-l-flex flex-l-column gap-2">
                            <div className="form-group col-l-6">
                                <label>Phone number: </label>
                                <input type="text" className={objCheckInput.isValidPhone ? "form-control" : "form-control is-invalid"} placeholder="Phone number"
                                    value={form.phone} onChange={(e) => handleOnChangeInput(e, "phone")} required
                                />
                            </div>
                            <div className="form-group col-l-6">
                                <label>Username: </label>
                                <input type="text" className="form-control" placeholder="Username"
                                    value={form.username} onChange={(e) => handleOnChangeInput(e, "username")} required
                                />
                            </div>
                        </div>
                        <div className="row d-l-flex flex-l-column gap-2">
                            <div className="form-group col-l-6">
                                <label>Password: </label>
                                <input type="password" className={objCheckInput.isValidPassword ? "form-control" : "form-control is-invalid"} placeholder="Password"
                                    value={form.password} onChange={(e) => handleOnChangeInput(e, "password")} required
                                />
                            </div>
                            <div className="form-group col-l-6">
                                <label>Re-enter password: </label>
                                <input type="password" className={objCheckInput.isValidConfirmPassword ? "form-control" : "form-control is-invalid"} placeholder="Re-enter password"
                                    value={form.reType} onChange={(e) => handleOnChangeInput(e, "reType")} required
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={() => handleSubmit()}>Register</button>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => navigate.push('/login')}>
                                Already've an account. Login
                            </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);