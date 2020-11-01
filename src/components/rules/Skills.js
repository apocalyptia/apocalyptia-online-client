import PropSort from 'utils/PropSort.js'
import SkillsList from 'lists/SkillsList.js'

export default {
	name: `Skills`,
	text: [
		`You get Brains x 6 Skill points to assign.`,
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
	specs: Object.values(SkillsList)
				.map((s) => Object.values(s.specs))
				.reduce((a, b) => a.concat(b), [])
				.sort((a, b) => PropSort(a, b, `name`)),
	startingPoints: (c) => c.traits.brains.score * 6,
	assign: function(c, target) {
		c.skills[target.name].score = parseInt(target.value)
		return this.limit(c, target.name)
	},
	limit: function(c, targetName) {
		const max = c.traits[c.skills[targetName].parent.toLowerCase()].score
		while(this.remaining(c) < 0 || c.skills[targetName].score > max) {
			c.skills[targetName].score--
		}
		return c
	},
	remaining: function(c) {
		const spent = Object.values(c.skills).reduce((t, { score }) => t += score, 0)
		return this.startingPoints(c) - spent
	}
}