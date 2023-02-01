import { Color } from "three"
import { Level } from "../../ldtk"
import Tile from "../Utils/Tile"
import { assets } from "../Globals/Initialize"

export type backgroundName = 'FOREST' | 'DUNGEON' | 'CAMP' | 'GRAVEYARD' | 'TOWN' | 'CASTLE'

export interface Background {
	level: string
	lightColor?: Color
	subLevels?: Level[]
	obstacles?: Tile[]
	obstaclesDensity?: number
}

const BACKGROUNDS: Partial<Record<backgroundName, Background>> = {
	DUNGEON: {
		level: 'DUNGEON',
		lightColor: new Color('hsl(0,0%,4%)')
	},
	FOREST: {
		level: 'FOREST',
		lightColor: new Color('hsl(0,0%,100%)'),
		subLevels: assets.arenas.levels.filter(level => level.identifier.includes('FOREST_')),
		obstacles: [...new Array(3).fill(assets.nature.tree1), assets.nature.stumpbig, assets.nature.stumpsmall1, assets.nature.trunksmall],
		obstaclesDensity: 0.3
	},
	CAMP: {
		level: 'CAMP',
		lightColor: new Color('hsl(0,0%,100%)')
	},
	GRAVEYARD: {
		level: 'GRAVEYARD',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [assets.elements.grave1, assets.elements.grave2, assets.elements.grave3, assets.elements.grave4],
		obstaclesDensity: 0.3
	},
	TOWN: {
		level: 'TOWN',
		lightColor: new Color('hsl(0,0%,100%)')
	},
	CASTLE: {
		level: 'CASTLE',
		lightColor: new Color('hsl(0,0%,100%)')
	}

}
export default BACKGROUNDS