import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        user: state.users
    }
}
export default connect(mapStateToProps)(function NasaPictures(props) {
    const { user } = props;
    const [picture, setPicture] = useState([]);
    console.log("state " + user)

    function add(picture) {
        setPicture(picture)
        console.log("current user " + user)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authorization", user);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(picture),
        };


        fetch("http://localhost:4800/picture/newPicture", requestOptions)
        
            .then(response => response.json())
            .then(res => {
                
                console.log(res);
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        fetch(" https://api.nasa.gov/planetary/apod?api_key=ZEHEWA48HHvGZIzRlpweaarCj6HEdEcvHt7sJdjp")
            .then(response => response.json())
            .then(result => {
                add(result)
            })
            .catch(error => console.log('error', error));
    }, [])

    return (
        <>
            <div  style={{marginRight:"50px",display:"flex"}} className="card my-auto"  className="apod" style={{ width: "25rem" }}>
                <h1 style={{ color: "purple" }}>NASA Astronomy Picture Of The Day</h1>
                <h2>{picture.title}</h2>
                <p className="card-text">{picture.date}</p>
                {
                    picture.media_type === 'video' ?
                        <iframe src={picture.url} className="card-img-top" alt="video" /> :
                        <img src={picture.url} className="card-img-top" alt="img" />
                }
                <div className="card-body">
                    <p className="card-text">{picture.explanation}</p>
                </div>
            </div>

        </>
    )
})