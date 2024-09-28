import axios from "axios";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("Request body: ", body);

  try {
    const response = await axios.post(
      "https://www.ipqualityscore.com/api/json/url/QTVYe6oqkEPrdLoJ1HBYUfND4aVkMpPs/",
      body
    );

    const result = response.data; // Get the data from the response

    return {
      unsafe: result.unsafe || false, // Return unsafe status
      message: result.message || "Success", // Optional message for the response
      // Add more fields if needed
    };
  } catch (error) {
    console.error("API Error: ", error);

    return {
      error: "Failed to check URL",
    };
  }
});
