export default () => {
	const netlifyIdentity = window.netlifyIdentity
	if (netlifyIdentity) netlifyIdentity.open()
	else console.log('netlifyIdentity not defined.')
}