import BACKGROUNDS, { backgroundName } from "../Constants/BackGrounds"
import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { LEVEL_UP, XP_PERCENT } from "../Constants/ECSEvents"
import ENEMYWAVES, { enemyWaveName } from "../Constants/EnemyEncounters"
import { inputManager, render, world } from "../Globals/Initialize"

import AnimationSystem from "../Systems/AnimationSystem"
import BackgroundElementSpawnerSystem from "../Systems/BackgroundElementSpawnerSystem"
import BackgroundEntity from "../Entities/BackgroundEntity"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import CameraSystem from "../Systems/CameraSystem"
import Encounter from "../Game/Encounter"
import Engine from "../Globals/Engine"
import ExpirationSystem from "../Systems/ExpirationSystem"
import FlockingSystem from "../Systems/FlockingSystem"
import { GameStates } from "../Constants/GameStates"
import HEROS from "../Constants/Heros"
import HealthSystem from "../Systems/HealthSystem"
import LightingSystem from "../Systems/LightingSystem"
import MovementSystem from "../Systems/MovementSystem"
import { PAUSE } from "../Constants/InputsNames"
import PlayerEntity from "../Entities/PlayerEntity"
import RenderSystem from "../Systems/RenderSystem"
import SelectionSystem from "../Systems/SelectionSystem"
import ShootingSystem from "../Systems/ShootingSystem"
import SkillSystem from "../Systems/SkillSystem"
import StatUpdateSystem from "../Systems/StatUpdateSystem"
import StatsComponent from "../Components/StatsComponent"
import SwitchingSystem from "../Systems/SwitchingSystem"
import TargetingSystem from "../Systems/TargetingSystem"
import UIRunEntity from "../UIEntities/UIRunEntity"
import WEAPONS from "../Constants/Weapons"
import XPPickupSystem from "../Systems/XPPickupSystem"

class RunState implements GameState {
	ui?: Entity
	background?: Entity
	player?: Entity
	stats = new StatsComponent(0, true)
	encounter: Encounter | null = null
	constructor() {
	}



	update() {
		world.step()
		ECS.updateSystems()
		if (inputManager.getInput(PAUSE)?.once) {
			Engine.setState(GameStates.pause)
		}
	}
	render() {

		render()
	}
	set(oldState: GameStates, options: { background?: backgroundName, enemies?: enemyWaveName }) {

		inputManager.enable('dpad')
		MovementSystem.register()
		AnimationSystem.register()
		HealthSystem.register()
		BodyCreationSystem.register()
		XPPickupSystem.register()
		LightingSystem.register()
		ShootingSystem.register()
		TargetingSystem.register()
		CameraSystem.register()
		RenderSystem.register()
		SwitchingSystem.register()
		FlockingSystem.register()
		StatUpdateSystem.register()
		SkillSystem.register()
		BackgroundElementSpawnerSystem.register()
		ExpirationSystem.register()
		SelectionSystem.register()
		this.ui = UIRunEntity()
		switch (oldState) {
			case GameStates.pause: {
				this.encounter?.resume()
			}; break
			case GameStates.levelUp: {
				this.encounter?.resume()
			}; break
			case GameStates.map: {
				// default: {
				this.background = BackgroundEntity(BACKGROUNDS[options?.background ?? 'GRAVEYARD']!)
				this.player = new Entity('player')
				this.player.addChildren(PlayerEntity(HEROS.knightMale, WEAPONS.swordKnight, true, this.stats))
				// this.player.addChildren(PlayerEntity(HEROS.elfMale, WEAPONS.bow, false, this.stats))
				this.player.addChildren(PlayerEntity(HEROS.wizardFemale, WEAPONS.staff, false, this.stats))

				this.encounter ??= ENEMYWAVES[options?.enemies ?? 'DEMONS']!.start()


			}; break
		}
		ECS.eventBus.publish<LEVEL_UP>(ECSEVENTS.LEVEL_UP, this.stats.level)
		ECS.eventBus.publish<XP_PERCENT>(ECSEVENTS.XP_PERCENT, this.stats.xp / this.stats.nextLevel)




	}
	unset(newState?: GameStates) {
		ECS.unRegisterSystems()
		inputManager.disable('dpad')
		this.ui?.destroy()
		switch (newState) {
			case GameStates.levelUp: {
				this.encounter?.pause()
			}; break
			case GameStates.pause: {
				this.encounter?.pause()
			}; break
			case GameStates.map: {
				this.background?.destroy()
				this.ui?.destroy()
				this.player?.destroy()
				this.encounter = null
			}; break
		}
	}
}

export default RunState