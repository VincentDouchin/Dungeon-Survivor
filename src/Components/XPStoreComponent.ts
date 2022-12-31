import ECSEVENTS from "../Constants/ECSEvents";
import { Component, ECS } from "../Globals/ECS";
import Engine from "../Globals/Engine";

class XPStoreComponent extends Component {
	xp = 0
	level = 0
	nextLevel = 10
	constructor() {
		super()
		ECS.eventBus.subscribe(ECSEVENTS.XP, (amount: number) => this.updateXP(amount))
	}
	updateXP(amount: number) {
		this.xp += amount
		ECS.eventBus.publish(ECSEVENTS.XPPERCENT, this.xp / this.nextLevel)
		const levelUp = Math.floor(this.xp / this.nextLevel)
		if (levelUp > 0) {
			for (let i = 0; i < levelUp; i++) {
				this.xp = this.xp % this.nextLevel
				this.nextLevel *= 1.5
				this.level++
				ECS.eventBus.publish(ECSEVENTS.LEVELUP, this.level)
			}
			Engine.setState('levelUp')
		}
	}
}
XPStoreComponent.register()
export default XPStoreComponent