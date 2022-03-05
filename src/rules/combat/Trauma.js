import Combat from '$classes/Combat.js'

const Trauma = new Combat({
	name: `Trauma`,
	description: [
		`Trauma temporarily reduces Psyche.`,
		`Each point of Trauma causes a -1 Pain penalty until healed.`,
		`Any number of horrible events could potentially cause Trauma.`,
		`Minor Trauma generally occurs 1 point at a time.`,
		`Major Trauma can occur 1d6 or more points at a time.`,
		`Players and Narrators should talk together to determine how traumatic particular events may be to the Character.`,
		`Trauma can be healed during Recovery.`
	]
})

export default Trauma
