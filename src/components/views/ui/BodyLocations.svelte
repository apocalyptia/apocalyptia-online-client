<script>
	export let character
</script>


<div class='body-locations-section'>
	<div class='left-labels'>
		<div class='left-arm-label'>
			<div>{character.health.leftArm.name} Health</div>
			<div>{character.health.leftArm.current}/{character.health.leftArm.score}</div>
		</div>
		<div class='left-leg-label'>
			<div>{character.health.leftLeg.name} Health</div>
			<div>{character.health.leftLeg.current}/{character.health.leftLeg.score}</div>
		</div>
	</div>
	<div class='locations'>
		<div class='head-label'>
			<div>{character.health.head.name} Health</div>
			<div>{character.health.head.current}/{character.health.head.score}</div>
		</div>
		<div class='head-level'>
			<div class='head location' />
		</div>
		<div class='torso-level'>
			<div class='left-arm arm location' />
			<div class='torso location'>
				<div class='torso-label'>
					<div>{character.health.torso.name} Health</div>
					<div>{character.health.torso.current}/{character.health.torso.score}</div>
				</div>
			</div>
			<div class='right-arm arm location' />
		</div>
		<div class='legs-level'>
			<div class='left-leg leg location' />
			<div class='right-leg leg location' />
		</div>
	</div>
	<div class='right-labels'>
		<div class='right-arm-label'>
			<div>{character.health.rightArm.name} Health</div>
			<div>{character.health.rightArm.current}/{character.health.rightArm.score}</div>
		</div>
		<div class='right-leg-label'>
			<div>{character.health.rightLeg.name} Health</div>
			<div>{character.health.rightLeg.current}/{character.health.rightLeg.score}</div>
		</div>
	</div>
</div>


<style>
	.body-locations-section {
		display: flex;
		width: 100%;
	}
	div[class*=-label] {
		display: inline-block;
		height: 10px;
		text-align: center;
		width: 100%;
		position: relative;
	}
	.head-label {
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.right-arm-label {
		top: 140px;
	}
	.left-arm-label {
		top: 140px;
	}
	.torso-label {
		color: var(--scr-color);
		left: 50%;
		top: 50px;
		transform: translate(-50%, -50%);
	}
	.left-leg-label {
		top: 250px;
	}
	.right-leg-label {
		top: 250px;
	}
	
	.locations {
		display: block;
		margin-top: 10px;
		text-align: center;
		width: 100%;
	}
	.location {
		background: lime;
	}
	div[class*=level] {
		display: flex;
		justify-content: center;
	}
	.head {
		border-radius: 50%;
		border: 1px;
		height: 50px;
		margin-bottom: 5px;
		width: 50px;
	}
	.arm {
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
		height: 140px;
		width: 20px;
	}
	.left-arm {
		border-top-left-radius: 30px;
	}
	.right-arm {
		border-top-right-radius: 30px;
	}
	.torso {
		color: var(--scr-color);
		height: 150px;
		margin: 0 5px;
		width: 70px;
		text-align: center;
	}
	.leg {
		border-bottom-right-radius: 15px;
		border-bottom-left-radius: 15px;
		height: 160px;
		width: 28px;
	}
	.left-leg {
		margin-right: 14px;
	}
</style>