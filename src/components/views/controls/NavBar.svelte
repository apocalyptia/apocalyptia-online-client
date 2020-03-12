<script>
export let links
</script>


<div class='nav-bar'>
	<a href={links.back} class='link-button nav-button'>&ltrif;</a>
	<a href='/' class='link-button nav-button home-button'>Home</a>
	<a href={links.next} class='link-button nav-button'>&rtrif;</a>
</div>


<style>
.nav-bar {
	bottom: 0;
	display: flex;
	left: 0;
	position: fixed;
	width: 100%;
}
.nav-button {
	flex: 1;
}
.home-button {
	font-size: var(--s125);
}
</style>