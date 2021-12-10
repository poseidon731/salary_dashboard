import Web3 from "web3";
import React, { useEffect, useState } from "react";
import getDataForAddress from "./modules/getDataForAddress";
import { provider } from "./modules/config.json";
import { useSnackbar } from "notistack";
import NumberFormat from "react-number-format";
import "./App.css";

const web3 = new Web3(provider);

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();
  const [paidUSDT, setPaidUSDT] = useState();
  const [pendingUSDT, setPendingUSDT] = useState();
  const [totalPaidUSDT, setTotalPaidUSDT] = useState();
  const [loading, setLoding] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const getData = async (address) => {
    const data = await getDataForAddress(address);
    setBalance(data.balance.toFixed(2));
    setPaidUSDT(data.accountInfo.paidUSDT.toFixed(5));
    setPendingUSDT(data.accountInfo.pendingUSDT.toFixed(5));
    setTotalPaidUSDT(data.totalPaidUSDT.toFixed(5));
    if (data) {
      setLoding(false);
    }
  };

  const handleKeyPress = (e) => {
    if (!loading) {
      setLoding(true);
    }
    if (e.key === "Enter") {
      handleAddress();
    }
  };

  const handleAddress = () => {
    if (address) {
      if (web3.utils.isAddress(address)) {
        getData(address);
      } else {
        const variant = "error";
        enqueueSnackbar("Invalid Address", { variant });
      }
    }
  };

  return (
    <div className="main_page">
      <div className="container py-5">
        <div className="title-panel d-flex justify-content-center">
          <h1 className="m-0 text-center text-white pb-2 dashboard-title d-flex align-items-center">
            <img src="favicon.ico" alt="logo" />
            Salary Dashboard
          </h1>
        </div>
        <div className="input-panel d-flex my-3 mx-auto">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control input-address flex-fill"
            onKeyPress={(e) => handleKeyPress(e)}
            placeholder="Please enter your address..."
          />
          <button className="btn input-btn ms-2" onClick={handleAddress}>
            CLICK HERE
          </button>
        </div>
        <div className="data-panel mx-auto px-4">
          <div className="data-field py-2">
            <h2 className="data-title text-center">Your SLR Holdings</h2>
            <p className="data-value text-center">
              {loading ? (
                "....."
              ) : (
                <NumberFormat
                  value={balance}
                  thousandSeparator={true}
                  displayType={"text"}
                  suffix=" SLR"
                />
              )}
            </p>
          </div>
          <div className="data-field py-2">
            <h2 className="data-title text-center">Your USDT Paid</h2>
            <p className="data-value text-center">
              {loading ? (
                "....."
              ) : (
                <NumberFormat
                  thousandSeparator={true}
                  value={pendingUSDT}
                  displayType={"text"}
                  suffix=" USDT"
                />
              )}
            </p>
          </div>
          <div className="data-field py-2">
            <h2 className="data-title text-center">Your USDT (Pending)</h2>
            <p className="data-value text-center">
              {loading ? (
                "....."
              ) : (
                <NumberFormat
                  thousandSeparator={true}
                  value={paidUSDT}
                  displayType={"text"}
                  suffix=" USDT"
                />
              )}
            </p>
          </div>
          <div className="data-field py-2">
            <h2 className="data-title text-center">
              Total USDT Paid (All Holders)
            </h2>
            <p className="data-value text-center">
              {loading ? (
                "....."
              ) : (
                <NumberFormat
                  thousandSeparator={true}
                  value={totalPaidUSDT}
                  displayType={"text"}
                  suffix=" USDT"
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
