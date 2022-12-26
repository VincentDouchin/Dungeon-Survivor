import BodyComponent from "../Components/BodyComponent";
import MeshComponent from "../Components/MeshComponent";
import PositionComponent from "../Components/PositionComponent";
import WeaponControllerComponent from "../Components/WeaponControllerComponent";
import { Entity, System } from "../Globals/ECS";
import { scene } from "../Globals/Initialize";

class RenderingSystem extends System {
	constructor() {
		super(MeshComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const mesh = entity.getComponent(MeshComponent)
			const position = entity.getComponent(PositionComponent)
			const body = entity.getComponent(BodyComponent)
			const weaponController = entity.getComponent(WeaponControllerComponent)
			if (mesh && position) {

				if (!mesh.mesh.parent) {
					scene.add(mesh.mesh)
				}
				mesh.mesh.position.set(position.x, position.y, 0)
			}
			if (weaponController?.owner && body.body) {
				mesh.mesh.rotation.z = body.body.rotation() + Math.PI / 2

			}
		})
	}
}
export default RenderingSystem