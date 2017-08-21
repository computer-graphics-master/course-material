define(['js/twgl','js/sylvester'],function(a,b){'use strict';const c=`attribute vec2 position;

    uniform vec2 resolution;
    
    void main() {
        // Convert coordinates to -1 -> 1
        vec2 clipSpace = (position / resolution) * 2.0 - 1.0;

        // Move origin to the top-left corner
        gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
        gl_PointSize = 6.0;
    }`,d=`precision mediump float;

    uniform vec4 color;
    
    void main() {
        gl_FragColor = color;
    }
    `,e={vertexShader:c,fragmentShader:d,width:320,height:240},f=function(a){return new Promise(function(b){setTimeout(b,a)})},g={Program(a,b={}){this.render=a,this.settings=Object.assign({},e,b)},setupDOM(){return this.settings.element.append(`<canvas id="${this.settings.id}" width="${this.settings.width}" height="${this.settings.height}"></canvas>`),f(0)},setupGL(){if(this.canvas=document.getElementById(this.settings.id),this.setupEventHandlers(),this.gl=this.canvas.getContext('webgl'),!this.gl)throw new Error('Failed to setup WebGL!');this.programInfo=a.createProgramInfo(this.gl,[this.settings.vertexShader,this.settings.fragmentShader]),a.resizeCanvasToDisplaySize(this.gl.canvas),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.gl.useProgram(this.programInfo.program);const b={resolution:[this.gl.canvas.width,this.gl.canvas.height]};a.setUniforms(this.programInfo,b)},getMouseCoordinates(a){return b.$V([a.offsetX,a.offsetY])},setupEventHandlers(){this.canvas.addEventListener('mousedown',(a)=>this.onMouseDown(this.getMouseCoordinates(a))),this.canvas.addEventListener('mouseup',(a)=>this.onMouseUp(this.getMouseCoordinates(a))),this.canvas.addEventListener('mousemove',(a)=>this.onMouseMove(this.getMouseCoordinates(a)))},onMouseDown(){},onMouseUp(){},onMouseMove(){},drawOnce(){this.render()},drawContinuously(){this.drawOnce(),requestAnimationFrame(()=>this.drawContinuously())},start(a=!0){this.setupDOM().then(function(){this.setupGL(),a?this.drawOnce():this.drawContinuously()}.bind(this))}};return g});