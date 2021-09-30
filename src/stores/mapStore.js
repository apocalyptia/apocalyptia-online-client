import AreaMapCanvas from '/src/classes/AreaMapCanvas.js'
// import AreaMapDOM from '/src/classes/AreaMapDOM.js'
import { writable } from 'svelte/store'

// const areaMap = new AreaMapDOM()

const areaMap = new AreaMapCanvas()

export default writable(areaMap)
