import Maneuver from 'rules/maneuvers/Maneuver.js'


const Tackle = new Maneuver({
	id: `cbc7ab2c-3122-4ab9-b990-c7296e7c66ef`,
	cat: `Offensive`,
	name: `Tackle`,
	desc: [
		`Spend 2 Actions and make a Grapple Attack roll to move up to your Speed and Pin an enemy.`,
		`If you Fail, you go Prone in front of them.`,
	]
})

export default Tackle