import Creation from '/src/classes/Creation.js'

const Traits = new Creation({
	name: `Traits`,
	desc: [
		`You get 14 Trait points.`,
		`Traits can range from 1 to 6.`,
		`Trait rolls are [d6 + Trait].`,
		`Trait scores set the upper limit for their Skills.`
	],
	step: 0,
	type: `Creation`
})
Traits.max = 6
Traits.starting = 14

export default Traits
