var axios = require("axios")

module.exports = async(req, res) => {

    var response = await axios.get('http://newsapi.org/v2/everything?q=argentina&from=2020-07-28&sortBy=publishedAt&apiKey=336ffcfff4c34850a181f811949d5786')

    res.json({
        response: response.data,
        text: 'enano marica',
        body: req.body,
        query: req.query,
        cookies: req.cookies,
    })
}