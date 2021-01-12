import Ability from 'classes/Ability.js'
import Build from 'rules/skills/Build.js'
import Larceny from 'rules/skills/Larceny.js'
import Medicine from 'rules/skills/Medicine.js'
import Science from 'rules/skills/Science.js'
import Survival from 'rules/skills/Survival.js'
import Tame from 'rules/skills/Tame.js'

const EfficientWork = new Ability({
	id: ``,
	name: `Efficient Work`,
	desc: [
		`[Time / 2] for one of the following Skills (minimum 1 action): Build, Larceny, Medicine, Science, Survival, or Tame.`
	],
	max: 1,
	xp: 6,
	opts: [
		Build,
		Larceny,
		Medicine,
		Science,
		Survival,
		Tame
	]
})

export default EfficientWork