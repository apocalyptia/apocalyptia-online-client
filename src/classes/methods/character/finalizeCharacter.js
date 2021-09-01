export default function(userId = ``) {
	if (!this.meta.created) {
		this.meta.created = new Date()
	}
	this.description.player = {
		value: this.meta.user
	}
	this.meta.user = userId
	this.meta.modified = new Date()
}