<script>
	import AbilitiesList from '$components/character/creator/abilities/AbilitiesList.svelte'
	import CreationProcess from '$rules/CreationProcess.js'
	import ExplanationBlock from '$components/character/creator/ExplanationBlock.svelte'
	import OrganizerBar from '$components/character/creator/abilities/OrganizerBar.svelte'
	import PageHeader from '$components/character/creator/PageHeader.svelte'
	import PointsRemaining from '$components/character/creator/PointsRemaining.svelte'
	import ResetAndRandomButtonRow from '$components/character/creator/ResetAndRandomButtonRow.svelte'
	import abilitiesStore from '$stores/abilitiesStore.js'
	import characterStore from '$stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	function randomAbilities() {
		$abilitiesStore = $abilitiesStore.resetList()
		$characterStore = $characterStore.randomAbilities()
	}

	function resetAbilities() {
		$abilitiesStore = $abilitiesStore.resetList()
		$characterStore = $characterStore.resetAbilities()
	}

	function giveAbilitiesToCharacter() {
		$characterStore = $characterStore.resetAbilities()
		$abilitiesStore.workingList.forEach(ability => {
			if (ability.quantity) {
				$characterStore = $characterStore.addAbility(ability)
			}
		})
	}

	beforeUpdate(() => giveAbilitiesToCharacter())
</script>


<div class="abilities-step-page">
	<fieldset>
		<PageHeader chapter={'Abilities'} />
		<ExplanationBlock rule={CreationProcess.abilities.description} />
		<PointsRemaining points={$characterStore.properties.experience.current} />
		<br>
		<hr>
		<OrganizerBar />
		<hr>
		<AbilitiesList />
		<ResetAndRandomButtonRow reset={() => resetAbilities()} random={() => randomAbilities()} />
	</fieldset>
</div>
