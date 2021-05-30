import Rule from '../../classes/Rule.js'
import Pain from './subrules/Pain.js'
import Recovery from './subrules/Recovery.js'

const Trauma = new Rule({
	name: `Trauma`,
	desc: [
		`Trauma temporarily reduces Psyche.`,
		`When Psyche drops to 0, you lose all hope and seek out death at the earliest opportunity.`,
		`Someone must protect you from yourself until you have Recovered at least 1 Psyche.`,
		`Any number of horrible events could potentially cause Trauma.`,
		`Minor Trauma generally occurs 1 point at a time.`,
		`Major Trauma can occur 1d6 or more points at a time.`,
		`Players and Narrators should talk together to determine how traumatic particular events may be to the character.`,
		`Each point of Trauma causes a -1 Pain penalty until healed.`
	]
})
Trauma.subrules = [Pain, Recovery]

export default Trauma
