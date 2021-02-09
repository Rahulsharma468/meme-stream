import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { serverUrl } from "../../utility";
import { Context } from "../../context";

const SingleMeme = props => {
  const [state, setState] = useContext(Context);
  const [meme, setMeme] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${ serverUrl }/memes/${props.match.params.id}`)
      .then(res => {
        let meme = res.data;
        setMeme(meme);
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  const onDelete = async () => {
    setLoading(true);
    let res = await axios.delete(`${ serverUrl }/memes/${props.match.params.id}`);
    res = await axios.get(`${ serverUrl }/memes`);
    setState({ memeList: res.data, heading: "Top 100 memes" });
    setLoading(false);
    props.history.push('/');
  }

  if (!meme.id) {
    return <Spinner />;
  }
  return (
    <>
      <Link to="/" className="btn btn-dark btn-sm mb-4">
        <i className="fas fa-arrow-left" />  Go Back
      </Link>
      <div className="d-flex float-right">
        <button className="btn btn-danger btn-sm mb-4 mr-2" onClick={onDelete} disabled={loading}>
          Delete
        </button>
        <Link to={`/editmeme/${props.match.params.id}`} className="btn btn-warning btn-sm mb-4 mr-2">
          Edit
        </Link>
      </div>
      <div className="row">
        <div className="col-12">
        <div className="card-text" style={{textAlign: "center"}}>
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
              <img src={meme.url} className="img-fluid" style={{width: '100%', height: '100%'}}  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMeme;
