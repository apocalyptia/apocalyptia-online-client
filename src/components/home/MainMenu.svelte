<script>
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
	import MenuItems from '/src/components/widgets/MenuItems.svelte'
	import menuStore from '/src/stores/menuStore.js'
</script>


<CenterCard title={'Main Menu'}>
	<MenuItems links={$menuStore.links} />
</CenterCard>
