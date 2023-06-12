import { getDros, runFight, getOdds } from "./Utility";
import { useEffect, useState, useRef } from "react";
import { GiFist } from "react-icons/gi";
import Card from "./components/Card";
import Ring from "./components/Ring";
const { ethers } = require("ethers");

function Home() {
  const [drosList, setDrosList] = useState();
  const [bet, setBet] = useState(1);
  const [betAmount, setBetAmount] = useState(0);
  const [winner, setWinner] = useState("");
  const [odds1, setOdds1] = useState(1);
  const [odds2, setOdds2] = useState(1);
  const ringRef = useRef();
  let fetched = false;
  const [dros1, setDros1] = useState();
  const [dros2, setDros2] = useState();

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
        res1.push(res[i]);
      }
      setDrosList(res1);
      const odds = getOdds(res[0], res[1]);
      setOdds1(odds[0]);
      setOdds2(odds[1]);
      const first = Math.round(Math.random() * 99);
      let second = Math.round(Math.random() * 99);
      while (first == second) second = Math.round(Math.random() * 99);
      setDros1(res[first]);
      setDros2(res[second]);
      ringRef.current.loadDros(res[first], res[second]);
      return res;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined")
      window.ethereum.request({ method: "eth_requestAccounts" });
  };
  const execute = async () => {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = [
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_favoriteNumber",
            type: "uint256",
          },
        ],
        name: "addPerson",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        name: "nameToFavoriteNumber",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "people",
        outputs: [
          {
            internalType: "uint256",
            name: "favoriteNumber",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "retrieve",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_favoriteNumber",
            type: "uint256",
          },
        ],
        name: "store",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    await contract.store(42);
  };

  const castBet = async () => {
    execute();
    // console.log((bet == 1 ? "RED" : "BLUE") + " " + betAmount + " " + winner);
  };

  useEffect(() => {
    // if (winner == bet) {
    // }
  }, [winner]);

  const getDrosShop = () => {
    const cards = [];
    for (let i = 0; i < 100; i = i + 2) {
      cards.push(
        <button
          id="shopdrosbutton"
          onClick={() => {
            setDros1(drosList[i]);
            setOdds1(getOdds(drosList[i], dros2)[0]);
          }}
        >
          {" "}
          <Card
            dros={drosList ? drosList[i] : undefined}
            team="red"
          ></Card>{" "}
        </button>
      );
      cards.push(
        <button
          id="shopdrosbutton"
          onClick={() => {
            setDros2(drosList[i + 1]);
            setOdds2(getOdds(dros1, drosList[i + 1])[1]);
          }}
        >
          {" "}
          <Card
            dros={drosList ? drosList[i + 1] : undefined}
            team="blue"
          ></Card>{" "}
        </button>
      );
    }
    return cards;
  };

  return (
    <div className="home-parent">
      <div className="home-wrapper">
        <div className="home-container">
          <div className="panel arena-container">
            <div className="arena-controls">
              <button
                onClick={() => {
                  ringRef.current.loadDros(dros1, dros2);
                  ringRef.current.startMatch();
                }}
              >
                <GiFist style={{ width: "5rem", height: "5rem" }}></GiFist>
              </button>
            </div>
            <div className="arena-ring">
              <Ring ref={ringRef} setwinner={setWinner}></Ring>
            </div>
          </div>
          {/* <div className="panel profile-container">
            <div className="profile-wrapper">
              <div>
                <button
                  onClick={connectWallet}
                  style={{ height: "3rem", marginLeft: ".5rem" }}
                >
                  Connect
                </button>
                <h1>Profile</h1>
                <h2>#12345abcde12345abcde</h2>
              </div>
              <div>
                <h1 className="profile-eth-counter">12eth</h1>
              </div>
            </div>
          </div> */}
          <div className="panel bet-container">
            <h1>Odds</h1>
            <div style={{ flexDirection: "row", display: "flex" }}>
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
              <button
                onClick={connectWallet}
                style={{ height: "3rem", marginLeft: ".5rem" }}
              >
                Connect
              </button>
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
            <div className="card-holder">
              <Card dros={drosList ? dros1 : undefined} team="red"></Card>
              <Card dros={drosList ? dros2 : undefined} team="blue"></Card>
            </div>
            <h1 className="vs-text">VS</h1>
          </div>

          <div className="panel shop-container">
            <h1> Drosophila </h1>
            <h1> Shop </h1>
            <div className="card-holder">{getDrosShop()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
