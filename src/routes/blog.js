const express = require('express')
const router = express.Router()

const butterService = require('../config/blogService')
const butter = new butterService()

router.get('/', async (req, res, next) => {
	try {
		const butterPost = await butter.renderPosts()
		res.json(butterPost)
	} catch (err) {
		next(err)
	}
})

router.get('/:slug', async (req, res, next) => {
	const getSlug = req.params.slug || null
	const slugError = 'slug was\'nt provided'
	try {
		!getSlug && throw new Error(slugError)
		const butterPost = await butter.renderSlug(getSlug)
		res.json(butterPost)
	}
	catch () {
		next(slugError)
	}

})

module.exports = router