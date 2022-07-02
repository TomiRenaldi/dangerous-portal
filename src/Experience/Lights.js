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
        this.pointLights.position.y = 1
        this.scene.add(this.pointLights)
    }
}