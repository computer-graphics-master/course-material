define(['js/twgl','js/sylvester'],function(a){'use strict';const b=`attribute vec4 position;
    
    void main() {
      gl_Position = position;
      gl_PointSize = 6.0;
    }`,c=`precision mediump float;

    uniform vec4 color;
    
    void main() {
        gl_FragColor = color;
    }
    `,d={vertexShader:b,fragmentShader:c,width:320,height:240},e=function(a){return new Promise(function(b){setTimeout(b,a)})},f={Program(a,b={}){this.render=a,this.settings=Object.assign({},d,b)},setupDOM(){return this.settings.element.append(`<canvas id="${this.settings.id}" width="${this.settings.width}" height="${this.settings.height}"></canvas>`),e(0)},setupGL(){if(this.gl=document.getElementById(this.settings.id).getContext('webgl'),!this.gl)throw new Error('Failed to setup WebGL!');this.programInfo=a.createProgramInfo(this.gl,[this.settings.vertexShader,this.settings.fragmentShader]),a.resizeCanvasToDisplaySize(this.gl.canvas),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.gl.useProgram(this.programInfo.program)},drawOnce(){this.render()},drawContinously(){this.drawOnce(),requestAnimationFrame(()=>this.drawContinously())},start(a=!0){this.setupDOM().then(function(){this.setupGL(),a?this.drawOnce():this.drawContinously()}.bind(this))}};return f});