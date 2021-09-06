export default function() {
	this.close()
	switch (this.order) {
		case 'alpha':
			this.visibleList.sort((a, b) => a.name.localeCompare(b.name))
			break
		case 'zeta':
			this.visibleList.sort((a, b) => b.name.localeCompare(a.name))
			break
		case 'xphigh':
			this.visibleList.sort((a, b) => a.experience - b.experience)
			break
		case 'xplow':
			this.visibleList.sort((a, b) => b.experience - a.experience)
			break
	}
	return this
}