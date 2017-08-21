define(['js/twgl','js/2d-boilerplate','js/hermite'],function(a,b,c){'use strict';const d=Object.create(b);return d.ContinuityExample=function(a,b){this.Program(this.render,{element:a,id:b})},d.render=function(){this.renderCurves(),this.renderPoints()},d.coeffs=[[0.03125,-0.1875,0,1],[-0.03125,0.1875,0,0],[0.0625,-0.5,1,0],[0.0625,-0.25,0,0]],d.geomConstraints=[[80,160,0,160],[180,120,-120,0],[160,240,160,0],[120,60,0,-120]],d.renderCurves=function(){const b=c.calculateCurve(this.geomConstraints.slice(0,2)),d=c.calculateCurve(this.geomConstraints.slice(2,4),this.coeffs,[0,4]),e={position:b.concat(d)},f=a.createBufferInfoFromArrays(this.gl,e);a.setBuffersAndAttributes(this.gl,this.programInfo,f),a.setUniforms(this.programInfo,{color:[1,0,0,1]}),a.drawBufferInfo(this.gl,f,this.gl.LINE_STRIP)},d.renderPoints=function(){const b={position:[this.geomConstraints[0][0],this.geomConstraints[1][0],0,this.geomConstraints[0][1],this.geomConstraints[1][1],0,this.geomConstraints[2][1],this.geomConstraints[3][1],0]},c=a.createBufferInfoFromArrays(this.gl,b);a.setBuffersAndAttributes(this.gl,this.programInfo,c),a.setUniforms(this.programInfo,{color:[0,0,1,1]}),a.drawBufferInfo(this.gl,c,this.gl.POINTS)},function(a,b){const c=Object.create(d);c.ContinuityExample(a,b),c.start()}});