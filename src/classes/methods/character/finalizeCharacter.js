export default function(userId = ``) {
	if (!this.meta.created) {
		this.meta.created = new Date()
	}
this.meta.user = userId
this.meta.modified = new Date()
}