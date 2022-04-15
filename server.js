const express = require('express');
const app = express();


const port = process.env.PORT || 5000

app.use(express.static('pub'))


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/pub/landing.html')
});

app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});