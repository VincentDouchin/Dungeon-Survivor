import BodyComponent from "../Components/BodyComponent"
import MeshComponent from "../Components/MeshComponent"
import XPComponent from "../Components/XPComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const XPEntity = () => {
	const xp = new Entity()
	xp.addComponent(new MeshComponent(AssetManager.tiles.xp, { renderOrder: 1, scale: 0.5 }))
	xp.addComponent(new BodyComponent(
		{ moveForce: 10000 },
		[
			{ width: 2, height: 2, contact: true, group: COLLISIONGROUPS.XP, canCollideWith: [COLLISIONGROUPS.SENSOR], mass: 1 }
		]))
	xp.addComponent(new XPComponent(1))
	return xp
}
export default XPEntity