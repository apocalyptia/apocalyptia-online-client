import AgilitySkillsList from '/src/rules/lists/skills/AgilitySkillsList.js'
import BrainsSkillsList from '/src/rules/lists/skills/BrainsSkillsList.js'
import ConstitutionSkillsList from '/src/rules/lists/skills/ConstitutionSkillsList.js'
import DemeanorSkillsList from '/src/rules/lists/skills/DemeanorSkillsList.js'

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