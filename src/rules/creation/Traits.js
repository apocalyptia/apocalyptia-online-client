import CreationStep from '$classes/CreationStep.js'

const startingTraits = 14

const maxTraits = 6

const Traits = new CreationStep({
	name: `Traits`,
	description: [
		`You get ${startingTraits} Trait points.`,
		`Traits can range from 1 to ${maxTraits}.`,
		`Trait rolls are [ d6 + Trait ].`,
		`Trait scores set the upper limit for their Skills.`
	],
	step: 1,
	type: `CreationStep`
})
Traits.max = maxTraits
Traits.starting = startingTraits

export default Traits
