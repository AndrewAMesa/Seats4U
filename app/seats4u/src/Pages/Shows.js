import React from 'react';

const Shows = () => {
  const [token, setVal] = React.useState();
  const change = event => {
    const newvalue = event.target.value
    setVal(event.target.value)
  }

  return (
    <div className="Shows">
      <h1>Shows</h1>
      <button className='listShows' data-testid="listShows" onClick={(e) => listShows()} >List Shows</button>
      <button className='deleteShow' data-testid="deleteShow" onClick={(e) => deleteShow()} >Delete Show</button>
      <input onChange={change} value={token} placeholder='type token here' />

    </div>

  );
};

function listShows() {
}

function deleteShow() {
}

export default Shows;