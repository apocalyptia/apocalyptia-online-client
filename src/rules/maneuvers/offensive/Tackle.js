import Rule from '/src/classes/Rule.js'

const Tackle = new Rule({
	name: `Tackle`,
	desc: [
		`Spend 2 Actions and make a Grapple Attack roll to move up to your Speed and Pin an enemy.`,
		`If you Fail, you go Prone in front of them.`,
	]
})

export default Tackle