import Ability from 'classes/Ability.js'
import Build from 'skills/Build.js'
import Larceny from 'skills/Larceny.js'
import Medicine from 'skills/Medicine.js'
import Science from 'skills/Science.js'
import Survival from 'skills/Survival.js'
import Tame from 'skills/Tame.js'

const LongDurationSkills = [
	Build,
	Larceny,
	Medicine,
	Science,
	Survival,
	Tame
]

const EfficientWork = new Ability({
	name: `Efficient Work`,
	desc: [
		`[Time / 2] for one of the following Skills (minimum 1 action):`,
		`Build, Larceny, Medicine, Science, Socialize, Survival, or Tame.`
	],
	max: 1,
	xp: 6,
	opts: LongDurationSkills
})

export default EfficientWork