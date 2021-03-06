import Combat from '/src/classes/Combat.js'

const Actions = new Combat({
	name: `Actions`,
	description: [
		`You may take up to 3 Actions per Round.`,
		`Most Actions costs 1 point of Endurance unless otherwise noted.`
	]
})

export default Actions
