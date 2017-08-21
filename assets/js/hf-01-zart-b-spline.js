define(['js/twgl','js/2d-boilerplate','js/sylvester'],function(a,b,c){'use strict';const d={ClosedBSpline(a,b){this.Program(this.render,{element:a,id:b,width:640,height:480}),this.points=[],this.curvePoints=[],this.isDragging=!1,this.isMouseJustPressed=!0,this.draggedPoint=null,this.minPoints=4,this.coefficientMatrix=c.$M([[-1,3,-3,1],[3,-6,0,4],[-3,3,3,1],[1,0,0,0]]).multiply(1/6)},getClickedPoint(a){for(let b=0;b<this.points.length;++b)if(10>=this.points[b].distanceFrom(a))return this.points[b];return null},onMouseDown(a){this.isMouseJustPressed&&(this.draggedPoint=this.getClickedPoint(a),this.draggedPoint?this.isDragging=!0:this.points.push(a),this.isMouseJustPressed=!1)},onMouseUp(){this.isDragging=!1,this.draggedPoint=null,this.isMouseJustPressed=!0},onMouseMove(a){this.isDragging&&this.draggedPoint&&(this.draggedPoint.elements=a.elements)},calculateCurve(){if(this.curvePoints=[],this.points.length>=this.minPoints)for(let a=0;a<this.points.length;++a)this.calculatePiece(a)},calculatePiece(a){const b=c.$M([[0,0,0,0],[0,0,0,0]]);for(let c=0;4>c;++c){const d=(a+c)%this.points.length;b.elements[0][c]=this.points[d].elements[0],b.elements[1][c]=this.points[d].elements[1]}const d=b.multiply(this.coefficientMatrix);for(let b=0;1>=b;b+=0.01){const a=c.$V([b*b*b,b*b,b,1]);this.curvePoints.push(d.multiply(a))}},render(){this.renderPoints(),this.calculateCurve(),this.renderCurve()},renderCurve(){const b={position:{numComponents:2,data:[].concat.apply([],this.curvePoints.map((a)=>a.elements))}},c=a.createBufferInfoFromArrays(this.gl,b);a.setBuffersAndAttributes(this.gl,this.programInfo,c),a.setUniforms(this.programInfo,{color:[1,0,0,1]}),a.drawBufferInfo(this.gl,c,this.gl.LINE_STRIP)},renderPoints(){const b={position:{numComponents:2,data:[].concat.apply([],this.points.map((a)=>a.elements))}},c=a.createBufferInfoFromArrays(this.gl,b);a.setBuffersAndAttributes(this.gl,this.programInfo,c),a.setUniforms(this.programInfo,{color:[0,0,1,1]}),a.drawBufferInfo(this.gl,c,this.gl.POINTS),a.drawBufferInfo(this.gl,c,this.gl.LINE_STRIP)}};return Object.setPrototypeOf(d,b),function(a,b){const c=Object.create(d);c.ClosedBSpline(a,b),c.start(!1)}});