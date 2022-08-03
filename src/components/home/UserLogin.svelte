<script>
	import CenterCard from '$components/widgets/CenterCard.svelte'
</script>

<CenterCard title={'Login Screen'}>
	<a href="/join" class="link-btn">Join</a>
	<a href="/login" class="link-btn">Login</a>
</CenterCard>

<style>
	a {
		margin-bottom: var(--margin);
		text-decoration: none;
	}
	a:last-child {
		margin-bottom: 0;
	}
</style>
