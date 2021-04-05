import React, { useEffect, useState } from "react";
import { getBankDetails } from "../../apiCalls";
import BankTable from "../BankTable/BankTable";

function BankList() {
  const [allBanks, setAllBanks] = useState([]);
  const [currentCity, setcurrentCity] = useState("MUMBAI");
  const [currentQuery, setcurrentQuery] = useState("");

  const [columns, setColumns] = useState([
    { id: "favourite", label: "Mark Fav" },
    { id: "bank_id", label: "ID" },
    { id: "bank_name", label: "Name" },
    { id: "ifsc", label: "IFSC" },
    {
      id: "branch",
      label: "Branch",

      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "district",
      label: "District",

      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "city",
      label: "City",

      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "state",
      label: "State",

      align: "right",
      format: (value) => value.toFixed(2),
    },
  ]);

  useEffect(() => {
    const getBanks = async () => {
      let cachedBanks = localStorage.getItem("banks_" + currentCity);
      if (cachedBanks) {
        setAllBanks(JSON.parse(cachedBanks));
      } else {
        const banks = await getBankDetails(currentCity);
        let _banks = banks.map((b) => ({ ...b, favourite: false }));
        localStorage.setItem("banks_" + currentCity, JSON.stringify(_banks));
        setAllBanks(_banks);
      }
    };
    if (currentCity !== "") getBanks();
  }, [currentCity]);

  const updateCachedData = (e, ifsc) => {
    let _banks = [...allBanks];
    let idx = _banks.findIndex((b) => b.ifsc === ifsc);
    _banks[idx].favourite = e.target.checked;
    localStorage.setItem("banks_" + currentCity, JSON.stringify(_banks));
    setAllBanks(_banks);
  };

  return (
    <div className="banklist">
      {/* SEARCH HEADER */}
      <div className="banklist__header">
        <select
          value={currentCity}
          onChange={(e) => setcurrentCity(e.target.value)}
        >
          <option value="MUMBAI">Mumbai</option>
          <option value="DELHI">Delhi</option>
          <option value="CHENNAI">Chennai</option>
          <option value="PUNE">Pune</option>
          <option value="KOLKATA">Kolkata</option>
        </select>
        <input
          type="text"
          value={currentQuery}
          placeholder="Search by bank name"
          onChange={(e) => setcurrentQuery(e.target.value)}
        />
      </div>

      {/* BANK DETAILS */}
      <BankTable
        columns={columns}
        allBanks={allBanks}
        rowsPerPageList={[10, 25, 100]}
        currentQuery={currentQuery}
        updateCachedData={updateCachedData}
      />
    </div>
  );
}

export default BankList;
