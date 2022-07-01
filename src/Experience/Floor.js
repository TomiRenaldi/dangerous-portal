import * as THREE from 'three'
import Experience from './Experience.js'

export default class floor
{
    constructor ()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setFloor()
    }

    setFloor()
    {
        this.floor = {}
        this.floor.geometry = new THREE.PlaneGeometry(10, 10, 1, 1)
        this.floor.geometry.rotateX(- Math.PI * 0.5)
        this.floor.material = new THREE.MeshStandardMaterial({ color: 0xffffff })
        this.floor.mesh = new THREE.Mesh(this.floor.geometry, this.floor.material)
        this.floor.mesh.position.y = - 0.5
        this.scene.add(this.floor.mesh)
    }
}