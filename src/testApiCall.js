import axios from "axios";

const fetchUniversities = async (search) => {
  try {
    console.log(`Fetching universities with search term: ${search}`);
    const response = await axios.get(
      `http://universities.hipolabs.com/search?name=${search}`
    );

    // Log the full response
    console.log("Full API response:", response);

    // Log the response data
    console.log("API response data:", response.data);

    // Check if the response data is an array
    if (Array.isArray(response.data)) {
      const filtered = response.data.map((uni) => uni.name);
      console.log("Filtered universities:", filtered);
    } else {
      console.log("Response data is not an array:", response.data);
    }
  } catch (error) {
    console.error("Error fetching universities:", error);
  }
};

// Example usage
const search = "ben";
fetchUniversities(search);
