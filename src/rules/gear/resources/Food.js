import Resource from '/src/classes/gear/Resource.js'

const Food = new Resource({
	name: `Food`,
	type: `Resource`,
	desc: [`1 unit Needed per day to prevent Starvation.`],
	sz: 1
})

export default Food
