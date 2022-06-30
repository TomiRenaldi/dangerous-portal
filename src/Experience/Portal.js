import * as THREE from 'three'
import Experience from './Experience.js'

import vertexShader from './shaders/portal/vertex.glsl'
import fragmentShader from './shaders/portal/fragment.glsl'

export default class Portal
{
    constructor ()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.group = new THREE.Group()
        this.scene.add(this.group)

        this.setMain()
    }

    setMain()
    {
        this.main = {}
        this.main.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
        this.main.material = new THREE.ShaderMaterial({
            uniforms: {
                uColor1: { value: new THREE.Color('#8c6700') },
                uColor2: { value: new THREE.Color('#bf8d00') },
                uColor3: { value: new THREE.Color('#d9c94e') }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })
        this.main.mesh = new THREE.Mesh(this.main.geometry, this.main.material)
        this.group.add(this.main.mesh)
    }
}