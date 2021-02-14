import Alphabetize from 'utils/Alphabetize.js'
import SkillsList from 'rules/lists/SkillsList.js'

let specs = Object.values(SkillsList.list)
					.map((s) => Object.values(s.specs))
					.reduce((a, b) => a.concat(b), [])

specs = Alphabetize(specs)

const startingPoints = (c) => c.traits.brains.score * 6

const assign = (c, target) => {
	c.skills[target.name].score = parseInt(target.value)
	return limit(c, target.name)
}

const limit = (c, targetName) => {
	const max = c.traits[c.skills[targetName].parent.toLowerCase()].score
	while(remaining(c) < 0 || c.skills[targetName].score > max) {
		c.skills[targetName].score--
	}
	return c
}

const remaining = (c) => {
	let spent = 0
	Object.keys(c.skills).forEach(s => spent += c.skills[s].score)
	return startingPoints(c) - spent
}

export default {
	name: `Skills`,
	text: [
		`You get Brains x 6 Skill points.`,
		`Skills range from 0 to 6.`,
		`Skill rolls are [d6 + Skill].`,
		`Trait scores set the limit for their Skills.`,
    ],
    specialtyExplanation: [
        `Specialties (listed below their Skills) equal their parent Skill by default.`,
        `Specialties can exceed the parent Skill by taking the Specialize Ability.`,
        `Unless otherwise noted, a Skill takes one Action.`,
    ],
    skillFlowExplanation: [
        `Once per month (in-game), transfer 1 point from a Skill you have not used to one that you have used.`
    ],
	specs,
	startingPoints,
	assign,
	limit,
	remaining
}