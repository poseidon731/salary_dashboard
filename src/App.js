import React, { useEffect, useState } from "react";
import getDataForAddress from "./modules/getDataForAddress";
import "./App.css";

function App() {
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState();
  const [paidUSDT, setPaidUSDT] = useState();
  const [pendingUSDT, setPendingUSDT] = useState();
  const [totalPaidUSDT, setTotalPaidUSDT] = useState();
  const [loading, setLoding] = useState(true);

  const getData = async (address) => {
    const data = await getDataForAddress(address);
    setBalance(data.balance.toFixed(2));
    setPaidUSDT(data.accountInfo.paidUSDT.toFixed(5));
    setPendingUSDT(data.accountInfo.pendingUSDT.toFixed(5));
    setTotalPaidUSDT(data.totalPaidUSDT.toFixed(5))
    if (data) {
      setLoding(false);
    }
  };

  const handleAddress = (e) => {
    if (!loading) {
      setLoding(true);
    }
    if (e.key === "Enter") {
      setAddress(e.target.value);
    }
  };

  useEffect(() => {
    if (address) {
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
        <div className="data-panel mx-auto px-4">
          <div className="data-field py-2">
            <h2 className="data-title text-center">Your SLR Holdings</h2>
            <p className="data-value text-center">
              {loading ? "....." : balance + " SLR"}
            </p>
          </div>
          <div className="data-field py-2">
            <h2 className="data-title text-center">Your USDT Paid</h2>
            <p className="data-value text-center">
              {loading ? "....." : pendingUSDT + " USDT"}
            </p>
          </div>
          <div className="data-field py-2">
            <h2 className="data-title text-center">Your USDT Pending</h2>
            <p className="data-value text-center">
              {loading ? "....." : paidUSDT + " USDT"}
            </p>
          </div>
          <div className="data-field py-2">
            <h2 className="data-title text-center">
              Total Paid USDT to all Holders
            </h2>
            <p className="data-value text-center">
              {loading ? "....." : totalPaidUSDT + " USDT"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
