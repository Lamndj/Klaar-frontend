import React, { useEffect, useState } from "react";

import "./singleBank.css";

function SingleBank(props) {
  const [bankDetails, setBankDetails] = useState(null);
  const [queryIFSC, setqueryIFSC] = useState(props.match.params.bankifsc);
  const [queryCity, setqueryCity] = useState(props.match.params.bankcity);

  useEffect(() => {
    if (queryIFSC && queryCity) {
      let bankData = JSON.parse(localStorage.getItem("banks_" + queryCity));
      let singleBank = bankData.filter((bank) => bank.ifsc === queryIFSC);
      if (singleBank[0]) {
        setBankDetails(singleBank[0]);
      }
    }
  }, [queryIFSC, queryCity]);

  return (
    <div className="singleBank">
      {bankDetails && (
        <>
          <p>
            <strong>Bank Name: </strong> {bankDetails.bank_name}
          </p>
          <p>
            <strong>ID: </strong> {bankDetails.bank_id}
          </p>
          <p>
            <strong>IFSC: </strong> {bankDetails.ifsc}
          </p>
          <p>
            <strong>Branch: </strong> {bankDetails.branch}
          </p>
          <p>
            <strong>Address: </strong> {bankDetails.address}
          </p>
        </>
      )}
    </div>
  );
}

export default SingleBank;
