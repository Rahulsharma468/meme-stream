import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "./utility";

export const Context = React.createContext();

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
