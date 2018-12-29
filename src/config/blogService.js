const butter = require('./cfg')

class butterService {

	constructor(req, res) {
		this.req = req || null
		this.res = res || null
	}


	async renderPosts(id, pgSize) {
		const pageSize = pgSize || 10
		const page = id || 1
		return await butter.post.list({page_size: pageSize, page: page})
			.then(resp => resp.data.data[0])
			.catch(err => console.error(err))
	}

	async renderSlug(slug) {
		const slugName = slug
		return await butter.post.retrieve(slugName)
			.then(resp => resp.data.data[0])
			.catch(err => console.error(err))
	} 
}

module.exports = butterService