import Property from '../../classes/Property.js' 

const formula = `( Agility + Constitution ) / 2`

const Fitness = new Property({
	name: `Fitness`,
	formula: formula,
	desc: [
		`Fitness = ${formula}`,
		`This is the rate at which Endurance is regained during rounds where you do not take any Actions.`,
	],
	type: `Property`
})

export default Fitness