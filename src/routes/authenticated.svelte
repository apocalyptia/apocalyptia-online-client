<script>
	import * as sapper from '@sapper/app'
	import { authUserStore } from "../stores/userStore"

	$: if (!$authUserStore) sapper.goto('/')
</script>

{#if $authUserStore}
	<slot />
{/if}
