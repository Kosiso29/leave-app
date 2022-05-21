import axios from "axios";

const instance = axios.create({
    baseURL: "http://accrete-001-site1.itempurl.com/api/v1"
});

export default instance;