import PropSort from '../helpers/PropSort'
import RandomRoll from '../helpers/Random'
import acrobatics from './skills/Acrobatics'
import athletics from './skills/Athletics'
import build from './skills/Build'
import drive from './skills/Drive'
import larceny from './skills/Larceny'
import leadership from './skills/Leadership'
import medicine from './skills/Medicine'
import melee from './skills/Melee'
import perception from './skills/Perception'
import perform from './skills/Perform'
import ranged from './skills/Ranged'
import science from './skills/Science'
import socialize from './skills/Socialize'
import stealth from './skills/Stealth'
import survival from './skills/Survival'
import tame from './skills/Tame'


export const SkillExplanation = [
	`You get Brains x 6 Skill points to assign.`,
	`Skills range from 0 to 6.`,
	`Skill rolls are [d6 + Skill].`,
	`Trait scores set the limit for their Skills.`,
]

export const AgilitySkills = [
	acrobatics,
	larceny,
	ranged,
	stealth,
]

export const BrainsSkills = [
	medicine,
	perception,
	science,
	survival,
]

export const ConstitutionSkills = [
	athletics,
	build,
	drive,
	melee,
]

export const DemeanorSkills = [
	leadership,
	perform,
	socialize,
	tame,
]

export const SkillList = [
	...AgilitySkills,
	...BrainsSkills,
	...ConstitutionSkills,
	...DemeanorSkills,
]

export const SpecialtyExplanation = `Specialties (listed below their Skills) equal their parent Skill by default. Specialties can exceed the parent Skill by taking the Specialize Ability. Unless otherwise noted, a Skill takes one Action.`

export const SkillFlowExplanation = `Skill Flow: Once per month (in-game), transfer 1 point from a Skill you have not used to one that you have used.`


const SpecialtyList = Object.values(SkillList)
	.map((s) => Object.values(s.specs))
	.reduce((a, b) => a.concat(b), [])
	.sort((a, b) => PropSort(a, b, `name`))


export default {
	name: `Skills`,
	explanation: SkillExplanation,
	list: SkillList,
	groups: [
		{
			name: `Agility`,
			list: AgilitySkills
		},
		{
			name: `Brains`,
			list: BrainsSkills
		},
		{
			name: `Constitution`,
			list: ConstitutionSkills
		},
		{
			name: `Demeanor`,
			list: DemeanorSkills
		},
	],
	specs: SpecialtyList,
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
	random: function(c) {
		c = this.reset(c)
		while(this.remaining(c) > 0) {
			const t = RandomRoll(Object.keys(c.skills))
			const parentScore = c.traits[c.skills[t].parent.toLowerCase()].score
			if (c.skills[t].score < parentScore) c.skills[t].score++
		}
		return c
	},
	remaining: function(c) {
		const spent = Object.values(c.skills).reduce((t, { score }) => t += score, 0)
		return this.startingPoints(c) - spent
	},
	reset: function(c) {
		Object.keys(c.skills).forEach(t => c.skills[t].score = 0)
		return c
	},
}