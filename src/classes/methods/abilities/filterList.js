export default function(currentXP) {
	console.log(`currentXP = ${currentXP}`)
	if (this.cost >= 3 && this.cost <= 30) {
		this.workingList = this.completeList.filter((a) => a.experience === this.cost)
	} else if (this.cost === 'all') {
		this.workingList = [...this.completeList]
	} else if (this.cost === 'valid') {
		this.workingList = this.completeList.filter((a) => a.experience <= currentXP)
	}
	if (this.status === 'yes') {
		this.workingList = this.workingList.filter((a) => a.quantity > 0)
	} else if (this.status === 'no') {
		this.workingList = this.workingList.filter((a) => a.quantity === 0)
	}
	this.sortList()
	return this
}