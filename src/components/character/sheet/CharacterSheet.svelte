<script>
	import AbilitiesSection from 'components/character/sheet/AbilitiesSection.svelte'
	import DescriptionSection from 'components/character/sheet/DescriptionSection.svelte'
	import GearSection from 'components/character/sheet/GearSection.svelte'
	import HealthSection from 'components/character/sheet/HealthSection.svelte'
	import NotesSection from 'components/character/sheet/NotesSection.svelte'
	import PropertiesSection from 'components/character/sheet/PropertiesSection.svelte'
	import SkillsSection from 'components/character/sheet/SkillsSection.svelte'
	import TraitsSection from 'components/character/sheet/TraitsSection.svelte'

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