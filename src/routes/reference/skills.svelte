<script>
	import { SkillList } from '../../components/rules/Skills'
	import RefList from '../../components/ui/reference/RefList.svelte'
	
	// TODO: Break up skills into Trait groups and add Sub-Skills.
</script>

<div class='ref-page'>
	<div class='ref-header'>Skill Rules</div>
	<svelte:component this={RefList} list={SkillList} />
</div>