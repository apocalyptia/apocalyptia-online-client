import Rule from '/src/classes/Rule.js'

const Absorption = new Rule({
	name: `Absorption`, 
	desc: [
		`Every piece of Armor offers some amount of Absorption.`,
		`Absorption reduces the amount of Damage inflicted on any Body Part that piece of Armor is worn upon.`,
		`Armor loses 1 point of Absorption each time it takes Damage that exceeds it's current Absorption rating.`,
	]
})

export default Absorption