import Gear from '$rules/Gear.js'
import randomAmmo from '$utils/random/gear/randomAmmo.js'
import randomArmor from '$utils/random/gear/randomArmor.js'
import randomEquipment from '$utils/random/gear/randomEquipment.js'
import randomMeleeWeapon from '$utils/random/gear/randomMeleeWeapon.js'
import randomProjectileWeapon from '$utils/random/gear/randomProjectileWeapon.js'

export default function() {
	this.resetGear()
	this.gear.armor.inventory.push(randomArmor())
	this.gear.melee.inventory.push(randomMeleeWeapon())
	this.gear.projectile.inventory.push(randomProjectileWeapon())
	this.gear.ammo.inventory.push(
		randomAmmo({
			caliber: this.gear.projectile.inventory[0].caliber,
			max: 6
		})
	)
	this.gear.equipment.inventory = [
		...randomEquipment({
			numberOfItems: this.properties.luck.current
		})
	]
	const food = Gear.resources.food
	food.quantity = 1
	this.gear.equipment.inventory.push(food)
	const waterBottle = Gear.storage.water_bottle
	waterBottle.quantity = 1
	this.gear.equipment.inventory.push(waterBottle)
	const water = Gear.resources.water
	water.quantity = 1
	this.gear.equipment.inventory.push(water)
	return this
}