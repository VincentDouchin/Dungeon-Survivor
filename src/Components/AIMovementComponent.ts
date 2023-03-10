import { Component, Entity } from "../Globals/ECS";

import { Vector2 } from "three";

interface AIOption {
	seeking?: number[]
	seekingDistance?: number
	follower?: Entity
	followingDistance?: number
	followingFactor?: number
	charger?: boolean
}

class AIMovementComponent extends Component {
	enabled = true
	seeking?: number[]
	seekingDistance?: number
	follower?: Entity
	followingDistance: number
	followingFactor: Vector2
	charger: boolean
	chargingDirection: Vector2 | null = null
	chargingTimer: number = 0
	chargingResetTimer: number = 0
	constructor(options: AIOption) {
		super()
		this.seeking = options.seeking
		this.seekingDistance = options.seekingDistance
		this.follower = options.follower
		this.followingDistance = options.followingDistance ?? 50
		this.followingFactor = new Vector2(options.followingFactor ?? 1, options.followingFactor ?? 1)
		this.charger = options.charger ?? false

	}

}
AIMovementComponent.register()
export default AIMovementComponent