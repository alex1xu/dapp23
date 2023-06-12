import { getDros, runFight, getOdds } from "./Utility";
import { useEffect, useState, useRef } from "react";
import { GiFist } from "react-icons/gi";
import Card from "./components/Card";
import Ring from "./components/Ring";
import { ethers } from "ethers";

function Home() {
  const [drosList, setDrosList] = useState();
  const [bet, setBet] = useState(1);
  const [betAmount, setBetAmount] = useState(0);
  const [winner, setWinner] = useState("");
  const [odds1, setOdds1] = useState(30);
  const [odds2, setOdds2] = useState(25);
  const ringRef = useRef();
  let fetched = false;

  //12-52: get user wallet data

  //12-52: get user wallet data

  const fetchData = async () => {
    if (fetched) return;
    fetched = true;
    return await getDros().then((res) => {
      const res1 = [];
      for (let i = 0; i < 100; i++) {
        res[i].score =
          res[i].attributes.at(-1)?.strength +
          res[i].attributes.at(-1)?.health +
          res[i].attributes.at(-1)?.speed +
          res[i].attributes.at(-1)?.critical_rate +
          res[i].attributes.at(-1)?.defense +
          res[i].attributes.at(-1)?.stamina;
        res1.push(res[i])
      }
      setDrosList(res1);
      const odds = getOdds(res[0], res[1]);
      setOdds1(odds[0]);
      setOdds2(odds[1]);
      ringRef.current.loadDros(res[0], res[1]);
      return res;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //helper method to get user collection
  const getData = (_account) => {
    const options = { method: "GET", headers: { accept: "application/json" } };
    fetch(
      `https://api.opensea.io/api/v1/collections?asset_owner=${_account}&offset=0&limit=300`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  //connect user address to app using MetaMask
  const [account, setAccount] = useState("");
  const [data, setData] = useState([]);

  const connect = async () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // MetaMask requires requesting permission to connect users accounts
    let res = await provider.send("eth_requestAccounts", []);
    //console.log(res);
    setAccount(res[0]);
    getData(res[0]);
  };

  const castBet = () => {
    // put your code for transaction before match here
    console.log((bet == 1 ? "RED" : "BLUE") + " " + betAmount + " " + winner);
  };

  useEffect(() => {
    // put your code for transaction after match here
    if (winner == bet) {
    }
  }, [winner]);

  // *************************
  const getDrosShop = () => {
    const cards = [];
    for (let i = 0; i < 100; i = i+2)
    {
      cards.push(<Card dros={drosList ? drosList[i] : undefined} team="red"></Card>)
      cards.push(<Card dros={drosList ? drosList[i+1] : undefined} team="blue"></Card>)
    }

    return cards;
  }

  return (
    <div className="home-parent">
      <div className="home-wrapper">
        <div className="home-container">
          <div className="connect-wrapper">
            <button
              onClick={connect}
              style={{ width: "145px", height: "45px" }}
            >
              {" "}
              Connect Wallet
            </button>
          </div>
          <div className="panel arena-container">
            <div className="arena-controls">
              <button onClick={() => ringRef.current.startMatch()}>
                <GiFist style={{ width: "5rem", height: "5rem" }}></GiFist>
              </button>
            </div>
            <div className="arena-ring">
              <Ring ref={ringRef} setwinner={setWinner}></Ring>
            </div>
          </div>
          <div className="panel profile-container">
            <div className="profile-wrapper">
              <div>
                <h1>Profile</h1>
                <h2>#12345abcde12345abcde</h2>
              </div>
              <div>
                <h1 className="profile-eth-counter">12eth</h1>
              </div>
            </div>
          </div>
          <div className="panel bet-container">
            <h1>Odds</h1>
            <div style={{flexDirection: "row", display: "flex" }}>
              <h1 className="odds-counter">{odds1}</h1>
              <div className="toggle-button-cover">
                <div className="button r" id="button-1">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(event) => setBet(3 - bet)}
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
              <h1 className="odds-counter">{odds2}</h1>
            </div>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <input
                type="text"
                value={betAmount}
                onChange={(event) => setBetAmount(event.target.value)}
              />
              <button
                onClick={castBet}
                style={{ width: "3rem", height: "3rem", marginLeft: ".5rem" }}
              >
                Bet
              </button>
            </div>
          </div>
          <div className="panel matchup-container">
            <h1>Matchup</h1> 
            {/* **************** */}
            <div className="card-holder">
              <Card dros={drosList ? drosList[Math.round(Math.random() * 99)] : undefined} team="red"></Card>
              <Card
                dros={drosList ? drosList[Math.round(Math.random() * 99)] : undefined}
                team="blue"
              ></Card>
            </div>
            <h1 className="vs-text">VS</h1>
          </div>

          <div className="panel shop-container">
            <h1> Drosophila </h1>
            <h1> Collection</h1>
            <div className="card-holder">
              {getDrosShop()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;