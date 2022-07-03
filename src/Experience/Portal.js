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
        this.time = this.experience.time

        this.group = new THREE.Group()
        this.scene.add(this.group)

        this.setMain()
    }

    setMain()
    {
        this.main = {}

        // Geometry
        this.main.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)

        // Material
        this.main.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color('#8c6700') },
                uColor2: { value: new THREE.Color('#bf8d00') },
                uColor3: { value: new THREE.Color('#d9c94e') },
                uColor4: { value: new THREE.Color('#ffee00') }
            },
            
            side: THREE.DoubleSide,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })

        // Mesh
        this.main.mesh = new THREE.Mesh(this.main.geometry, this.main.material)
        this.main.mesh.position.y = -0.1
        this.group.add(this.main.mesh)
    }

    update()
    {
        this.main.material.uniforms.uTime.value = this.time.elapsed
    }
}