import * as THREE from 'three'
import Experience from './Experience.js'

export default class Floor
{
    constructor ()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setTexture()
        this.setFloor()
    }

    setTexture()
    {
        this.texture = {}

        this.texture.repeatCount = 2

        this.texture.color = this.resources.items.floorColorTexture
        this.texture.color.encoding = THREE.sRGBEncoding
        this.texture.color.wrapS = THREE.RepeatWrapping
        this.texture.color.wrapT = THREE.RepeatWrapping
        this.texture.color.repeat.set(this.texture.repeatCount, this.texture.repeatCount)

        this.texture.normal = this.resources.items.floorNormalTexture
        this.texture.normal.wrapS = THREE.RepeatWrapping
        this.texture.normal.wrapT = THREE.RepeatWrapping
        this.texture.normal.repeat.set(this.texture.repeatCount, this.texture.repeatCount)

        this.texture.displacement = this.resources.items.floorDisplacementTexture
        this.texture.displacement.wrapS = THREE.RepeatWrapping
        this.texture.displacement.wrapT = THREE.RepeatWrapping
        this.texture.displacement.repeat.set(this.texture.repeatCount, this.texture.repeatCount)

        this.texture.roughness = this.resources.items.floorRoughnessTexture
        this.texture.roughness.wrapS = THREE.RepeatWrapping
        this.texture.roughness.wrapT = THREE.RepeatWrapping
        this.texture.roughness.repeat.set(this.texture.repeatCount, this.texture.repeatCount)
    }

    setFloor()
    {
        this.floor = {}

        this.floor.normalScale = 1

        // Geometry
        this.floor.geometry = new THREE.PlaneGeometry(10, 10, 300, 300)
        this.floor.geometry.rotateX(- Math.PI * 0.5)
        this.floor.geometry.attributes.uv2 = this.floor.geometry.attributes.uv

        // Material
        this.floor.material = new THREE.MeshStandardMaterial({
            map: this.texture.color,
            normalMap: this.texture.normal,
            normalScale: new THREE.Vector2(this.floor.normalScale, this.floor.normalScale),
            displacementMap: this.texture.displacement,
            displacementScale: 0.1,
            roughnessMap: this.texture.roughness,
            roughness: 1
        })

        this.floor.material.onBeforeCompile = (_shader) => {
            _shader.fragmentShader = _shader.fragmentShader.replace(
                'gl_FragColor = vec4(',
                `
                    float fadeOut = length(vUv - ${(0.5 * this.texture.repeatCount).toFixed(2)});
                    fadeOut -= 0.4;
                    fadeOut *= 2.0;
                    fadeOut = smoothstep(0.0, 1.0, fadeOut);
                    outgoingLight = mix(outgoingLight, vec3(0.0), fadeOut);
                    // outgoingLight = vec3(fadeOut);
                    gl_FragColor = vec4(
                `
            )
        }
        
        // Mesh
        this.floor.mesh = new THREE.Mesh(this.floor.geometry, this.floor.material)
        this.floor.mesh.receiveShadow = true
        this.floor.mesh.position.y = - 0.5
        this.scene.add(this.floor.mesh)
    }
}