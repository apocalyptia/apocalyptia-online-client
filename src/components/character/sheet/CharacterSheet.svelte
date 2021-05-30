<script>
	import AbilitiesSection from './sections/AbilitiesSection.svelte'
	import DescriptionSection from './sections/DescriptionSection.svelte'
	import GearSection from './sections/GearSection.svelte'
	import HealthSection from './sections/HealthSection.svelte'
	import NotesSection from './sections/NotesSection.svelte'
	import PropertiesSection from './sections/PropertiesSection.svelte'
	import SkillsSection from './sections/SkillsSection.svelte'
	import TraitsSection from './sections/TraitsSection.svelte'

	const sheetSectionsList = [
		{
			name: 'Description',
			content: DescriptionSection
		},
		{
			name: 'Traits',
			content: TraitsSection
		},
		{
			name: 'Skills',
			content: SkillsSection
		},
		{
			name: 'Properties',
			content: PropertiesSection
		},
		{
			name: 'Health',
			content: HealthSection
		},
		{
			name: 'Abilities',
			content: AbilitiesSection
		},
		{
			name: 'Gear',
			content: GearSection
		},
		{
			name: 'Notes',
			content: NotesSection
		}
	]

	export let mode
</script>

<div class="character-sheet">
	{#each sheetSectionsList as sheetSection}
		<section class="{sheetSection.name.toLowerCase()}-section">
			<h2>{sheetSection.name}</h2>
			<div class="sheet-card">
				<svelte:component this={sheetSection.content} {mode} />
			</div>
		</section>
	{/each}
</div>

<style>
	section {
		padding-top: var(--std-padding);
	}
	h2 {
		text-align: center;
	}
</style>
