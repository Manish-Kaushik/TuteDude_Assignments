const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const pagesDir = path.join(__dirname, "pages");

const pageFiles = {
  "/": "home.html",
  "/home": "home.html",
  "/about": "about.html",
  "/contact": "contact.html"
};

const server = http.createServer((req, res) => {
  const fileName = pageFiles[req.url];

  if (!fileName) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>404 - Page Not Found</title></head>
      <body style="font-family:Arial;padding:40px;text-align:center">
        <h1>404</h1>
        <p>Page not found.</p>
        <a href="/home">Go to Home</a>
      </body>
      </html>
    `);
    return;
  }

  const filePath = path.join(pagesDir, fileName);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>500 - Server Error</h1>");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Routes: /home  /about  /contact");
});
