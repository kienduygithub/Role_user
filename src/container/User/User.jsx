import React, { useEffect } from "react";
import './User.scss';
import { connect } from 'react-redux';
import {
    useHistory
} from 'react-router-dom';
import ManageUsers from "../../components/ManageUsers/ManageUsers";
const User = (props) => {
    const history = useHistory();
    return (
        <div className="user-container">
            <ManageUsers/>
        </div>
    )
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(User);