<script>
	import AbilitiesSection from 'components/character/sheet/sections/AbilitiesSection.svelte'
	import DescriptionSection from 'components/character/sheet/sections/DescriptionSection.svelte'
	import GearSection from 'components/character/sheet/sections/GearSection.svelte'
	import HealthSection from 'components/character/sheet/sections/HealthSection.svelte'
	import NotesSection from 'components/character/sheet/sections/NotesSection.svelte'
	import PropertiesSection from 'components/character/sheet/sections/PropertiesSection.svelte'
	import SkillsSection from 'components/character/sheet/sections/SkillsSection.svelte'
	import TraitsSection from 'components/character/sheet/sections/TraitsSection.svelte'

	export let mode
</script>


<div class="character-sheet">
	<DescriptionSection {mode} />
	<TraitsSection />
	<SkillsSection />
	<PropertiesSection {mode} />
	<HealthSection {mode} />
	<AbilitiesSection />
	<GearSection {mode} />
	<NotesSection {mode} />
</div>