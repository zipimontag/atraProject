
import react, { createRef, useState } from 'react';
import { connect } from 'react-redux'
import { actions } from '../Store/actions';
import { Redirect } from 'react-router-dom';
import RegisterUser from './register'
import NasaPictures from './nasaPictures';
import {
    withRouter
} from 'react-router-dom'
function mapStateToProps(state) {
    return {
        user: state.users
    }
}
const mapDispatchToProps = (dispatch) => ({

    addNewUser: (token) => dispatch(actions.addNewUser(token))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Login(props) {

    const { addNewUser, history } = props
    const [isLogin, setIsLogin] = useState(false)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const reftoName = createRef();
    const reftoPassword = createRef();
    function login() {
        const user = {
            "userName": reftoName.current.value,
            "userPassword": reftoPassword.current.value
        }
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user),
        };

        fetch("http://localhost:4800/user/getLoginUser", requestOptions)

            .then(response => response.json())
            .then(res => {
                addNewUser(res.myToken)
                console.log("myToken: " + res.myToken);
            }
            )
            .then(() => {
                setIsLogin({ isLogin: true })
            })

            .catch(error => console.log('error', error));
    }

    function redirectToHistory() {

        history.push('/history');

    }

    return (
        <div>
            {isLogin ?
                <div>
                    <button className="btn btn-primary" onClick={redirectToHistory}>my history pictures</button>
                    <NasaPictures></NasaPictures>
                </div>
                :
                <div className="container">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="loader4">
                                    <span className="loader loader-1"></span>
                                    <span className="loader loader-2"></span>
                                    <span className="loader loader-3"></span>
                                    <span className="loader loader-4"></span>
                                </div>
                            </div>
                        </div>
                        <br /><br />
                    </div>
                    <div className="row">
                        <div className="col-3">

                        </div>
                        <div className="col-6">
                            <form>
                                <h1>Login</h1>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" ref={reftoName} />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" ref={reftoPassword} />
                                </div>

                            </form>
                            <button className="btn btn-primary" onClick={login}>Login</button>
                        </div>
                    </div >
                    <p style={{ color: "red" }}>you still did not login!</p>

                </div >

            }

        </div>

    )
}))
