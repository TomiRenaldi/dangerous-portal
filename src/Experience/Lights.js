import * as THREE from 'three'
import Experience from './Experience.js'

export default class Lights
{
    constructor ()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setPointLights()
    }

    setPointLights()
    {
        this.pointLights = new THREE.PointLight(0xa4a646, 1)
        this.pointLights.position.y = -0.25
        this.pointLights.castShadow = true
        this.pointLights.shadow.camera.near = 0.1
        this.pointLights.shadow.camera.far = 100
        this.scene.add(this.pointLights)
    }
}