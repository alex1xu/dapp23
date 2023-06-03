function Card(props) {
  return (
    <div className={"card-wrapper " + props?.team}>
      <div className="card-container">
        <div className="eth-tab">
          <p style={{ lineHeight: 0 }}>eth #</p>
        </div>
        <img src="sample.png" className="card-NFT-wrapper"></img>
        <h2>NFT Name/Number</h2>
        <div className="stat-container">
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>#</b>
            </p>
            <p>Attack</p>
          </div>
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>#</b>
            </p>
            <p>Attack</p>
          </div>
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>#</b>
            </p>
            <p>Attack</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
