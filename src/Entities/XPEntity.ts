import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import { Entity } from "../Globals/ECS"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import XPComponent from "../Components/XPComponent"
import assets from "../Globals/Assets"

const XPEntity = (amount = 1) => (position: PositionComponent) => {
	const xp = new Entity('xp')
	xp.addComponent(new SpriteComponent(assets.effects.Spark, { renderOrder: 1, scale: 0.8 * (1 + amount / 10) }))
	xp.addComponent(new AnimationComponent({ idle: assets.effects.Spark }))
	xp.addComponent(new BodyComponent(
		{ moveForce: 1000 },
		[
			{ width: 2, height: 2, contact: false, group: COLLISIONGROUPS.XP, canCollideWith: [COLLISIONGROUPS.SENSOR], mass: 1 }
		]))
	xp.addComponent(new XPComponent(amount))
	xp.addComponent(position)
	return xp
}
export default XPEntity