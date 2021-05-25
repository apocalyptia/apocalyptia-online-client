export default (map, click) => {
	for (let r = 0; r < map.contents.length; r++) {
		for (let c = 0; c < map.contents[r].length; c++) {
			if (
				map.contents[r][c].x <= click.x &&
				map.contents[r][c].y <= click.y &&
				map.contents[r][c].w >= click.x &&
				map.contents[r][c].h >= click.y
			) return { r, c }
		}
	}
}