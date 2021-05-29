function typewriter(node, { speed = 50 }) {
	const text = node.textContent
	const duration = text.length * speed
	return {
		duration,
		tick: t => {
			const i = Math.floor(text.length * t)
			node.textContent = text.slice(0, i)
		}
	}
}

export default typewriter