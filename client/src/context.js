import React, { useState, useEffect } from "react";
import axios from "axios";

export const Context = React.createContext();
// export const serverUrl = `https://cors-anywhere.herokuapp.com/http://ec2-13-58-184-139.us-east-2.compute.amazonaws.com:3000`;
export const serverUrl = `http://localhost:5000`;

export function ContextController({ children }) {
  let intialState = {
    memeList: [],
    heading: ""
  };

  const [state, setState] = useState(intialState);
  console.log("contextstate", state)

  useEffect(() => {
    axios.get(`${ serverUrl }/memes`)
      .then(res => {
        console.log("contextres", res);
        setState({
          memeList: res.data,
          heading: "Top 100 Memes"
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
}
