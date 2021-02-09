import React, { useContext } from "react";
import { Context } from "../../context";
import Spinner from "../layout/Spinner";
import Meme from "./Meme";

const Memes = () => {
  const [state] = useContext(Context);
  const { memeList, heading } = state;

  if (memeList === undefined || memeList.length === 0) {
    console.log("memelist", memeList)
    return <Spinner />;
  } else {
    return (
      <>
        <h3 className="text-center mb-4">{heading}</h3>
        <div className="row">
          {memeList.map(meme => (
            <Meme key={meme.id} meme={meme} />
          ))}
        </div>
      </>
    );
  }
};

export default Memes;
