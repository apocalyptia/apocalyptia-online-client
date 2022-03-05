import Resource from '$classes/gear/Resource.js'

const Food = new Resource({
	name: `Food`,
	type: `Resource`,
	description: [`1 unit Needed per day to prevent Starvation.`],
	size: 1,
})

export default Food
