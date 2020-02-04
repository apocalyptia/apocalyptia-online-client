<script>
	function getSomething() {
		fetch('getapi')
	}
	function postSomething() {
		fetch('postapi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: 'yum'})
        })
	}
</script>

<svelte:head>
	<title>Apocalyptia Online</title>
</svelte:head>

<a href="/creator">
	<button class='display-button'>
		Character Creator
	</button>
</a>
<a href="/reference">
	<button class='display-button'>
		Rules Reference
	</button>
</a>