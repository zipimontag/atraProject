
import react, { createRef,useState } from 'react';
import { connect } from 'react-redux'
import { actions } from '../Store/actions';
import NasaPictures from './nasaPictures';
import {
    withRouter
} from 'react-router-dom';

function mapStateToProps(state) {
    return {
        user: state.users
    }
}

const mapDispatchToProps = (dispatch) => ({
    addNewUser: (token) => dispatch(actions.addNewUser(token))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function RegisterUser(props) {
    const { addNewUser, history } = props;
    const [isRegister,setIsRegister]=useState(false)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const reftoName = createRef();
    const reftoPassword = createRef();
    function register() {

        const user = {
            "userName": reftoName.current.value,
            "userPassword": reftoPassword.current.value
        }
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user),
        };
        fetch("http://localhost:4800/user/createUser", requestOptions)
            .then(response => response.json())
            .then(res => { addNewUser(res.token);
            console.log("myToken; "+res.token); })
            .then(()=>{
                setIsRegister({isRegister:true})
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="container">
            {isRegister?
        <div>
            <NasaPictures></NasaPictures>
        </div>   
        :
        <div>
            <div className="container">
                <br /><br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="loader9">
                            <div className="box-1"></div>
                            <div className="box-2"></div>
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
                        <h1>Register</h1>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" ref={reftoName} />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" ref={reftoPassword} />
                        </div>

                    </form>
                    <button className="btn btn-primary" onClick={register}>Register</button>

                </div >
            </div >
        <p style={{color:"red"}}>you still did not register!</p> 
        </div>
        }
        </div >
    )
}))