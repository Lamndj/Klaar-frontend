import axios from "axios";

export const getBankDetails = async (city) => {
  const response = await axios.get(
    `https://vast-shore-74260.herokuapp.com/banks?city=${city}`
  );
  console.log(response);
  return response.data;
};
