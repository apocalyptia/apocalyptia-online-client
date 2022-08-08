<script>
	import CenterCard from '$components/widgets/CenterCard.svelte'
	import MenuItems from '$components/widgets/MenuItems.svelte'

	const links = [
		{
			name: 'DOM Test',
			url: '/maps/dom',
		},
		{
			name: 'DOM 3d Test',
			url: '/maps/dom3d',
		},
		{
			name: 'ThreeJS Test',
			url: '/maps/threejs'
		},
	]
</script>


<svelte:head>
	<title>Apocalyptia Online - Maps</title>
</svelte:head>
<CenterCard title={'Map Test Menu'}>
	<MenuItems links={links} />
</CenterCard>
