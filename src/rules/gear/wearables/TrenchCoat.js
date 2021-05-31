import Wearable from '/src/classes/gear/Wearable.js'

const TrenchCoat = new Wearable({
	name: `Trench Coat`,
	desc: [`Cold Resistance.`, `+1 Stealth.`],
	sz: 1
})
TrenchCoat.slots = 4

export default TrenchCoat
