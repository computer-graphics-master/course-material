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
    `,e={vertexShader:c,fragmentShader:d,width:320,height:240},f=function(a){return new Promise(function(b){setTimeout(b,a)})},g={Program(a,b={}){this.render=a,this.settings=Object.assign({},e,b)},withPrefix(a){return`${this.settings.idPrefix}-${a}`},canvasMarkup(){return`<canvas id="${this.withPrefix('canvas')}" tabindex="0" width="${this.settings.width}" height="${this.settings.height}"></canvas>`},setupDOM(){return this.initDOM?this.initDOM():this.settings.container.append(this.canvasMarkup()),f(0)},setupGL(){if(this.canvas=document.getElementById(this.withPrefix('canvas')),this.setupEventHandlers(),this.gl=this.canvas.getContext('webgl'),!this.gl)throw new Error('Failed to setup WebGL!');this.programInfo=a.createProgramInfo(this.gl,[this.settings.vertexShader,this.settings.fragmentShader]),a.resizeCanvasToDisplaySize(this.gl.canvas),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.gl.useProgram(this.programInfo.program);const b={resolution:[this.gl.canvas.width,this.gl.canvas.height]};a.setUniforms(this.programInfo,b)},afterSetup(){},getMouseCoordinates(a){return b.$V([a.offsetX,a.offsetY])},setupEventHandlers(){this.canvas.addEventListener('mousedown',(a)=>this.onMouseDown(this.getMouseCoordinates(a),a)),this.canvas.addEventListener('mouseup',(a)=>this.onMouseUp(this.getMouseCoordinates(a),a)),this.canvas.addEventListener('mousemove',(a)=>this.onMouseMove(this.getMouseCoordinates(a),a)),this.canvas.addEventListener('wheel',(a)=>this.onWheel(this.getMouseCoordinates(a),a)),this.canvas.addEventListener('keydown',(a)=>this.onKeyDown(a),!0),this.canvas.addEventListener('keypress',(a)=>this.onKeyPress(a),!0),this.canvas.addEventListener('keyup',(a)=>this.onKeyUp(a),!0)},onMouseDown(){},onMouseUp(){},onMouseMove(){},onWheel(){},onKeyDown(){},onKeyPress(){},onKeyUp(){},drawOnce(){this.render()},drawContinuously(){this.drawOnce(),requestAnimationFrame(()=>this.drawContinuously())},start(a=!0){this.setupDOM().then(function(){this.setupGL(),this.afterSetup(),a?this.drawOnce():this.drawContinuously()}.bind(this))}};return g});