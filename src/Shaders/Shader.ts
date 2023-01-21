import { ShaderMaterial, Uniform } from "three"
import SpriteComponent from "../Components/SpriteComponent"

abstract class Shader {
	uniforms: (sprite: SpriteComponent) => Record<string, any>
	abstract vert: string
	abstract frag: string
	constructor(uniforms: (sprite: SpriteComponent) => Record<string, any>) {
		this.uniforms = uniforms
	}
	create(sprite: SpriteComponent) {
		const mat = new ShaderMaterial({
			transparent: true,
			vertexShader: this.vert,
			fragmentShader: this.frag,
			uniforms: Object.fromEntries(Object.entries(this.uniforms(sprite)).map(([key, val]) => [key, new Uniform(val)]))
		})
		return mat
	}
}
export default Shader