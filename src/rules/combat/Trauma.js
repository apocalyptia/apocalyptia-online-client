import Combat from '/src/classes/Combat.js'
import Pain from './subrules/Pain.js'
import Recovery from './subrules/Recovery.js'

const Trauma = new Combat({
	name: `Trauma`,
	description: [
		`Trauma temporarily reduces Psyche.`,
		`Each point of Trauma causes a -1 Pain penalty until healed.`,
		`Any number of horrible events could potentially cause Trauma.`,
		`Minor Trauma generally occurs 1 point at a time.`,
		`Major Trauma can occur 1d6 or more points at a time.`,
		`Players and Narrators should talk together to determine how traumatic particular events may be to the Character.`,
	],
})
Trauma.subrules = [Pain, Recovery]

export default Trauma
