import AgilitySkillsList from 'lists/skills/AgilitySkillsList.js'
import BrainsSkillsList from 'lists/skills/BrainsSkillsList.js'
import ConstitutionSkillsList from 'lists/skills/ConstitutionSkillsList.js'
import DemeanorSkillsList from 'lists/skills/DemeanorSkillsList.js'

export default {
	name: `Skills`,
	list: [
		...AgilitySkillsList,
		...BrainsSkillsList,
		...ConstitutionSkillsList,
		...DemeanorSkillsList,
	],
	groups: [
		{
			name: `Agility`,
			list: AgilitySkillsList
		},
		{
			name: `Brains`,
			list: BrainsSkillsList
		},
		{
			name: `Constitution`,
			list: ConstitutionSkillsList
		},
		{
			name: `Demeanor`,
			list: DemeanorSkillsList
		},
	]
}