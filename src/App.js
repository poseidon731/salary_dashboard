import React, { useEffect, useState } from "react";
import getDataForAddress from "./modules/getDataForAddress";
import "./App.css";

function App() {
  const [balance, setBalance] = useState();
  const [totalReward, setTotalReward] = useState();
  const [nextPayoutReward, setNextPayoutReward] = useState();
  const [totalHolder, setTotalHolder] = useState();
  const [loading, setLoding] = useState(true);
  const [address, setAddress] = useState();

  const getData = async (address) => {
    const data = await getDataForAddress(address);
    setBalance(data.balance.toFixed(2));
    setTotalReward((data.rewards * data.cakeData.price).toFixed(5));
    setNextPayoutReward((data.nextRewards * data.cakeData.price).toFixed(8));
    setTotalHolder((data.totalDistributed * data.cakeData.price).toFixed(5));
    if (data) {
      setLoding(false);
    }
  };

  const handleAddress = (e) => {
    if(!loading) {
      setLoding(true)
    }
    if (e.key === "Enter") {
      setAddress(e.target.value);
    }
  };

  useEffect(() => {
    if(address) {
      getData(address);
    }
  }, [address]);

  return (
    <div className="main_page">
      <div className="container py-5">
        <div className="title-panel d-flex justify-content-center">
          <h1 className="m-0 text-center text-white pb-2 dashboard-title d-flex align-items-center">
            <img src="favicon.ico" alt="logo" />
            Salary Dashboard
          </h1>
        </div>
        <input
          type="text"
          className="form-control input-address my-3 mx-auto"
          onKeyPress={(e) => handleAddress(e)}
          placeholder="Please enter your address..."
        />
        <div className="data-panel mx-auto p-4 pb-0">
          <div className="data-field py-2">
            <h2 className="data-title text-center">Total Rewards Paid Out</h2>
            <p className="data-value text-center">
              {loading ? "....." : totalReward + " USDT"}
            </p>
          </div>
          <div className="data-field py-2">
            <h2 className="data-title text-center">Your SLR Holdings</h2>
            <p className="data-value text-center">
              {loading ? "....." : totalHolder + " SLR"}
            </p>
          </div>
          <div className="data-field py-2">
            <h2 className="data-title text-center">SLR Chart</h2>
            <p className="data-value text-center">
              {loading ? "....." : "....."}
            </p>
          </div>
          <div className="data-field d-flex py-2">
            <div className="data-field-span flex-fill">
              <h2 className="data-title text-center">Your Rewards in Total</h2>
              <p className="data-value text-center">
                {loading ? "....." : "....."}
              </p>
            </div>
            <div className="data-field-span flex-fill">
              <h2 className="data-title text-center">24h Daily Volumn</h2>
              <p className="data-value text-center">
                {loading ? "....." : "....."}
              </p>
            </div>
          </div>
          <div className="data-field d-flex py-2">
            <div className="data-field-span flex-fill">
              <h2 className="data-title text-center">Last Payout Time</h2>
              <p className="data-value text-center">
                {loading ? "....." : "....."}
              </p>
            </div>
            <div className="data-field-span flex-fill">
              <h2 className="data-title text-center">Payout loading</h2>
              <p className="data-value text-center">
                {loading ? "....." : "....."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
