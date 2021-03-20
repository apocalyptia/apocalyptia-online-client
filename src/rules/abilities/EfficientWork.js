import Ability from '/src/classes/Ability.js'
import Build from '/src/rules/skills/Build.js'
import Larceny from '/src/rules/skills/Larceny.js'
import Medicine from '/src/rules/skills/Medicine.js'
import Science from '/src/rules/skills/Science.js'
import Survival from '/src/rules/skills/Survival.js'
import Tame from '/src/rules/skills/Tame.js'

const EfficientWork = new Ability({
	id: ``,
	name: `Efficient Work`,
	desc: [
		`[Time / 2] for one of the following Skills (minimum 1 action): Build, Larceny, Medicine, Science, Survival, or Tame.`
	],
	max: 1,
	experience: 6,
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