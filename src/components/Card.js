import React from 'react';
import '../Style/Card.css';
import memeData from '../Assets/memesData';

export default function Card() {
  const memes = memeData.data.memes;
  const [imgURL, setImgURL] = React.useState(memes[5].url);

  function memeImgHandler() {
    const randumIndex = Math.floor(Math.random(memes.length) * memes.length);
    console.log(randumIndex);
    setImgURL(memes[randumIndex].url);
  }
  const bgURL = {
    background: `url(${imgURL}) `,
  };

  return (
    <div className="card">
      <div className="card--inputs">
        <input
          id="topText"
          type="text"
          className="input-text"
          placeholder="Shut up"
        />

        <input
          id="botomText"
          type="text"
          className="input-text"
          placeholder="and take my money"
        />
      </div>
      <button onClick={memeImgHandler} className="getImg-btn">
        Get a new meme image 🖼
      </button>
      <div className="memeImg" style={bgURL}>
        <h1 className="img-text img-text-top">Shut up</h1>
        <h1 className="img-text img-text-botom">and take my money</h1>
      </div>
    </div>
  );
}
