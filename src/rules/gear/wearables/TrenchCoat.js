import Wearable from '/src/classes/gear/Wearable.js'

const TrenchCoat = new Wearable({
	name: `Trench Coat`,
	description: [`Cold Resistance.`, `+1 Stealth.`],
	size: 1
})
TrenchCoat.slots = 4

export default TrenchCoat
