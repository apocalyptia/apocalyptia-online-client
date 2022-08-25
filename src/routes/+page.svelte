<!-- <script context="module">

	export const load = async (input) => {

		const response = await input.fetch('/api/auth')

		const user = (await response.json())

		if (!user.user_id) {
			return {
				status: 302,
				redirect: '/signin'
			}
		}

		return {
			props: {
				user
			}
		}

	}

</script> -->


<script>
	import MainMenu from '$components/home/MainMenu.svelte'
	// import UserLogin from '$components/home/UserLogin.svelte'
	// import playerStore from '$stores/playerStore.js'

	// export let user = {}

	// const signOut = async () => {
	// 	await fetch('/api/signout', {
	// 		method: 'POST'
	// 	})
	// 	window.location.href = '/';
	// }

	// const signOutAll = async () => {
	// 	await fetch('/api/signout-all', {
	// 		method: 'POST'
	// 	})
	// 	window.location.href = '/'
	// };
</script>


<!-- {#if $playerStore.loggedIn} -->
<MainMenu />
<!-- {:else}
	<UserLogin />
{/if} -->
