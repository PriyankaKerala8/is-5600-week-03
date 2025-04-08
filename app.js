const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

// 1. Responds with plain text
function respondText(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hi');
}

// 2. Responds with JSON
function respondJson(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }));
}

// 3. Responds with echo transformations
function respondEcho(req, res) {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const input = urlObj.searchParams.get('input') || '';

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    normal: input,
    shouty: input.toUpperCase(),
    charCount: input.length,
    backwards: input.split('').reverse().join('')
  }));
}

// 4. Responds with 404
function respondNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

// ✅ Create server with routing
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  console.log("Request URL:", pathname);

  if (pathname === '/') return respondText(req, res);
  if (pathname === '/json') return respondJson(req, res);
  if (pathname.startsWith('/echo')) return respondEcho(req, res);

  respondNotFound(req, res);
});

// ✅ Start server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
