import Maneuver from '/src/classes/Maneuver.js'

const Tackle = new Maneuver({
	name: `Tackle`,
	desc: [
		`Spend 2 Actions and make a Grapple Attack roll to move up to your Speed and Pin an enemy.`,
		`If you Fail, you go Prone in front of them.`
	],
	mode: `Offensive`
})

export default Tackle
