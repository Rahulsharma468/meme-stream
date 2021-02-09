import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context";
import { imageExists, serverUrl } from "../../utility";
import Spinner from "../layout/Spinner";

const EditMeme = props => {
  const [state, setState] = useContext(Context);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${ serverUrl }/memes/${props.match.params.id}`)
      .then(res => {
        let meme = res.data;
        setName(meme.name);
        setCaption(meme.caption);
        setUrl(meme.url);
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  const submitToApi = async (data) => {
    setLoading(true);
    let res = await axios.put(`${ serverUrl }/memes/${ props.match.params.id }`, data);
    res = res.data;
    let memesData = state.memeList;
    memesData = memesData.map((meme) => {
        return meme.id == res.id ? res : meme;
    })
    setState({ memeList: memesData, heading: "Top 100 memes" });
    setLoading(false);
    props.history.push(`/meme/${ props.match.params.id }`);
  };

  const submit = e => {
    e.preventDefault();
    imageExists(url, function(exists) {
      if(exists) {
        submitToApi({name, caption, url});
        setName("");
        setCaption("");
        setUrl("");
        setError("");
      } else {
        setError("No image found for this url!")
      }
    });
  };

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeCaption = e => {
    setCaption(e.target.value);
  };
  const onChangeUrl = e => {
    setUrl(e.target.value);
  };

  const unsetError = () => {
    setError("");
  };

  if (!name) {
    return <Spinner />;
  }

  return (
      <>
      <Link to={`/meme/${props.match.params.id}`} className="btn btn-dark btn-sm mb-4" style={{display: "inline"}}>
        <i className="fas fa-arrow-left" />  Go Back
      </Link>
        <div className="card card-body mt-4 mb-4 p-4">
        <h1 className="display-4 text-center">
            <i className="fab fa-meetup" /> Edit Meme
        </h1>
        <p className="lead text-center">Enter all fields!</p>
        <form onSubmit={submit}>
            {
            error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{ error }</strong>
                <button type="button" className="close" data-dismiss="alert" onClick={unsetError}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
            }
            <div className="form-group">
                <label>Creator name</label>
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Creator name"
                name="name"
                value={name}
                onChange={onChangeName}
                required
                disabled
            />
            </div>
            <div className="form-group">
            <label>Meme caption</label>
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Meme caption"
                name="caption"
                value={caption}
                onChange={onChangeCaption}
                required
            />
            </div>
            <div className="form-group">
            <label>Meme URL</label>
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Meme URL"
                name="url"
                value={url}
                onChange={onChangeUrl}
                required
            />
            </div>
            <button className="btn btn-primary btn-lg btn-block mb-5" type="submit" disabled={loading}>
            {
                loading ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div> 
                ) : (
                <span className="mr-2">Submit</span>
                )
            }
            </button>
        </form>
        </div>
    </>
  );
};

export default EditMeme;
