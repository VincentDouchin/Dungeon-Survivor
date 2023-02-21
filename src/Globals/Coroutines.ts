export interface Coroutine {
	generator: Generator
	state: 'running' | 'stopped'
}
const Coroutines: {
	coroutines: Coroutine[],
	add: (fn: () => Generator) => Coroutine,
	run: () => void,
	stop: () => void,
	resume: () => void,
} = {

	coroutines: [],
	add(fn: () => Generator): Coroutine {
		const generator = fn()
		generator.next()
		const coroutine: Coroutine = { generator, state: 'running' }
		this.coroutines.push(coroutine)
		return coroutine
	},
	run() {
		for (let i = this.coroutines.length - 1; i >= 0; i--) {
			if (this.coroutines[i].state == 'stopped') continue
			const { done } = this.coroutines[i].generator.next()
			if (done) {
				this.coroutines.splice(i, 1)
			}
		}
	},
	stop() {
		this.coroutines.forEach(coroutine => {
			coroutine.state = 'stopped'
		})
	},
	resume() {
		this.coroutines.forEach(coroutine => {
			coroutine.state = 'running'
		})
	}
}

export default Coroutines