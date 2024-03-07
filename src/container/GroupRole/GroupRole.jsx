import {useState, useEffect} from 'react';
import './GroupRole.scss';
import * as GroupServices from '../../services/groupServices';
import * as RoleServices from '../../services/roleServices';
import {toast} from 'react-toastify';
import _ from 'lodash';
const GroupRole = () => {
    const [group, setGroup] = useState('');
    const [groups, setGroups] = useState([]);
    const [roles, setRoles] = useState([]);
    const [assignedRolesByGroup, setAssignedRolesByGroup] = useState([]);
    const fetchAllGroups = async () => {
        const response = await GroupServices.getAllGroups();
        if(response && response.EC === 0) {
            setGroups(response.DT);
        } else {
            toast.error(response.EM);
        }
    }
    const fetchAllRoles = async () => {
        const response = await RoleServices.getAllRoles();
        if(response && response.EC === 0) {
            setRoles(response.DT);
        } else {
            toast.error(response.EM);
        }
    }
    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if(allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {};
                object.url = role.url;
                object.id = role.id;
                object.description = role.description;
                object.isAssigned = false;
                if(groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(item => item.url === object.url);
                }
                result.push(object);
            })
        }
        return result;
    }
    const handleOnChangeSelect = async (e) => {
        setGroup(e.target.value);
        setAssignedRolesByGroup([]);
        if(e.target.value) {
            const response = await RoleServices.getRolesByGroupId(e.target.value);
            if(response && response.EC === 0) {
                let result = buildDataRolesByGroup(response.DT.Roles, roles);
                setAssignedRolesByGroup(result);
            } else {
                toast.error(response.EM);
            }
        }
    }
    console.log(assignedRolesByGroup)
    const handleSelectRole = (value) => {
        const _assignedRolesByGroup = _.cloneDeep(assignedRolesByGroup);
        let foundIndex = _assignedRolesByGroup.findIndex(x => +x.id === +value);
        if(foundIndex > -1) {
            _assignedRolesByGroup[foundIndex]['isAssigned'] = !_assignedRolesByGroup[foundIndex]['isAssigned'];
            // console.log(_assignedRolesByGroup[foundIndex])
        }
        setAssignedRolesByGroup(_assignedRolesByGroup);
    }
    const buildDataToSave = (roles) => {
        let result = [];
        if(roles && roles.length > 0) {
            roles.map((role, index) => {
                let object = {};
                object.id = +role.id;
                object.url = role.url;
                object.description = role.description;
                if(role.isAssigned === true) {
                    result.push(object);
                }
            })
        }
        return result;
    }
    const handleSave = async () => {
        const result = buildDataToSave(assignedRolesByGroup);
        const response = await RoleServices.assignRoleToGroup(+group, result);
        if(response && response.EC === 0) {
            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }
    }
    useEffect(() => {
        fetchAllGroups();
        fetchAllRoles();
    }, []); 
    return (
        <div className="group-role-container">
            <div className="container mt-3">
                <div className='row'>
                    <h4>Group Role:</h4>
                    <div className='form-group col-4'>
                        <label>
                            Select Group (<span className='red'>*</span>):
                        </label>
                        <select value={group} onChange={(e) => handleOnChangeSelect(e)} className="form-select">
                            <option defaultChecked value={''} disabled>Please select group</option>
                            {
                                groups.length > 0 &&
                                    groups.map((group, index) => {
                                        return (
                                            <option key={`group-${index}`} value={group.id}>{group.name}</option>
                                        )
                                    })
                            }
                        </select>
                    </div>
                </div>
                <hr />
                {
                    group && 
                        <div className='roles'>
                            <h4>Assign Roles:</h4>
                            {
                                assignedRolesByGroup && assignedRolesByGroup.length > 0 &&
                                    assignedRolesByGroup.map((role, index) => (
                                        <div className='form-check' key={`role-${index}`}>
                                            <input className='form-check-input' type='checkbox' value={role.id} id={role.id}
                                                defaultChecked={role.isAssigned}
                                                onChange={(e) => handleSelectRole(e.target.value)}
                                            />
                                            <label className='form-check-label' htmlFor={role.id}>{role.url}</label>
                                        </div>
                                    ))
                            }
                            <div className='mt-4'>
                                <button className='btn btn-warning' onClick={() => handleSave()}>Save</button>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default GroupRole;