<script>
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
</script>

<CenterCard title={'Login Screen'}>
	<a href="/join" class="link-btn">Join</a>
	<a href="/login" class="link-btn">Login</a>
</CenterCard>

<style>
	a {
		margin-bottom: var(--std-margin);
	}
	a:last-child {
		margin-bottom: 0;
	}
</style>
