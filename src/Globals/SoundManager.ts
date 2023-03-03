import SOUNDS_SOURCES, { SOUNDS } from './Sounds'

import saveData from './SaveManager'

class SoundManager {
	sounds: Record<keyof typeof SOUNDS_SOURCES, HTMLAudioElement> = SOUNDS_SOURCES

	constructor() {
	}
	play(name: SOUNDS, volume = 1, playbackRate = 1) {
		const selectedSound: keyof typeof SOUNDS_SOURCES = Array.isArray(name) ? name[Math.floor(Math.random() * name.length)] : name
		const sound = this.sounds[selectedSound].cloneNode() as HTMLAudioElement
		sound.volume = volume * saveData.volume
		sound.playbackRate = playbackRate
		return sound
	}

}
export default SoundManager