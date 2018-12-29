const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
	butter.post.list({page: 1, page_size: 10})
		.then(res => console.log(res))
})

router.get('/p/:id', (req, res, next) => {
	
})

module.exports = router