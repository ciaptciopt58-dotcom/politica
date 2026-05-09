const http = require("http")
const fs = require("fs")
const path = require("path")

const root = process.cwd()
const port = Number(process.env.PORT || 5123)

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
}

function safePath(urlPath) {
  let u = urlPath.split("?")[0]
  if (u === "/" || u === "") u = "/index.html"
  u = decodeURIComponent(u)
  const file = path.join(root, u)
  if (!file.startsWith(root)) return null
  return file
}

http
  .createServer((req, res) => {
    const file = safePath(req.url || "/")
    if (!file) {
      res.statusCode = 403
      res.end("Forbidden")
      return
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.statusCode = 404
        res.end("Not Found")
        return
      }
      res.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream")
      res.end(data)
    })
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`READY http://127.0.0.1:${port}/`)
  })

