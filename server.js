//Install express server
const express = require('express');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/xttreme-frontend'));

app.all('*', (req,res) => {

res.status(200).sendFile(__dirname+'/dist/xttreme-frontend/index.html');
});

const port = process.env.PORT || 8080;

// Start the app by listening on the default Heroku port
app.listen(port, () => console.log(`Application now running on port ${port}`));
