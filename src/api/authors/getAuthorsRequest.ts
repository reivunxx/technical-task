import axios from "axios";

async function getAuthorsRequest() {
    const {data} = await axios.get("/api/authors");
    console.log("/api/authors REQUEST");
    return data;
}

export default getAuthorsRequest;
