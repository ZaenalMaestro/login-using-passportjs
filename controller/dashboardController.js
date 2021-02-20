const dashboardController = {
  index: (req, res) => {
    res.render("index.ejs", {
      name: "Zaenal"
    })
  }
}

module.exports = dashboardController