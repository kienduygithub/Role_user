import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.min.css';
import {
    Flip,
    ToastContainer
} from 'react-toastify'
import {
    BrowserRouter as Router
} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from './store/actions';
import {useContext, useEffect, useState} from 'react';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';
import {Rings} from 'react-loader-spinner';
import {
    UserContext
} from './context/UserContext'
import {Scrollbars} from 'react-custom-scrollbars';
function App(props) {
    const {user} = useContext(UserContext);
    const [scrollHeight, setScrollHeight] = useState(0);
    useEffect(() => {
        let windowHeight = window.innerHeight;
        console.log(windowHeight);
        setScrollHeight(windowHeight);
    }, [user])
    return (
        <Scrollbars autoHide style={{height: '100vh'}}>
            <Router>
                {
                    user && user.isLoading === true ?
                        <div className='loading-container d-flex flex-column align-items-center justify-content-center'>
                            <Rings
                                visible={true}
                                height="80"
                                width="80"
                                color="#1877f2"
                                ariaLabel="rings-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                            <div>Loading data...</div>
                        </div>
                        :
                        <>
                            <div className='app-header'>
                                <Header />
                            </div>
                            <div className="app-container">
                                <AppRoutes />
                            </div>
                        </>
                }
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Flip}
                />
            </Router>
        </Scrollbars>
    );
}

const mapStateToProps = (state) => ({
    count: state.count.count,
})
const mapDispatchToProps = (dispatch) => ({
    increase: () => dispatch(actions.increaseCount()),
    decrease: () => dispatch(actions.decreaseCount())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
