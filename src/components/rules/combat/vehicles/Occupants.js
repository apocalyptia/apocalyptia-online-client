import Rule from '../../../classes/Rule'


const Occupants = new Rule({
	name: `Occupants`, 
	desc: [
		`Passengers in a moving vehicle are Unstable.`,
		`A vehicle provides Cover from Ranged Attacks with its Damage Resistance.`,
	]
})

export default Occupants