export default function() {
	switch (this.order) {
		case 'alpha':
			this.workingList.sort((a, b) => a.name.localeCompare(b.name))
			break
		case 'zeta':
			this.workingList.sort((a, b) => b.name.localeCompare(a.name))
			break
		case 'xphigh':
			this.workingList.sort((a, b) => a.experience - b.experience)
			break
		case 'xplow':
			this.workingList.sort((a, b) => b.experience - a.experience)
			break
	}
	return this
}