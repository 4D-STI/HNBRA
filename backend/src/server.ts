import app from "./app";

const port = process.env.API_PORT || 3001;

app.get('/', (req, res) => {
    const response = {
        msg: "Hello, world!"
    }

    res.json(response)

});

app.listen(port, () => {
    console.log(
        `Pepe já tirei a vela!! \r
            Server running on port ${port}`
    );
});

