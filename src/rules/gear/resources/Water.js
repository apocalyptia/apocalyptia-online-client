import Resource from '/src/classes/gear/Resource.js'

const Water = new Resource({
	name: `Water`,
	type: `Resource`,
	description: [`1 unit Needed per day to prevent Dehydration.`],
	size: 1
})

export default Water
