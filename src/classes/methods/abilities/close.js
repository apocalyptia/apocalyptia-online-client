export default function() {
	this.displayList.forEach((a) => {
		const ability = document.getElementById(`details-${a.name.replace(' ', '')}`)
		if (ability && ability.hasAttribute('open')) {
			ability.removeAttribute('open')
		}
	})
}