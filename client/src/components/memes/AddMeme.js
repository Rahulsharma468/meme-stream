import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context";
import { imageExists, serverUrl } from "../../utility";

const AddMeme = () => {
  const [state, setState] = useContext(Context);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitToApi = async (data) => {
    setLoading(true);
    let res = await axios.post(`${ serverUrl }/memes`, data);
    res = await axios.get(`${ serverUrl }/memes`);
    setState({ memeList: res.data, heading: "Top 100 memes" });
    setLoading(false);
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

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fab fa-meetup" /> XMEME - Meme Stream
      </h1>
      <p className="lead text-center">Show your meme skills</p>
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
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Creator name"
            name="name"
            value={name}
            onChange={onChangeName}
            required
          />
        </div>
        <div className="form-group">
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
  );
};

export default AddMeme;
