function resetUIColor() {
	document.documentElement.style.setProperty(`--pri-color`, `rgba(0,255,0,1)`)
	document.documentElement.style.setProperty(`--pri-color-trans`, `rgba(0,255,0,.25)`)
	document.documentElement.style.setProperty(`--sec-color`, `rgba(15,25,15,1)`)
	document.documentElement.style.setProperty(`--sec-color-trans`, `rgba(15,30,15,.25)`)
}

export default resetUIColor()
