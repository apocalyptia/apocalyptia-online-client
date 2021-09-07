export default function() {
	this.completeList.forEach((a) => {
		const ability = document.getElementById(`details-${a.name.replace(' ', '')}`)
		console.log(ability)
		if (ability) {
			if (this.display === 'Show') {
				ability.setAttribute('open', true)
			} else if (this.display === 'Hide') {
				ability.removeAttribute('open')
			}
		}
	})
	return this
}