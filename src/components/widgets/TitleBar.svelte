<script>
	import MenuButton from '$components/buttons/MenuButton.svelte'
	import UserMenu from '$components/widgets/UserMenu.svelte'
	import playerStore from '$stores/playerStore.js'
</script>


<div class='title-bar'>
	<a href='/' class='link-btn title-link part-width'>
		<div class='app-title'>Apocalyptia Online</div>
		<div class='sub'>v.28-01-21</div>
	</a>
	<!-- {#if $playerStore.loggedIn} -->
		<MenuButton />
		<UserMenu />
	<!-- {/if} -->
</div>


<style>
	.sub {
		border: 1px solid crimson;
		color: crimson;
		font-size: var(--s50);
		left: 0;
		padding: 2px;
		position: absolute;
		top: calc(var(--square) + 1px);
		width: 80px;
	}
	.title-bar {
		display: flex;
		height: var(--square);
		position: fixed;
		top: 0;
		transition: top 0.3s linear;
		width: 100vw;
		z-index: 9;
	}
	.title-link {
		display: block;
		padding: var(--std-padding);
	}
	.full-width {
		width: 100vw;
	}
	.part-width {
		width: calc(100vw - var(--square));
	}
</style>