import axios from "axios";

async function getCommentsRequest(page: number) {
    const {data} = await axios.get("/api/comments", {params: {page}});
    console.log("/api/comments REQUEST, page: ", page);
    return data;
}

export default getCommentsRequest;
