import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import MeshComponent from "../Components/MeshComponent"
import WeaponControllerComponent from "../Components/WeaponControllerComponent"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const WeaponEntity = (owner: Entity) => {
	const weapon = new Entity()
	const sword = AssetManager.tiles.weapon_knight_sword
	weapon.addComponent(new BodyComponent({ moveForce: 10, mass: 1 }, { width: sword.width, height: sword.height, contact: true, sensor: true }))
	weapon.addComponent(new MeshComponent(sword.buffer))
	weapon.addComponent(new DamageComponent(5))
	weapon.addComponent(new WeaponControllerComponent(owner))
	return weapon
}
export default WeaponEntity