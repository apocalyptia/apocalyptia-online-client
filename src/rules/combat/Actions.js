import Combat from '/src/classes/Combat.js'

const Actions = new Combat({
	name: `Actions`,
	desc: [
		`You get 3 Actions per round starting on your turn.`,
		`Doing most things costs 1 Action unless otherwise noted.`
	]
})

export default Actions
