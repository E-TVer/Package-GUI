import axios from 'axios'
export default {
  async search (keyword: string) {
    return await axios.get('https://api.npms.io/v2/search?size=1&q=' + keyword)
  }
}
