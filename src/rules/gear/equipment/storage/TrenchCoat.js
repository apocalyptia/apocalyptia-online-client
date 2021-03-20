import Gear from '/src/classes/Gear.js'

const TrenchCoat = new Gear({
	id: ``,
	name: `Trench Coat`,
	desc: [
		`Cold Resistance.`,
		`+1 Stealth.`,
	],
	sz: 1
})
TrenchCoat.slots = 4

export default TrenchCoat