//get login page
function getLogin(req, res, next) {
  res.render("index", {
    title: "Login - Chat_App",
  });
}

module.exports = {
  getLogin,
};
