export default _ => {
	return await fetch(`http://localhost:12345/lists/manual`)
			.then(res => res.json())
			.then(res => res.list)
			.catch(err => console.log(err))
}