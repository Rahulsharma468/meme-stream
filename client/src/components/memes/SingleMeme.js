import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { serverUrl } from "../../context";
import { Context } from "../../context";

const SignleMeme = props => {
  const [state, setState] = useContext(Context);
  const [meme, setMeme] = useState({});

  useEffect(() => {
    axios.get(`${ serverUrl }/memes/${props.match.params.id}`)
      .then(res => {
        let meme = res.data;
        setMeme(meme);
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  const onDelete = async () => {
    let res = await axios.delete(`${ serverUrl }/memes/${props.match.params.id}`);
    res = await axios.get(`${ serverUrl }/memes`);
    setState({ memeList: res.data, heading: "Top 100 memes" });
    props.history.push('/');
  }

  if (!meme.id) {
    return <Spinner />;
  } else {
    console.log(meme)
    return (
      <>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          <i className="fas fa-arrow-left" />  Go Back
        </Link>
        <div className="d-flex float-right">
          <button className="btn btn-danger btn-sm mb-4 mr-2" onClick={onDelete}>
            Delete
          </button>
          <button className="btn btn-warning btn-sm mb-4 mr-2">
            Edit
          </button>
        </div>
        <div className="row">
          <div className="col-12">
          <div className="card-text">
            <h3>
              <i className="fas fa-user" /> Creator: {meme.name}
            </h3>
            <br />
            <h3>
              <i className="fas fa-compact-disc" /> Caption: {meme.caption}
            </h3>
          </div>
          </div>
          <div className="col-12">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <img src={meme.url} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SignleMeme;
