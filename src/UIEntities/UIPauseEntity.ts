import Coroutine from "../Globals/Coroutine";
import Engine from "../Globals/Engine"
import { Entity } from "../Globals/ECS"
import { GameStates } from "../Constants/GameStates"
import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import { inputManager } from "../Globals/Initialize"
import waitFor from "../Utils/WaitFor"

const UIPauseEntity = () => {
	const uiPause = new Entity('ui pause')
	const resume = new Entity('resume button')
	const buttonTile = assets.UI.button.framed(5, 30, 8)
	const buttonPressedTile = assets.UI.buttonpressed.framed(5, 30, 8)
	const sprite = resume.addComponent(new SpriteComponent(buttonTile, { scale: 4 }))
	resume.addComponent(new UIPositionComponent())
	resume.addComponent(new TextComponent('Resume', { size: 48 }))

	inputManager.eventBus.subscribe('down', ({ uiObjects }) => {
		if (uiObjects.includes(sprite.mesh.id)) {
			new Coroutine(function* () {
				sprite.renderShader!.uniforms.uTexture.value = buttonPressedTile.texture
				sprite.render()
				yield* waitFor(10)

				sprite.renderShader!.uniforms.uTexture.value = buttonTile.texture
				sprite.render()
				Engine.setState(GameStates.run)

			})
		}

	})
	uiPause.addChildren(resume)

	return uiPause
}
export default UIPauseEntity