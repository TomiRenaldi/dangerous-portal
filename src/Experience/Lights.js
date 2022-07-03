import * as THREE from 'three'
import Experience from './Experience.js'

export default class Lights
{
    constructor ()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Debug
        this.debugFolder = this.debug.addFolder({
            title: 'lights',
            expanded: false,
        })

        this.setPointLights()
    }

    setPointLights()
    {
        this.pointLights = {}

        this.pointLights.color = '#aaad1c'
        this.pointLights.position = new THREE.Vector3(0, -0.25, 0)
        this.pointLights.intensity = 1

        this.pointLights.instance = new THREE.PointLight(this.pointLights.color, 1, 0, 1.5)
        this.pointLights.instance.position.y = -0.35
        this.pointLights.instance.castShadow = true
        this.pointLights.instance.shadow.camera.near = 0.1
        this.pointLights.instance.shadow.camera.far = 100
        this.pointLights.instance.shadow.mapSize.x = 1024
        this.pointLights.instance.shadow.mapSize.y = 1024
        this.scene.add(this.pointLights.instance)

        // Debug
        this.debugFolder
            .addInput(
                this.pointLights,
                'color',
                { view: 'color' }
            )
            .on('change', () => {
                this.pointLights.instance.color.set(this.pointLights.color)
            })

        this.debugFolder
            .addInput(
                this.pointLights,
                'intensity',
                { min: 0, max: 10 }
            )

        this.debugFolder
            .addInput(
                this.pointLights.instance,
                'decay',
                { min: 0, max: 10 }
            )

        this.debugFolder
            .addInput(
                this.pointLights.position,
                'y',
                { min: 0, max: 10 }
            )
    }

    update()
    {
        this.pointLights.instance.position.copy(this.pointLights.position)
        this.pointLights.instance.intensity = this.pointLights.intensity + Math.sin(this.time.elapsed * 0.0001 * 100) * 0.25
        this.pointLights.instance.position.x = Math.sin(this.time.elapsed * 0.0001 * 100) * 0.02
        this.pointLights.instance.position.y = Math.sin(this.time.elapsed * 0.00006 * 100) * 0.02
        this.pointLights.instance.position.z = Math.sin(this.time.elapsed * 0.00004 * 100) * 0.02
    }
}