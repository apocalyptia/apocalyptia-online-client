export default (character) => {
	let spent = 0
	if (character.abilities.length) {
		spent = character.abilities.reduce((t, n) => t += (n.taken * n.xp), 0)
	}
	return spent
}