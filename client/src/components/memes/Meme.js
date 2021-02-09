import React from 'react';
import { Link } from 'react-router-dom';

const Meme = props => {
  const { meme } = props;

  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <p className="card-text">
            <strong>
              <i className="fas fa-user" /> Creator
            </strong>
            : {meme.name}
            <br />
            <strong>
              <i className="fas fa-compact-disc" /> Caption
            </strong>
            : {meme.caption}
          </p>
          <Link to={`meme/${meme.id}`}>
            <img src={meme.url} className="img-fluid" />
          </Link>
          <Link
            to={`meme/${meme.id}`}
            className="btn btn-dark btn-block"
          >
            <i className="fas fa-chevron-right" /> View Full Meme
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Meme;
