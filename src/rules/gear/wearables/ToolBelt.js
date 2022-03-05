import Wearable from '$classes/gear/Wearable.js'

const ToolBelt = new Wearable({
	name: `Tool Belt`,
	description: [`6x 1 Slots.`, `+1 Build.`, `Misc small tools.`],
	size: 2,
})
ToolBelt.slots = 6

export default ToolBelt
