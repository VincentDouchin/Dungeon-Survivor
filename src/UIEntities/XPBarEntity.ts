import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { XP_PERCENT } from "../Constants/ECSEvents"

import BarShader from "../Shaders/BarShader"
import SpriteComponent from "../Components/SpriteComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets";
import framedTile from "../Utils/FramedTile"

const scalingOptions = { x: { left: 2, right: 5 }, y: { top: 0, bottom: 0 } }
const w = window.innerWidth * 0.04
const h = 7
const bar = framedTile(assets.UI.bar, scalingOptions, w, h)
const full = framedTile(assets.UI.xp, scalingOptions, w, h)
const XPBarEntity = () => {
	const xpBar = new Entity('xp bar')
	const sprite = xpBar.addComponent(new SpriteComponent(bar, { renderOrder: 100, scale: 3, shaders: [new BarShader(full.texture, 0)] }))
	ECS.eventBus.subscribe<XP_PERCENT>(ECSEVENTS.XP_PERCENT, (percent: number) => {
		sprite.uniforms.percent = percent
	})
	xpBar.addComponent(new UIPositionComponent({ x: 1, y: 1 }, { x: -1, y: 1 }))
	return xpBar
}
export default XPBarEntity