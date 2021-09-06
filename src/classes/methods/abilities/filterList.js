export default function() {
	this.close()
	if (this.cost) {
		this.visibleList = this.displayList.filter((a) => a.experience === this.cost)
	} else {
		this.visibleList = [...this.displayList]
	}
	if (this.status === 'yes') {
		this.visibleList = this.visibleList.filter((a) => a.quantity > 0)
	} else if (this.status === 'no') {
		this.visibleList = this.visibleList.filter((a) => a.quantity === 0)
	}
	this.sortList()
	return this
}