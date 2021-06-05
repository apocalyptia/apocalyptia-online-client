import Wearable from '/src/classes/gear/Wearable.js'

const Sunglasses = new Wearable({
	name: `Sunglasses`,
	description: [`No Visibility(Sun) penalty.`, `+1 Constitution vs light.`],
	size: 0
})

export default Sunglasses
