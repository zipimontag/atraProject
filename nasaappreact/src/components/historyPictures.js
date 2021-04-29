
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
function mapStateToProps(state) {
    return {
        user: state.users
    }
}
export default connect(mapStateToProps)(function HistoryPictures(props) {

    const { user } = props;
    console.log(user);
    const [newPicture, setNewPicture] = useState(0);
    const [historyPictures, setHistoryPictures] = useState([]);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", user);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
    };

    function setHistoryFunc(historyPictures) {
        debugger;
        setHistoryPictures(historyPictures)
        console.log(historyPictures);

    }

    useEffect(() => {
        fetch('http://localhost:4800/picture/getAllPicture', requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(historyPictures);

                setHistoryFunc(response);
                console.log('historyPictures' + historyPictures);
            })
            .catch(error => console.log('error', error));

    }, [])



    function myFunc(event) {
        var fileReader = new FileReader()
        fileReader.onload = ((e) => {
            setNewPicture(e.target.result);
            requestOptions.body = JSON.stringify({ "url": e.target.result, "title": 'my picture', "date": Date.now(), "explanation": 'picture from the compouter' });
            fetch('http://localhost:4800/picture/newPicture', requestOptions)
                .then(response => response.json())
                .then(res => {
                    console.log(res);
                })
                .catch(error => console.log('error', error));
        })
        setNewPicture(fileReader.readAsDataURL(event.target.files[0]))
    }
    const picturesStyle = {

        width: "25%",
        hight: "1000px",
        display: "inline-block"
    }
    const showStyle =
    {
        width: "250px",
        hight: "450px"
    }
    return (
        <>
            <h1 style={{ color: "purple" }}>My History Pictures</h1>
            <h4 style={{ color: "pink" }}>Search a picture from your computer</h4>
            <h5>   <input className="form-control form-control-lg" id="formFileLg" type="file" accept="url" className="historyPicture" onChange={myFunc} /> </h5>

            {historyPictures.pictures !== undefined ?
                <div>
                    <p>zippi</p>
                    {
                        historyPictures.pictures[0].pictures.map((item, index) => {
                            <div className="card" style={picturesStyle} key={index}>
                                <h2>aaa</h2>
                                <p className="card-text">{item.title}</p>
                                {item.media_type === 'video' ?
                                    <div>
                                        <iframe src={item.url} className="card-img-top" alt="video" style={showStyle}></iframe>
                                    </div>
                                    :
                                    <div>
                                        <img src={item.url} className="card-img-top" alt="img" style={showStyle} />

                                    </div>
                                }

                            </div>

                        })}

                </div>
                :
                <h4 style={{ color: "red" }}>pictures were not found yet:(</h4>
            }
        </>
    )

})
