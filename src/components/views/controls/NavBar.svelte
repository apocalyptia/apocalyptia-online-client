<script>
export let links
</script>


<div class='nav-bar'>
	<a class='link-button nav-button' href={links.back}>&ltrif;</a>
	<a class='link-button nav-button home-button' href='/'>Home</a>
	<a class='link-button nav-button' href={links.next}>&rtrif;</a>
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