import Axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL + "api";

const http = Axios.create({
  baseURL
});

export default http;
