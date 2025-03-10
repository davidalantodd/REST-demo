const app = require('./src/app');
const port = 3000;

// use app.listen to run and listen for incoming requests
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})