import AreaMapCanvas from '$classes/AreaMapCanvas.js'
// import AreaMapDOM from '$classes/AreaMapDOM.js'
import { writable } from 'svelte/store'

// const areaMap = new AreaMapDOM()

const areaMap = new AreaMapCanvas()

export default writable(areaMap)
