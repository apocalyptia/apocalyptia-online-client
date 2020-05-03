import d6 from './d6'


const Nd6 = (n) => {
	let total = 0
	for (let i = 0; i < n; i++) total += d6()
	return total
}

export default Nd6