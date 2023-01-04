
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import ECSEVENTS from "../Constants/ECSEvents"
import AssetManager from "../Globals/AssetManager"
import { ECS, Entity } from "../Globals/ECS"
// import { camera } from "../Globals/Initialize"
import getBuffer from "../Utils/Buffer"
import Tile from "../Utils/Tile"
import BrasierEntity from "./BrasierEntity"

const BackgroundEntity = () => {
	const background = new Entity()
	const position = new PositionComponent(0, 0)
	background.addComponent(position)
	// const width = Math.floor(camera.right * 2.5 / 16) * 16
	// const height = Math.floor(camera.top * 2.5 / 16) * 16

	// const buffer = getBuffer(width, height)
	const floorTiles: Array<[Tile, number]> = [
		[AssetManager.tiles.floor_1, 10],
		[AssetManager.tiles.floor_2, 1],
		[AssetManager.tiles.floor_3, 1],
		[AssetManager.tiles.floor_4, 1],
		[AssetManager.tiles.floor_5, 1],
		[AssetManager.tiles.floor_6, 1],
		[AssetManager.tiles.floor_7, 1],
		[AssetManager.tiles.floor_8, 1],
	]
	const totalWeight = floorTiles.reduce((acc, v) => acc + v[1], 0)
	const allTiles = floorTiles.flatMap(([tile, weight]) => new Array(weight).fill(tile))

	for (let x = 0; x < Math.ceil(width / 16) * 16; x += 16) {
		for (let y = 0; y < Math.ceil(height / 16) * 16; y += 16) {
			const randomTile = allTiles[Math.floor(totalWeight * Math.random())]
			buffer.drawImage(randomTile.buffer.canvas, x, y)


		}
	}
	for (let x = 0; x < width; x += 256) {
		for (let y = 0; y < height; y += 256) {
			background.addChildren(BrasierEntity({ x: x - width / 2, y: y - height / 2 }))
		}
	}
	const mesh = new MeshComponent(new Tile({ buffer }), { renderOrder: 0 })
	ECS.eventBus.subscribe(ECSEVENTS.CAMERAMOVE, ({ x, y }: { x: number, y: number }) => {
		// mesh.texture.offset.x = x / mesh.width
		// mesh.texture.offset.y = y / mesh.height
		position.x = x
		position.y = y
	})
	background.addComponent(mesh)
	return background
}
export default BackgroundEntity