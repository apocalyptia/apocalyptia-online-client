export default (guuid, mod) => {
	let hash = mod.split('')
					.map(m => m = m.charCodeAt(0))
					.reduce((a, b) => a + b + parseInt(guuid.split(`-`)[4], 16))
					.toString(16)

	if (hash.length > 12) hash = hash.substr(hash.length - 12, hash.length)

	return guuid.substr(0, guuid.lastIndexOf('-') + 1) + hash
}