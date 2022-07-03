import * as THREE from 'three'
import Experience from './Experience.js'

export default class Stone
{
    constructor ()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setStone()
    }

    setStone()
    {
        this.stone = {}
        this.stone.model = this.resources.items.stoneModel.scene
        this.stone.model.scale.set(0.02, 0.02, 0.02)
        this.stone.model.position.y = -0.5

        this.stone.model.traverse((_child) => {
            if (_child instanceof THREE.Mesh)
            {
                _child.castShadow = true
                _child.receiveShadow = true
            }
        })

        this.scene.add(this.stone.model)
    }
}