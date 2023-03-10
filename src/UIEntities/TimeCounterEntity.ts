import { ECS, Entity } from "../Globals/ECS";
import { ECSEVENTS, UIEVENTS } from "../Constants/Events";

import SpriteComponent from "../Components/SpriteComponent";
import State from "../Globals/State";
import TextComponent from "../Components/TextComponent";
import UIPositionComponent from "../Components/UIPositionComponent";
import assets from "../Globals/Assets";

const formatTimer = () => `${Math.floor(State.timer / 60)}:${String(State.timer % 60).padStart(2, '0')}`

const TimeCounterEntity = () => {
	const timer = new Entity('timer')
	timer.addComponent(new SpriteComponent(assets.UI.frame2.framed(8, 24, 0), { scale: 1.5 }))
	const position = timer.addComponent(new UIPositionComponent({ x: 0, y: 2 }, { x: 0, y: 1 }))
	position.moveTo(1, 20)

	const timerText = timer.addComponent(new TextComponent(formatTimer(),))
	const enemyLevel = new Entity('enemy level')
	enemyLevel.addComponent(new SpriteComponent(assets.icons.skull, { scale: 2 }))
	enemyLevel.addComponent(new UIPositionComponent({ x: 1, y: 0 }, { x: -1, y: 0 }))
	const enemyLevelText = enemyLevel.addComponent(new TextComponent(String(0), { outlineWidth: 1 }))
	const timerSub = ECS.eventBus.subscribe(ECSEVENTS.TIMER, (_) => {
		timerText.setText(formatTimer())
	})
	const enemyLevelSub = ECS.eventBus.subscribe(UIEVENTS.ENEMY_LEVEL, (level) => {
		enemyLevelText.setText(String(level))
	})
	timer.addChildren(enemyLevel)
	timer.onDestroy(() => {
		enemyLevelSub()
		timerSub()
	})
	return timer
}
export default TimeCounterEntity