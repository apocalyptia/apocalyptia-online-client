import Combat from '/src/classes/Combat.js'

const Wreck = new Combat({
	name: `Wreck`,
	description: [
		`The vehicle comes to a violent stop suddenly this Round.`,
		`Occupants take [ d6 Damage per 20mph or 30 yards of Speed ] and are ejected from the vehicle, unless they are wearing seat belts, in which case the Damage is halved and they remain in their seats.`
	]
})

export default Wreck
