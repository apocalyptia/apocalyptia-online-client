export default () => {
	console.log('initNetlifyIdentity called.')
	const script = document.createElement('script')
	script.src = 'https://identity.netlify.com/vi/netlify-identity-widget.js'
	script.async = true
	document.body.appendChild(script)
}