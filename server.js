const https = require('http')
const app = require('./src/app')

const PORT = '3000'

https.createServer(null, app).listen(PORT, (err) => {
	if (err) return err
	console.log(`Listening on port ${PORT}`)
})

process.on('unhandledRejection', error => {
	console.error(error)
	process.exit(1)
})