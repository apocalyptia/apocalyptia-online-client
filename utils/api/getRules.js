export default async () => {
	return await fetch(`gameserver.apocalyptia.com`)
					.then(res => res.json())
					.catch(err => console.log(err))
}