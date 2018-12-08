// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // comment route loads blog.html
  app.get("/comment", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/comment.html"));
  });

  // authors route loads author-manager.html
  app.get("/author", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

};
