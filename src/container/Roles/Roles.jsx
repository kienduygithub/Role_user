import {useEffect, useRef, useState} from 'react';
import './Roles.scss';
import {connect} from "react-redux";
import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-toastify';
import * as RoleServices from '../../services/roleServices';
import TableRoles from './TableRoles';
const Roles = (props) => {
    const childDefault = {url: '', description: '', isValidUrl: true};
    const [listChilds, setListChilds] = useState({
        child1: childDefault
    });
    const childRef = useRef();
    const handleOnChangeInput = (name, e, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = e.target.value;
        if(_listChilds[key]['url'].length > 0) {
            _listChilds[key]['isValidUrl'] = true;
        }
        setListChilds(_listChilds);
    }
    const handleAddNewInputRole = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = childDefault;
        console.log(_listChilds);
        setListChilds(_listChilds);
    }
    const handleRemoveInputRole = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    }
    const builDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(_listChilds).map(([key, child]) => {
            result.push({
                url: child.url,
                description: child.description
            });
        });
        return result;
    }
    const handleSaveAddRoles = async () => {
        let invalidObj = Object.entries(listChilds).find(([key, child]) => {
            return child && !child.url;
        });
        if(!invalidObj) {
            // Call API
            const roles = builDataToPersist();
            const response = await RoleServices.createNewRoles(roles);
            if(response && response.EC === 0) {
                toast.success(response.EM);
                setListChilds({child1: childDefault});
                await childRef.current.fetchAllRolesAgain();
            } else if(response && response.EC === 1) {
                toast.error(response.EM);
                setListChilds({child1: childDefault});
            } else {
                toast.error(response.EM);
            }
        } else {
            // console.log( 'invalidObj', invalidObj );
            // Handle Error
            let _listChilds = _.cloneDeep(listChilds);
            _listChilds[invalidObj[0]]['isValidUrl'] = false;
            setListChilds(_listChilds);
            toast.error('Input URL must not be empty...');
        };
    };
    useEffect(() => {
        // Object.entries(listChilds).map(([ key, value ]) => {
        //     console.log(key, value);
        // })
    }, [])
    return (
        <div className="roles-container">
            <div className="container">
                <div className='mt-3'>
                    <div className='title-role'>
                        <h4>Add a new role:</h4>
                    </div>
                    <div className='role-parent'>
                        {
                            Object.entries(listChilds).map(([key, child], index) => {
                                return (
                                    <div className='row role-child' key={`child-${key}`}>
                                        <div className={`col-12 col-sm-5 form-group ${key}`}>
                                            <label>URL: </label>
                                            <input type='text' className={child.isValidUrl === true ? 'form-control' : 'form-control is-invalid'} value={child.url}
                                                onChange={(e) => handleOnChangeInput('url', e, key)}
                                            />
                                        </div>
                                        <div className='col-12 col-sm-5 form-group'>
                                            <label>Description: </label>
                                            <input type='text' className='form-control' value={child.description}
                                                onChange={(e) => handleOnChangeInput('description', e, key)}
                                            />
                                        </div>
                                        <div className='col-12 col-sm-2 mt-4 d-flex align-items-center gap-1 actions'>
                                            <button className='btn btn-primary' onClick={() => handleAddNewInputRole()}>
                                                <i className="fa fa-plus-circle"></i>
                                            </button>
                                            {
                                                index >= 1 &&
                                                <>
                                                    <button className='btn btn-secondary' onClick={() => handleRemoveInputRole(key)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className='mt-3'>
                            <button className='btn btn-warning' onClick={() => handleSaveAddRoles()}>Save</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className='mt-3'>
                    <h4>List current roles: </h4>
                    <TableRoles ref={childRef}/>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps=state => ( {

} );
const mapDispatchToProps=dispatch => ( {

} );
export default connect( mapStateToProps, mapDispatchToProps )( Roles );