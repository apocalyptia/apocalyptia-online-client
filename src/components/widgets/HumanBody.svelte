<div class='head-level'>
	<div class='head body-part' />
</div>
<div class='torso-level'>
	<div class='left-arm arm body-part' />
	<div class='torso body-part' />
	<div class='right-arm arm body-part' />
</div>
<div class='legs-level'>
	<div class='left-leg leg body-part' />
	<div class='right-leg leg body-part' />
</div>

	
<style>
	.body-part {
		background-color: var(--pri-color);
		opacity: .75;
	}
	div[class*='level'] {
		display: flex;
		justify-content: center;
	}
	.head {
		border-radius: 50%;
		border: 1px;
		height: 5vh;
		margin-bottom: .5vh;
		width: 5vh;
	}
	.arm {
		border-bottom-left-radius: 100vh;
		border-bottom-right-radius: 100vh;
		height: 15vh;
		width: 2vh;
	}
	.left-arm {
		border-top-left-radius: 200vh;
	}
	.right-arm {
		border-top-right-radius: 200vh;
	}
	.torso {
		height: 14.5vh;
		margin: 0 .5vh;
		width: 7vh;
	}
	.leg {
		border-bottom-right-radius: 100vh;
		border-bottom-left-radius: 100vh;
		height: 17vh;
		width: 2.5vh;
	}
	.left-leg {
		margin-right: 2vh;
	}
</style>