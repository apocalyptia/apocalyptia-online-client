<script>
	import { onMount } from 'svelte'

	onMount() {
		netlifyIdentity.open()

		const user = netlifyIdentity.currentUser()

		
	}
</script>

<svelte:head>
	<title>Apocalyptia Online</title>
	<script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>

<div data-netlify-identity-menu></div>
<div data-netlify-identity-button>Login with Netlify Identity</div>