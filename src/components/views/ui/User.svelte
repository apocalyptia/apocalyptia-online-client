<script>
	import * as sapper from '@sapper/app'

	export let user
</script>

<div class="user">
	User:
	<a href="{`profile/${user.username}`}">
		<span>{user.displayName || user.uid}</span>
	</a>
</div>


<style>
	.user {
		padding: 1em;
		margin-bottom: 1em;
	}
</style>