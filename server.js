const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.sendFile("");
});

app.listen(8080, () => {
    console.log("server started on port : " +  8080);
})