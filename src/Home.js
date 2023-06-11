import { getDros, runFight, getOdds } from "./Utility";
import { useEffect, useState } from "react";
import { GiFist } from "react-icons/gi";
import Card from "./components/Card";
import { ethers } from "ethers";

function Home() {
  const [drosList, setDrosList] = useState([]);

  //12-52: get user wallet data

  const fetchData = async () => {
    return await getDros().then((res) => {
      setDrosList(res);
      return res;
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  //helper method to get user collection
  const getData = (_account) => {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    fetch(`https://api.opensea.io/api/v1/collections?asset_owner=${_account}&offset=0&limit=300`, options)
    .then(response => response.json())
    .then(response => {setData(response);
       console.log(response);
      })
    .catch(err => console.error(err));
  };

  //connect user address to app using MetaMask
  const [account, setAccount] = useState("");
  const [data, setData] = useState([]);

  const connect = async() => {
    //check if metamask is installed
    if (window.ethereum) {
      console.log('connected to ethereum')
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // MetaMask requires requesting permission to connect users accounts
      let res = await provider.send("eth_requestAccounts", []);
     //console.log(res);
      setAccount(res[0]);
      getData(res[0]);
    } else {
      console.log('not connected to ethereum, suggest adding metamask chrome extension')
    }
  };



  return (
    <div className="home-parent">
      <div className="home-wrapper">
        <div className="home-container">
          <div className="connect-wrapper">
            <button 
              onClick={connect} style={{width: "145px", height: "45px"}}> Connect Wallet 
            </button>
          </div>
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
