import React from 'react';

const Home = () => {
  const [token, setVal] = React.useState();
  const change = event => {
    const newvalue = event.target.value
    setVal(event.target.value)
  }

  return (
    <div className="Home">
      <h1>Home</h1>
      <button className='createVenue' data-testid="createVenue" onClick={(e) => createVenue()} >Create Venue</button>
      <button className='deleteVenue' data-testid="deleteVenue" onClick={(e) => deleteVenue()} >Delete Venue</button>
      <input onChange={change} value={token} placeholder='type token here' />

    </div>
  );
};

function createVenue() {
}

function deleteVenue() {
}

export default Home;