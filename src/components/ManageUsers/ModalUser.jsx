import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as GroupServices from '../../services/groupServices';
import * as userServices from '../../services/userServices';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {
    const { action, dataUser } = props;
    const defaultValid = {
        email: true,
        phone: true,
        username: true,
        password: true,
    }
    const defaultForm = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }
    const [ form, setForm ] = useState(defaultForm);
    const [ validInput, setValidInput ] = useState(defaultValid);
    const [ groups, setGroups ] = useState({});
    const handleOnChangeInput = (e,name) => {
        let _form = _.cloneDeep(form);
        _form[name] = e.target.value;
        if(_form[name] !== '') {
            setValidInput({
                ...validInput,
                [name]: true
            })
        }
        setForm(_form);
        
    }
    const fetchAllGroups = async () => {
        const response = await GroupServices.getAllGroups();
        if (response && response.EC === 0) {
            setGroups(response.DT);
            if (response.DT.length > 0) {
                let groups = response.DT;
                setForm({
                    ...form, group: groups[0].id
                })
            }
        }
    }
    const handleSave = async () => {
        setValidInput(defaultValid);
        const valid = checkValidInputs();
        if (valid) {
            const response = action === 'CREATE' ? 
                await userServices.createUser({ ...form, groupId: form[ 'group' ] })
                : await userServices.updateUser({...form, groupId: form['group'], id: dataUser.id});
            if (response && response.EC === 0) {
                toast.success(response.EM);
                props.handleClose();
                setForm(defaultForm);
                setValidInput(defaultValid);
            } else if (response && response.EC === 1) {
                toast.error(response.EM);
                setValidInput({
                    ...validInput, [response.DT]: false
                })
            } else {
                toast.error(response.EM)
            }
        }
    }
    const checkValidInputs = () => {
        // CREATE
        if (action === 'UPDATE') {
            return true;
        } else {
            const cloneValidInput = _.cloneDeep(validInput);
            let arrCheck = 
                [ 'email', 'phone', 'username', 'password' ];
            let arrErr = [];
            arrCheck.forEach((item) => {
                if (form[ item ] === '') {
                    cloneValidInput[ item ] = false;
                    arrErr.push(item);
                } else {
                    cloneValidInput[ item ] = true
                }
            })
            if (arrErr.length > 0) {
                setValidInput({ ...cloneValidInput });
                toast.error('Please enter required information!');
                return false;
            }
    
            return true;
        }
    }
    useEffect(() => {
        fetchAllGroups();
    }, []);
    useEffect(() => {
        setForm({ ...defaultForm, group: groups[ 0 ]?.id });
        setValidInput(defaultValid);
        if (props.action === "UPDATE") {
            setForm({ ...props.dataUser, group: props.dataUser.groupId });
            setValidInput(defaultValid);
        }
    }, [ props.isShow ]);
    useEffect(() => {
        if (action === 'CREATE') {
            if (groups && groups.length > 0) {
                setForm({ ...defaultForm, group: groups[ 0 ].id });
            }
        }
    }, [action])
    return (
        <>
            <Modal show={props.isShow} onHide={props.handleClose} className='modal-user' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>{props.action === 'CREATE' ? 'Create new user' : 'Edit a user'}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body'>
                        <div className='row'>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Email address (<span className='red'>*</span>):</label>
                                <input className={validInput.email === true ? 'form-control' : 'form-control is-invalid'} type='email' onChange={(e) => handleOnChangeInput(e, "email")} value={form.email}
                                    disabled={action === 'UPDATE' ? true : false}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Phone number (<span className='red'>*</span>):</label>
                                <input className={validInput.phone ? 'form-control' : 'form-control is-invalid'} type='text' onChange={(e) => handleOnChangeInput(e, "phone")} value={form.phone}
                                    disabled={action === 'UPDATE' ? true : false}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Username: </label>
                                <input className={validInput.username ? 'form-control' : 'form-control is-invalid'} type='text' onChange={(e) => handleOnChangeInput(e, "username")} value={form.username}/>
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                {
                                    action === 'CREATE' &&
                                    <>
                                        <label>Password: (<span className='red'>*</span>):</label>
                                        <input className={validInput.password ? 'form-control' : 'form-control is-invalid'} type='password' onChange={(e) => handleOnChangeInput(e, "password")} value={form.password}/>
                                    </>
                                }
                            </div>
                            <div className='col-12 col-sm-12 form-group'>
                                <label>Address: </label>
                                <input className='form-control' type='text' onChange={(e) => handleOnChangeInput(e, "address")} value={form.address}/>
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Gender: </label>
                                <select className="form-select form-select-md" onChange={(e) => handleOnChangeInput(e, "sex")} value={form.sex}>
                                    <option defaultValue="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Group (<span className='red'>*</span>): </label>
                                <select className="form-select form-select-md" onChange={(e) => handleOnChangeInput(e, "group")} value={form.group}>
                                    {
                                        groups && groups.length > 0 ?
                                            groups.map((group, index) => (
                                                <option key={`records-${ index }`} value={group.id}>
                                                    {group.name}
                                                </option>
                                            ))
                                            :
                                            <option value="">Not found</option>
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave()}>
                    { action === 'CREATE' ? 'Save' : 'Update'}
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;