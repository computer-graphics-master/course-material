define(['js/twgl','js/2d-boilerplate','js/sylvester','js/bezier','js/style','js/util'],function(a,b,c,d,e,f){'use strict';const g={DeCasteljauDemo(a,b){this.Program(this.render,{container:a,idPrefix:b,width:640,height:480}),this.points=[c.$V([80,400]),c.$V([200,100]),c.$V([320,400]),c.$V([440,100])],this.curvePoints=[],this.isDragging=!1,this.isMouseJustPressed=!0,this.draggedPoint=null,this.deCasteljauParameter=0.5},getClickedPoint(a){for(let b=0;b<this.points.length;++b)if(10>=this.points[b].distanceFrom(a))return this.points[b];return null},onMouseDown(a){this.isMouseJustPressed&&(this.draggedPoint=this.getClickedPoint(a),this.draggedPoint&&(this.isDragging=!0),this.isMouseJustPressed=!1)},onMouseUp(){this.isDragging=!1,this.draggedPoint=null,this.isMouseJustPressed=!0},onMouseMove(a){this.isDragging&&this.draggedPoint&&(this.draggedPoint.elements=a.elements),this.deCasteljauParameter=1-(this.settings.width-a.elements[0])/this.settings.width},calculateCurve(){this.curvePoints=d.calculateCurve(this.points)},render(){this.renderPoints(),this.calculateCurve(),this.renderCurve(),this.renderDeCasteljauPoints()},renderDeCasteljauPoints(){const b=d.deCasteljauPoints(this.points,this.deCasteljauParameter),c={color:e.colors.semiCurve};let g,h;for(let d=0;d<b.length-1;++d)g={position:{numComponents:2,data:f.flattenArray(b[d].map((a)=>a.elements))}},h=a.createBufferInfoFromArrays(this.gl,g),a.setBuffersAndAttributes(this.gl,this.programInfo,h),a.setUniforms(this.programInfo,c),a.drawBufferInfo(this.gl,h,this.gl.LINE_STRIP),a.drawBufferInfo(this.gl,h,this.gl.POINTS);g={position:{numComponents:2,data:f.flattenArray(b.pop().map((a)=>a.elements))}},c.color=e.colors.curve,h=a.createBufferInfoFromArrays(this.gl,g),a.setBuffersAndAttributes(this.gl,this.programInfo,h),a.setUniforms(this.programInfo,c),a.drawBufferInfo(this.gl,h,this.gl.POINTS)},renderCurve(){const b={color:e.colors.curve},c={position:{numComponents:2,data:this.curvePoints}},d=a.createBufferInfoFromArrays(this.gl,c);a.setBuffersAndAttributes(this.gl,this.programInfo,d),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,d,this.gl.LINE_STRIP)},renderPoints(){const b={color:e.colors.controlPolygon},c={position:{numComponents:2,data:[].concat.apply([],this.points.map((a)=>a.elements))}},d=a.createBufferInfoFromArrays(this.gl,c);a.setBuffersAndAttributes(this.gl,this.programInfo,d),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,d,this.gl.LINE_STRIP),b.color=e.colors.controlPoint,a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,d,this.gl.POINTS)}};return Object.setPrototypeOf(g,b),function(a,b){const c=Object.create(g);c.DeCasteljauDemo(a,b),c.start(!1)}});