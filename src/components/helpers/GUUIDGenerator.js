const chars = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `a`, `b`, `c`, `d`, `e`, `f`]

const randomChar = (num) => {
	let result = ``
	for (let i = 0; i < num; i++) {
		result += chars[Math.floor(Math.random() * chars.length)]
	}
	return result
}

export default () => `${randomChar(8)}-${randomChar(4)}-${randomChar(4)}-${randomChar(4)}-${randomChar(12)}`