function adjustUIColor(character) {
	const headCurrent = character.properties.health.locations.head.current
	const torsoCurrent = character.properties.health.locations.torso.current
	const current = headCurrent + torsoCurrent

	const headMax = character.properties.health.locations.head.score
	const torsoMax = character.properties.health.locations.torso.score
	const max = headMax + torsoMax

	const health = current / max

	let pR = (health < 1) ? (1.5 - health) * 255 : 0
	let pG = (health < 1) ? (1.5 * health) * 255 : 255
	let pB = 0

	let sR = (health < 1) ? (1.5 - health) * 25 : 15
	let sG = (health < 1) ? (1.5 * health) * 25 : 25
	let sB = 15

	if ((headCurrent < 1) || (torsoCurrent < 1)) {
		pR = (health * 64) + 192
		pG = (health * 64) + 192
		pB = (health * 64) + 192
		sR = 0
		sG = 0
		sB = 0
	}

	document.documentElement.style.setProperty(`--pri-color`, `rgba(${pR}, ${pG}, ${pB}, .9)`)
	document.documentElement.style.setProperty(`--pri-color-trans`, `rgba(${pR}, ${pG}, ${pB}, .5)`)
	document.documentElement.style.setProperty(`--sec-color`, `rgba(${sR}, ${sG}, ${sB}, .85)`)
	document.documentElement.style.setProperty(`--sec-color-trans`, `rgba(${sR}, ${sG}, ${sB}, .5)`)
}

export default adjustUIColor