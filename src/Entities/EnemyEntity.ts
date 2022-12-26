

import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import HealthComponent from "../Components/HealthComponent"
import MeshComponent from "../Components/MeshComponent"
import DAMAGETYPES from "../Constants/DamageTypes"
import { Entity } from "../Globals/ECS"

const EnemyEntity = (type: EnemyType) => {
	const enemy = new Entity()
	const orc = Object.values(type.tiles)[0]
	enemy.addComponent(new MeshComponent(orc.buffer, orc.width, orc.height))
	enemy.addComponent(new AnimationComponent(type.tiles))
	enemy.addComponent(new DamageComponent(1, DAMAGETYPES.ENEMY))
	enemy.addComponent(new HealthComponent(10, DAMAGETYPES.ENEMY))
	enemy.addComponent(new BodyComponent(
		{ moveForce: 40 },
		{ width: orc.width, height: orc.height, contact: false }
	))
	return enemy
}


export default EnemyEntity