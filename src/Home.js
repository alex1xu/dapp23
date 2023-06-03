import { getDros, runFight, getOdds } from "./Utility";
import { useEffect, useState } from "react";
import { GiFist } from "react-icons/gi";
import Card from "./components/Card";

function Home() {
  const [drosList, setDrosList] = useState([]);

  const fetchData = async () => {
    return await getDros().then((res) => {
      setDrosList(res);
      return res;
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-parent">
      <div className="home-wrapper">
        <div className="home-container">
          <div className="panel arena-container">
            <button
              onClick={() => {
                runFight();
              }}
            >
              <GiFist style={{ width: "5rem", height: "5rem" }}></GiFist>
            </button>
          </div>
          <div className="panel profile-container">
            <div className="profile-wrapper">
              <div>
                <h1>Profile</h1>
                <h2>###Account#Number###</h2>
              </div>
              <div>
                <h1 className="profile-eth-counter"># ETH</h1>
              </div>
            </div>
          </div>
          <div className="panel bet-container">
            <h1>Odds</h1>
          </div>
          <div className="panel matchup-container">
            <h1>Matchup</h1>
            <div className="card-holder">
              <Card dros={drosList[0]} team="red"></Card>
              <Card dros={drosList[1]} team="blue"></Card>
            </div>
            <h1 className="vs-text">VS</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
