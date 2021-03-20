import Rule from '/src/classes/Rule.js'

const Actions = new Rule({
	name: `Actions`, 
	desc: [
		`You get 3 Actions per round starting on your turn.`,
		`Most things cost 1 Action unless otherwise noted.`,
	]
})

export default Actions