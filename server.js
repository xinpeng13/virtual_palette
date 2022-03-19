const express = require('express');
const app = express();


const port = process.env.PORT || 5000

app.use(express.static('public'))


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/example.html')
});

app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});