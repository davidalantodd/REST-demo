const app = require('./src/app');
const port = 3000;
const { db } = require("./db/connection")

// use app.listen to run and listen for incoming requests - update to be async and sync database
app.listen(port, async () => {
    await db.sync()
    console.log(`Server listening on port: ${port}`);
})