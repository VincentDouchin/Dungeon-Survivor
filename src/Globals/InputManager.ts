import { Raycaster, Vector3 } from "three";
import { UICamera, UIScene, camera, scene } from "./Initialize";

import EventBus from "../Utils/EventBus";

class Input {
	active = 0
	down = false
	get once() {
		if (this.active != 0) {
			this.active = 0
			return true
		}
		return false
	}
}
export interface InputController {
	eventBus: EventBus
}
class InputManager {
	eventBus = new EventBus()
	controllers: InputController[] = []
	inputs: Map<string, Input> = new Map()
	constructor(domElement: HTMLCanvasElement, inputNames: string[]) {
		inputNames.forEach(inputName => {
			this.inputs.set(inputName, new Input())
			this.eventBus.subscribe(inputName, (state: number) => {
				this.inputs.get(inputName)!.down = (state == 0)
				this.inputs.get(inputName)!.active = state
			})
		})
		const detectPointerEvent = (eventNames: Array<'mousedown' | 'mouseup' | 'mousemove' | 'touchstart' | 'touchend' | 'touchmove'>, state: 'down' | 'up' | 'move') => {
			eventNames.forEach(eventName => {
				domElement.addEventListener(eventName, (event: MouseEvent | TouchEvent) => {
					const target = event.target as HTMLCanvasElement
					const bounds = domElement.getBoundingClientRect()
					const clientX = (event instanceof TouchEvent ? event.touches[0]?.clientX : event.clientX) ?? 0
					const clientY = (event instanceof TouchEvent ? event.touches[0]?.clientY : event.clientY) ?? 0
					const x = ((clientX - bounds.left) / target.clientWidth) * 2 - 1
					const y = 1 - ((clientY - bounds.top) / target.clientHeight) * 2
					const mouse = {

						x,
						y,
						clientX: (UICamera.right * x),
						clientY: (UICamera.top * y),
					}
					var vec = new Vector3(); // create once and reuse
					var pos = new Vector3(); // create once and reuse

					vec.set(
						(clientX / window.innerWidth) * 2 - 1,
						- (clientY / window.innerHeight) * 2 + 1,
						200);

					vec.unproject(camera);

					vec.sub(camera.position).normalize();

					var distance = - camera.position.z / vec.z;
					pos.copy(camera.position).add(vec.multiplyScalar(distance));
					const raycaster = new Raycaster()
					raycaster.setFromCamera(mouse, UICamera);
					const uiObjects = raycaster.intersectObjects(UIScene.children, true).map(intersect => intersect.object.id)

					const raycasterScene = new Raycaster()
					raycasterScene.setFromCamera(mouse, camera);
					const objects = raycasterScene.intersectObjects(scene.children, true).map(intersect => intersect.object.id)

					this.eventBus.publish(state, { uiObjects, objects, ...mouse })
				})

			}, false)
		}




		detectPointerEvent(['mousedown', 'touchstart'], 'down')
		detectPointerEvent(['mouseup', 'touchend'], 'up')
		detectPointerEvent(['mousemove', 'touchmove'], 'move')


	}
	registerControllers(...inputControllers: Constructor<InputController>[]) {
		this.controllers = inputControllers.map(controller => new controller(this.eventBus))
	}
	getInput(inputName: string) {
		return this.inputs.get(inputName)
	}
	enable(inputname: string) {
		this.eventBus.publish('enable', inputname)
	}
	disable(inputname: string) {
		this.eventBus.publish('disable', inputname)
	}

}
export default InputManager