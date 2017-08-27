define(['js/twgl','js/2d-boilerplate','js/sylvester','js/style','js/util','js/matrix-form'],function(a,b,c,d,e,f){'use strict';const g={CardinalSplineSegmentDemo(a,b){this.Program(this.render,{container:a,idPrefix:b,width:640,height:480}),this.points=[c.$V([80,400]),c.$V([160,200]),c.$V([240,200]),c.$V([320,400])],this.curvePoints=[],this.isDragging=!1,this.isMouseJustPressed=!0,this.draggedPoint=null,this.tension=0,this.calculateCoefficientMatrix()},initDOM(){const a=this.settings.container;a.css('display','flex');const b=$('<span></span>');b.css('flex','1');const c=$('<div></div>');c.addClass('canvas-controller'),c.append(this.createNumberInput('Tension','tension',0,0.025,(a)=>this.changeTension(a))),b.append(c);const d=$('<span></span>');d.css('flex','2'),d.append(this.canvasMarkup()),a.append(b),a.append(d)},createNumberInput(a,b,c,d,e){const f=this.withPrefix(b),g=$(`<input type="number" value="${c}" id="${f}" name="${f}" step="${d}"/>`);g.on('input',e);const h=$('<div></div>');return h.addClass('controller-input-container'),h.append(`<label for="${f}">${a}</label>`),h.append(g),h},changeTension(a){const b=Number.parseFloat(a.target.value);Number.isNaN(b)||(this.tension=b,this.calculateCoefficientMatrix())},getClickedPoint(a){for(let b=0;b<this.points.length;++b)if(10>=this.points[b].distanceFrom(a))return this.points[b];return null},onMouseDown(a){this.isMouseJustPressed&&(this.draggedPoint=this.getClickedPoint(a),this.draggedPoint&&(this.isDragging=!0),this.isMouseJustPressed=!1)},onMouseUp(){this.isDragging=!1,this.draggedPoint=null,this.isMouseJustPressed=!0},onMouseMove(a){this.isDragging&&this.draggedPoint&&(this.draggedPoint.elements=a.elements)},calculateCoefficientMatrix(){const a=0.5*(1-this.tension);this.coefficientMatrix=c.$M([[-a,2*a,-a,0],[2-a,a-3,0,1],[a-2,3-2*a,a,0],[a,-a,0,0]]),this.curveCalculator=f(this.coefficientMatrix)},calculateChords(){this.chords=[e.toPositionArray(e.line(this.points[0],this.points[2],0.05)),e.toPositionArray(e.line(this.points[1],this.points[3],0.05))]},calculateTangents(){const a=0.5*(1-this.tension);this.tangents=e.toPositionArray([this.points[1],this.points[1].add(this.points[2].subtract(this.points[0]).multiply(a)),this.points[2],this.points[2].add(this.points[3].subtract(this.points[1]).multiply(a))])},calculateCurve(){this.curvePoints=this.curveCalculator(this.points)},render(){this.calculateCurve(),this.calculateChords(),this.calculateTangents(),this.renderChords(),this.renderCurve(),this.renderTangents(),this.renderPoints()},renderCurve(){const b={color:d.colors.curve},c={position:{numComponents:2,data:e.toPositionArray(this.curvePoints)}},f=a.createBufferInfoFromArrays(this.gl,c);a.setBuffersAndAttributes(this.gl,this.programInfo,f),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,f,this.gl.LINE_STRIP)},renderPoints(){const b={color:d.colors.controlPoint},c={position:{numComponents:2,data:e.toPositionArray(this.points)}},f=a.createBufferInfoFromArrays(this.gl,c);a.setBuffersAndAttributes(this.gl,this.programInfo,f),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,f,this.gl.POINTS)},renderChords(){const b={color:d.colors.controlPolygon};for(let c of this.chords){const d=a.createBufferInfoFromArrays(this.gl,{position:{numComponents:2,data:c}});a.setBuffersAndAttributes(this.gl,this.programInfo,d),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,d,this.gl.LINES)}},renderTangents(){const b={color:d.colors.semiCurve},c={position:{numComponents:2,data:this.tangents}},e=a.createBufferInfoFromArrays(this.gl,c);a.setBuffersAndAttributes(this.gl,this.programInfo,e),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,e,this.gl.LINES)}};return Object.setPrototypeOf(g,b),function(a,b){const c=Object.create(g);c.CardinalSplineSegmentDemo(a,b),c.start(!1)}});