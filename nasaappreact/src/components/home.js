import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Login from './login';
import HistoryPictures from './historyPictures';
import RegisterUser from './register';
import NasaPictures from './nasaPictures';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        user: state.users
    }
};

const imgStyle = {
    width: "100%",
    display: "flex",
    opacity: "0.5",
    position: 'fixed', marginLeft: "-9.35%", marginTop: "-2%"
}

export default connect(mapStateToProps)(function Home(props) {
    const { user } = props;
    return (
        <div>

            <Menu />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <RegisterUser />
                </Route>

                <Route path="/history">
                    {user.userName !== undefined || user.userPassword !== undefined ?
                        < HistoryPictures />
                        :
                        <Redirect to="/login" />
                    }
                </Route>
                <Route path="/NasePicture">
                {user.userName !== undefined || user.userPassword !== undefined ?
                    <NasaPictures></NasaPictures>
                    :
                        <Redirect to="/login" />
                    }
                </Route>
            </Switch>
        </div>
    );

})

function Menu() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-nav">
                    <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                </div>
                <div className="navbar-nav">
                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                </div>
               
            </nav>


            <h1 className="display-1 fw-bold" style={{ color: "purple" }}>Welcome to NASA site!!</h1>


        </div>
    );
}






