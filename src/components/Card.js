function Card(props) {
  return (
    <div className={"card-wrapper " + props?.team}>
      <div className="card-container">
        <div className="eth-tab">
          <p style={{ lineHeight: 0 }}>eth #</p>
        </div>
        <img
          src="placeholder.png"
          className={
            "card-NFT-wrapper" + (props?.team == "red" ? " reflect" : "")
          }
        ></img>
        <h2>#12345</h2>
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
            <p>Health</p>
          </div>
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>#</b>
            </p>
            <p>Speed</p>
          </div>
        </div>
        <div className="stat-container">
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>#</b>
            </p>
            <p>Crit %</p>
          </div>
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>#</b>
            </p>
            <p>Defense</p>
          </div>
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>#</b>
            </p>
            <p>Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
