import Rule from 'rules/Rule.js'

const Wreck = new Rule({
	id: `86c103b5-98fa-4a7a-630a-0d3b50a40716`,
	name: `Wreck`, 
	desc: [
		`The vehicle comes to a violent stop suddenly this round.`,
		`Occupants take [d6 Damage per 20mph or 30yds of Speed] and are ejected from the vehicle, unless they are wearing seat belts, in which case the Damage is halved and they remain in their seats.`,
	]
})

export default Wreck