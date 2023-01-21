import { Vector3 } from "three";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import PositionComponent from "../Components/PositionComponent";
import ECSEVENTS from "../Constants/ECSEvents";
import { ECS, Entity, System } from "../Globals/ECS";
import { camera } from "../Globals/Initialize";

class CameraSystem extends System {
    frustumSize: number = 600
    newFrustrumSize?: number
    aspect: number = window.innerWidth / window.innerHeight
    constructor() {
        super(CameraTargetComponent)
    }
    update(entities: Entity[]): void {
        entities.forEach(entity => {
            const position = entity.getComponent(PositionComponent)
            const cameraTarget = entity.getComponent(CameraTargetComponent)
            ECS.eventBus.publish(ECSEVENTS.CAMERAMOVE, { x: position.x, y: position.y })
            if (cameraTarget.left && cameraTarget.right && cameraTarget.top && cameraTarget.bottom) {
                const width = cameraTarget.right - cameraTarget.left
                const height = cameraTarget.top - cameraTarget.bottom
                this.newFrustrumSize = Math.min(width, height)
                this.aspect = width < height ? window.innerWidth / window.innerHeight : window.innerHeight / window.innerWidth

            } else {
                this.newFrustrumSize = 700
                this.aspect = window.innerWidth / window.innerHeight
            }
            if (this.frustumSize != this.newFrustrumSize) {
                this.frustumSize = this.newFrustrumSize
                camera.left = -this.frustumSize / 2
                camera.right = this.frustumSize / 2
                camera.top = this.frustumSize / this.aspect / 2
                camera.bottom = -this.frustumSize / this.aspect / 2
                camera.updateProjectionMatrix()
            }

            if (cameraTarget?.bottom && cameraTarget.bottom - position.y > camera.bottom) {
                camera.position.y = cameraTarget.bottom - camera.bottom
            } else if (cameraTarget?.top && cameraTarget.top - position.y < camera.top) {
                camera.position.y = cameraTarget.top - camera.top
            } else {
                camera.position.y = position.y
            }
            if (cameraTarget?.left && cameraTarget.left - position.x > camera.left) {
                camera.position.x = cameraTarget.left - camera.left
            } else if (cameraTarget?.right && cameraTarget.right - position.x < camera.right) {
                camera.position.x = cameraTarget.right - camera.right
            } else {
                camera.position.x = position.x
            }
            camera.lookAt(new Vector3(camera.position.x, camera.position.y, 0))
        })
    }
}
export default CameraSystem