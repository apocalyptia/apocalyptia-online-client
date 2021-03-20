import AbilitiesSection from '/src/components/character/sheet/sections/AbilitiesSection.svelte'
import DescriptionSection from '/src/components/character/sheet/sections/DescriptionSection.svelte'
import GearSection from '/src/components/character/sheet/sections/GearSection.svelte'
import HealthSection from '/src/components/character/sheet/sections/HealthSection.svelte'
import NotesSection from '/src/components/character/sheet/sections/NotesSection.svelte'
import PropertiesSection from '/src/components/character/sheet/sections/PropertiesSection.svelte'
import SkillsSection from '/src/components/character/sheet/sections/SkillsSection.svelte'
import TraitsSection from '/src/components/character/sheet/sections/TraitsSection.svelte'

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