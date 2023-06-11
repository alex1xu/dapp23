function Card(props) {
  return (
    <div className={"card-wrapper " + props?.team}>
      <div className="card-container">
        <div className="rarity-tab">
          {props?.dros?.score <= 100 ? (
            <h2 className="glow-normal">Wild Type</h2>
          ) : props?.dros?.score <= 120 ? (
            <h2 className="glow-rare">Mutated</h2>
          ) : props?.dros?.score <= 200 ? (
            <h2 className="glow-legendary">Evolved</h2>
          ) : (
            <h2 className="glow-legendary"></h2>
          )}
        </div>
        <img
          src={props?.dros ? props?.dros?.image : "placeholder.png"}
          className={
            "card-NFT-wrapper" + (props?.team == "red" ? " reflect" : "")
          }
        ></img>
        <h2>
          NO. 00
          {String(props?.dros?.name).padStart(2, "0")}
        </h2>
        <div className="stat-container">
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>{props?.dros?.attributes.at(-1)?.strength}</b>
            </p>
            <p>Strength</p>
          </div>
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>{props?.dros?.attributes.at(-1)?.health}</b>
            </p>
            <p>Health</p>
          </div>
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>{props?.dros?.attributes.at(-1)?.speed}</b>
            </p>
            <p>Speed</p>
          </div>
        </div>
        <div className="stat-container">
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>{props?.dros?.attributes.at(-1)?.critical_rate}</b>
            </p>
            <p>Critical</p>
          </div>
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>{props?.dros?.attributes.at(-1)?.defense}</b>
            </p>
            <p>Defense</p>
          </div>
          <div>
            <p style={{ lineHeight: 0 }}>
              <b>{props?.dros?.attributes.at(-1)?.stamina}</b>
            </p>
            <p>Stamina</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
