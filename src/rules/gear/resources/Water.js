import Resource from '/src/classes/gear/Resource.js'

const Water = new Resource({
	name: `Water`,
	type: `Resource`,
	desc: [`1 unit Needed per day to prevent Dehydration.`],
	sz: 1
})

export default Water
