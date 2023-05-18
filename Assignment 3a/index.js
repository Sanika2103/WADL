const http = require('http');
const fs = require('fs');
const mime = require('mime');

const PORT = 3000;

// styling is not important for this practical
// styling is optional
let style = `
    <style>
        h2{
            text-align:center;
            margin-top:5rem;
        }
        ul{
            list-style:none;
            width:50vw;
            margin:2rem auto;
        }
        li a{
            text-decoration:none;
            color:blue;
            display:block;
            background:#eaeaef;
            padding:1rem;
            border-radius:5px;
            margin:.5rem;
            font-size:1.2rem;
        }
        li a:hover {
            background:#ddddee;
        }
    </style>
`;

http.createServer((req, res) => {
    if (req.url == "/") {
        const publicDIR = "./public";
        const fileArr = fs.readdirSync(publicDIR)
        console.log(fileArr)

        let html = style + "<h2>Available Files</h2><ul>";
        fileArr.forEach((value) => {
            html += "<li>"
            html += `<a href="${publicDIR + "/" + value}">${value}</a>`
            html += "</li>"
        });
        html += "</ul>"

        res.setHeader("Content-Type", "text/html")
        res.end(html);

    } else {
        const filePath = "." + req.url;
        const mimeType = mime.getType(filePath);
        console.log("request: ", filePath, mimeType)
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath)
            res.setHeader('Content-type', mimeType || 'text/html');
            res.end(data)
        } else {
            res.end("Error:404")
        }
    }
}).listen(PORT, () => {
    console.log("server is running on: http://localhost:" + PORT)
});
