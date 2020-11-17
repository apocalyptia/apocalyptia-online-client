<script>
	import UserMenu from 'icons/UserMenu.svelte'
</script>


<div class='title-bar'>
	<a href='/' class='link-btn title-link'>
		<span class='app-title'>Apocalyptia Online</span>
	</a>
	<UserMenu />
</div>


<style>
	.title-bar {
		display: flex;
		max-height: var(--s300);
		position: fixed;
		top: 0;
		transition: top 0.3s linear;
		width: 100%;
		z-index: 9;
	}
	.title-link {
		padding: var(--std-padding);
		width: 100%;
	}
</style>