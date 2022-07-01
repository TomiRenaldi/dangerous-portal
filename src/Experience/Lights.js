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
        this.pointLights = new THREE.PointLight({ color: 0xffffff })
        this.pointLights.position.y = 1
        this.scene.add(this.pointLights)
    }
}