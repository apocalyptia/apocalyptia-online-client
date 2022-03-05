<script>
	import CenterCard from '$components/widgets/CenterCard.svelte'
	import MenuItems from '$components/widgets/MenuItems.svelte'
	import menuStore from '$stores/menuStore.js'
</script>

<CenterCard title={'Main Menu'}>
	<MenuItems links={$menuStore.links} />
</CenterCard>
