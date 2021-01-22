import AgilitySkillsList from '$rules/lists/skills/AgilitySkillsList.js'
import BrainsSkillsList from '$rules/lists/skills/BrainsSkillsList.js'
import ConstitutionSkillsList from '$rules/lists/skills/ConstitutionSkillsList.js'
import DemeanorSkillsList from '$rules/lists/skills/DemeanorSkillsList.js'

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