<script>
	import NavButtonHome from 'components/buttons/NavButtonHome.svelte'
	import NavButtonNext from 'components/buttons/NavButtonNext.svelte'
	import NavButtonPrevious from 'components/buttons/NavButtonPrevious.svelte'
	import { beforeUpdate } from 'svelte'

	export let proceedConditions, limit

	let canProceed = false

	$: proceedStatus = _ => {
		canProceed = true
		if (proceedConditions()) canProceed = false
	}

	beforeUpdate(_ => proceedStatus())
</script>


<div class='nav-bar'>
	<NavButtonPrevious />
	<NavButtonHome />
	<NavButtonNext {limit} {canProceed} />
</div>


<style>
	.nav-bar {
		display: flex;
		width: 100vw;
		position: absolute;
		bottom: 0;
		z-index: 6;
	}
</style>