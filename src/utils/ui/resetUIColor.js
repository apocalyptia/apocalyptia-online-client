function resetUIColor() {
	document.documentElement.style.setProperty(`--pri-color`, `rgba(0,255,0,.9)`)
	document.documentElement.style.setProperty(`--pri-color-trans`, `rgba(0,255,0,.5)`)
	document.documentElement.style.setProperty(`--sec-color`, `rgba(15,25,15,.85)`)
	document.documentElement.style.setProperty(`--sec-color-trans`, `rgba(15,30,15,.5)`)
}

export default resetUIColor
