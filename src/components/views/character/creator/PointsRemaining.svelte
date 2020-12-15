<script>
	export let points
</script>


<div class='remaining {points < 0 ? 'error' : ''}'>
	<h3>Points Remaining: {points}</h3>
</div>