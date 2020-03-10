<script>
export let links
</script>


<div class='nav-bar'>
	<a class='nav-button' href={links.back}>&ltrif;</a>
	<a class='nav-button home-button' href='/'>Home</a>
	<a class='nav-button' href={links.next}>&rtrif;</a>
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
	background: var(--scr-color);
	border-radius: var(--radius);
	border: var(--smallest-unit) solid var(--txt-color);
	flex: 1;
	font-size: calc(var(--base-unit) * 1.5);
	font-weight: bold;
	line-height: var(--double-unit);
	padding: var(--half-unit);
	text-align: center;
	vertical-align: middle;
}
.nav-button:active,
.nav-button:hover {
	background: var(--txt-color);
	color: var(--scr-color);
}
</style>