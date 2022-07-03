import * as THREE from 'three'
import Experience from './Experience.js'
import Portal from './Portal.js'
import Floor from './Floor.js'
import Stone from './Stone.js'
import Lights from './Lights.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setPortal()
                this.setFloor()
                this.setStone()
                this.setLights()
            }
        })
    }

    setPortal()
    {
        this.portal = new Portal()
    }

    setFloor()
    {
        this.floor = new Floor()
    }

    setStone()
    {
        this.stone = new Stone()
    }

    setLights()
    {
        this.lights = new Lights()
    }

    resize()
    {
    }

    update()
    {
        if (this.portal)
            this.portal.update()
    }

    destroy()
    {
    }
}