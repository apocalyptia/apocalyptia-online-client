import Wearable from '/src/classes/gear/Wearable.js'

const GasMask = new Wearable({
	name: `Gas Mask`,
	description: [`+6 Constitution vs airborne toxins.`, `Mask.`, `-1 Perception.`],
	size: 2
})

export default GasMask
