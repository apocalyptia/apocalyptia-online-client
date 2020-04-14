<script>
let dash
$: dash = Math.PI * 12
</script>

<div>
	<svg
		class="spinner"
		height="50"
		style="animation-duration:1000ms;"
		viewbox="0 0 32 32"
		width="50"
	>
		<circle
			cx="16"
			cy="16"
			fill="none"
			r="10"
			role="presentation"
			stroke-dasharray="{dash}, 100"
			stroke-linecap="square"
			stroke-width="2"
			stroke="lime"
		/>
	</svg>
</div>


<style>
.spinner {
	animation-iteration-count: infinite;
	animation-name: spin;
	animation-timing-function: linear;
	transition-property: transform;
}
@keyframes spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
</style>