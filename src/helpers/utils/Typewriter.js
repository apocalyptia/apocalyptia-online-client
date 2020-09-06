export default (node, { speed = 50 }) => {
	const text = node.textContent
	const duration = text.length * speed
	return {
		duration,
		tick: t => {
			const i = ~~(text.length * t)
			node.textContent = text.slice(0, i)
		}
	}
}