import {
    Switch,
    Route
} from "react-router-dom";
import User from "../container/User/User";
import Project from "../container/Project/Project";
import Login from "../container/Login/Login";
import Register from "../container/Register/Register";
import Home from "../container/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import Roles from "../container/Roles/Roles";
import GroupRole from '../container/GroupRole/GroupRole';
const AppRoutes = (props) => {

    /**
     * ['/users/show', '/users/update']
     * 
     * 
     * 
     */
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={User} />
                <PrivateRoutes path="/projects" component={Project} />
                <PrivateRoutes path="/roles" component={Roles} />
                <PrivateRoutes path="/group-role" component={GroupRole} />
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/" exact={true}>
                    <Home />
                </Route>
                <Route path="*">
                    <h1>404 NOT FOUND</h1>
                </Route>
            </Switch>
        </>
    )
}

export default AppRoutes;