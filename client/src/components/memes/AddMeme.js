import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context";
import { serverUrl } from "../../context";

const AddMeme = () => {
  const [state, setState] = useContext(Context);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [memedata, setMemedata] = useState("");

  // useEffect(async () => {
  //   let res = await axios.post(`${ serverUrl }/memes`, memeData);
  //   res = await axios.get(`${ serverUrl }/memes`);
  //   setState({ meme_list: res.data, heading: "Top 100 memes" });
  // }, [memeData]);

  const submitToApi = async (data) => {
    let res = await axios.post(`${ serverUrl }/memes`, data);
    res = await axios.get(`${ serverUrl }/memes`);
    setState({ memeList: res.data, heading: "Top 100 memes" });
  };

  // The "callback" argument is called with either true or false
  // depending on whether the image at "url" exists or not.
  function imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }

  // Sample usage
  var imageUrl = 'http://www.google.com/images/srpr/nav_logo14.png';
  imageExists(imageUrl, function(exists) {
    console.log('RESULT: url=' + imageUrl + ', exists=' + exists);
  });

  const submit = e => {
    e.preventDefault();
    // console.log(name, caption, url);
    submitToApi({name, caption, url});
    // setMemedata({name, caption, url});
    // console.log(memedata);
    setName("");
    setCaption("");
    setUrl("");
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

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Create a Meme
      </h1>
      <p className="lead text-center">Showcase your creativity!</p>
      <form onSubmit={submit}>
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
            placeholder="Meme url"
            name="url"
            value={url}
            onChange={onChangeUrl}
            required
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMeme;
