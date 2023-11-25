import Fly from "flyio"
import config from "@/config/index.js";

const fly = new Fly()
fly.config.baseURL = config.baseURL
fly.interceptors.response.use(
  (res) => {
    return res.data.data
  },
  (err) => {
    return err
  }
)

export default fly
