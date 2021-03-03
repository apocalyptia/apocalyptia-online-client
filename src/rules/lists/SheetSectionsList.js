import AbilitiesSection from 'components/character/sheet/sections/AbilitiesSection.svelte'
import DescriptionSection from 'components/character/sheet/sections/DescriptionSection.svelte'
import GearSection from 'components/character/sheet/sections/GearSection.svelte'
import HealthSection from 'components/character/sheet/sections/HealthSection.svelte'
import NotesSection from 'components/character/sheet/sections/NotesSection.svelte'
import PropertiesSection from 'components/character/sheet/sections/PropertiesSection.svelte'
import SkillsSection from 'components/character/sheet/sections/SkillsSection.svelte'
import TraitsSection from 'components/character/sheet/sections/TraitsSection.svelte'

export default {
	name: `Sheet Sections`,
	list: [
		{
			name: `Description`,
			content: DescriptionSection
		},
		{
			name: `Traits`,
			content: TraitsSection
		},
		{
			name: `Skills`,
			content: SkillsSection
		},
		{
			name: `Properties`,
			content: PropertiesSection
		},
		{
			name: `Health`,
			content: HealthSection
		},
		{
			name: `Abilities`,
			content: AbilitiesSection
		},
		{
			name: `Gear`,
			content: GearSection
		},
		{
			name: `Notes`,
			content: NotesSection
		}
	]
}