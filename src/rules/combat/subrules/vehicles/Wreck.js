import Combat from '/src/classes/Combat.js'

const Wreck = new Combat({
	name: `Wreck`,
	desc: [
		`The vehicle comes to a violent stop suddenly this round.`,
		`Occupants take [d6 Damage per 20mph or 30yds of Speed] and are ejected from the vehicle, unless they are wearing seat belts, in which case the Damage is halved and they remain in their seats.`
	]
})

export default Wreck
