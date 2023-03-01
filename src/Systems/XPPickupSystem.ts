import { ECS, Entity, System } from "../Globals/ECS";
import ECSEVENTS, { MANA_AMOUNT, MANA_PERCENT } from "../Constants/ECSEvents";

import { ALLSOUNDS } from "../Globals/Sounds";
import BodyComponent from "../Components/BodyComponent";
import COLLISIONGROUPS from "../Constants/CollisionGroups";
import ManaComponent from "../Components/ManaComponent";
import PositionComponent from "../Components/PositionComponent";
import StatsComponent from "../Components/StatsComponent";
import TokenComponent from "../Components/TokenComponent";
import XPComponent from "../Components/XPComponent";
import XPPickerComponent from "../Components/XPPickerComponent";
import { soundManager } from "../Globals/Initialize";

class XPPickupSystem extends System {
	constructor() {
		super(XPPickerComponent)
	}
	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const body = entity.getComponent(BodyComponent)
			const position = entity.getComponent(PositionComponent)
			const stats = entity.getRecursiveComponent(StatsComponent)
			const mana = entity.getRecursiveComponent(ManaComponent)
			body.contacts((otherEntity: Entity) => {

				const otherBody = otherEntity.getComponent(BodyComponent)
				const otherPosition = otherEntity.getComponent(PositionComponent)
				const x = position.x - otherPosition.x
				const y = position.y - otherPosition.y
				const orientation = { x: x > 0 ? 1 : -1, y: y > 0 ? 1 : -1 }
				const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
				const force = otherBody.moveForce.value * 1 / distance
				otherBody.body!.applyImpulse({ x: force * orientation.x, y: force * orientation.y }, true)


			}, COLLISIONGROUPS.SENSOR)
			body.contacts((otherEntity: Entity) => {
				const xp = otherEntity.getComponent(XPComponent)
				const token = otherEntity.getComponent(TokenComponent)
				if (xp) {
					otherEntity.destroy()
					stats?.updateXP(xp.amount)
				}
				if (token) {
					otherEntity.destroy()
					if (!mana) return
					mana.mana = Math.min(mana.maxMana.value, mana.mana + 15)
					soundManager.play(ALLSOUNDS.PowerUp, 0.3)
					ECS.eventBus.publish<MANA_PERCENT>(ECSEVENTS.MANA_PERCENT, mana.mana / mana.maxMana.value)
					ECS.eventBus.publish<MANA_AMOUNT>(ECSEVENTS.MANA_AMOUNT, mana.mana)
				}

			}, COLLISIONGROUPS.PLAYER)
		})
	}
}
export default XPPickupSystem