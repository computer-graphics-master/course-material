define(['js/twgl','js/2d-boilerplate','js/sylvester','js/style','js/util','js/transformation-chain','js/camera'],function(a,b,c,d,e,f,g){'use strict';const h=`attribute vec2 position;
    attribute vec3 color;
    varying vec4 passColor;

    uniform vec2 resolution;
    
    void main() {
        // Convert coordinates to -1 -> 1
        vec2 clipSpace = (position / resolution) * 2.0 - 1.0;

        // Move origin to the top-left corner
        gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
        gl_PointSize = 6.0;
        passColor = vec4(color, 1);
    }`,i=`precision mediump float;

    varying vec4 passColor;
    
    void main() {
        gl_FragColor = passColor;
    }
    `,j={CubicSplinePatch(a,b,d){this.mesh=d,this.Program(this.render,{container:a,idPrefix:b,width:640,height:480,vertexShader:h,fragmentShader:i}),this.centerVec=c.$V([0,0,100,1]),this.camera=Object.create(g),this.camera.Camera(c.$V([0,0,0]),c.$V([0,1,0]),300,-15,3.9),this.points=[],this.selectedAxis='X';for(let e=-1.5;1.5>=e;e+=1)for(let a=-1.5;1.5>=a;a+=1){const b=c.$V([e,0,a,1]);b.isSelected=!1,this.points.push(b)}this.points[0].elements[1]=2,this.points[3].elements[1]=2,this.points[12].elements[1]=2,this.points[15].elements[1]=2,this.mesh.bindControlPoints(this.points),this.windowToViewport=e.matrix.windowToViewport(c.$V([-0.5,-0.5]),c.$V([0.5,0.5]),c.$V([120,90]),c.$V([520,390])),this.persProj=e.matrix.persProj(100),this.mesh.visibilityTransformationChain.push(this.camera.viewMatrix),this.mesh.transformationChain.push(this.camera.viewMatrix,this.persProj,this.windowToViewport),this.mesh.visibilityTransformationChain.recalculate(),this.mesh.transformationChain.recalculate(),this.isDragging=!1,this.isMouseJustPressed=!0,this.draggedPoint=null,this.isShowControlPoints=!0,this.isShowControlNet=!0},initDOM(){const a=this.settings.container;a.css('display','flex');const b=$('<span></span>');b.css('flex','1');const c=$('<div></div>');c.addClass('canvas-controller'),c.append(this.createCheckbox('Kontrollpontok megjelen\xEDt\xE9se','isshowcontrolpoints',(a)=>this.changeIsShowControlPoints(a))),c.append(this.createCheckbox('Kontrollh\xE1l\xF3 megjelen\xEDt\xE9se','isshowcontrolnet',(a)=>this.changeIsShowControlNet(a))),b.append(c);const d=$('<span></span>');d.css('flex','2'),d.append(this.canvasMarkup()),a.append(b),a.append(d)},createCheckbox(a,b,c){const d=this.withPrefix(b),e=$(`<input type="checkbox" id="${d}" name="${d}" checked/>`);e.on('change',c);const f=$('<div></div>');return f.addClass('controller-input-container'),f.append(`<label for="${d}">${a}</label>`),f.append(e),f},changeIsShowControlPoints(a){this.isShowControlPoints=a.target.checked},changeIsShowControlNet(a){this.isShowControlNet=a.target.checked},getClickedPoint(a){const b=this.mesh.transformationChain.getResult();for(let d,e=0;e<this.points.length;++e)if(d=this.points[e],d=b.multiply(d),d=d.multiply(1/d.elements[3]),d=c.$V([d.elements[0],d.elements[1]]),10>=d.distanceFrom(a))return this.points[e];return null},onMouseDown(a){this.isMouseJustPressed&&(this.draggedPoint&&(this.draggedPoint.isSelected=!1,this.draggedPoint=null),this.draggedPoint=this.getClickedPoint(a),this.draggedPoint&&(this.draggedPoint.isSelected=!0),this.isMouseJustPressed=!1)},onMouseUp(){this.isMouseJustPressed=!0},update(){this.visibleFaces=this.mesh.update(this.centerVec).concat([]),this.sortFaces(),this.mesh.resetTransformedVertices()},sortFaces(){this.visibleFaces.sort((a,b)=>{return this.mesh.faces[a].z-this.mesh.faces[b].z})},render(){this.update(),this.renderSurface(),this.isShowControlNet&&this.renderControlNet(),this.isShowControlPoints&&this.renderPoints()},renderControlNet(){const b=this.mesh.transformationChain.getResult();for(let d=0;4>d;++d){const f=[],g=[];for(let a,e=0;4>e;++e)a=this.points[4*d+e],a=b.multiply(a),a=a.multiply(1/a.elements[3]),f.push(c.$V([a.elements[0],a.elements[1]])),g.push(c.$V([0,0,0]));const h={position:{numComponents:2,data:e.toPositionArray(f)},color:{numComponents:3,data:e.toPositionArray(g)}},i=a.createBufferInfoFromArrays(this.gl,h);a.setBuffersAndAttributes(this.gl,this.programInfo,i),a.drawBufferInfo(this.gl,i,this.gl.LINE_STRIP)}for(let d=0;4>d;++d){const f=[],g=[];for(let a,e=0;4>e;++e)a=this.points[d+4*e],a=b.multiply(a),a=a.multiply(1/a.elements[3]),f.push(c.$V([a.elements[0],a.elements[1]])),g.push(c.$V([0,0,0]));const h={position:{numComponents:2,data:e.toPositionArray(f)},color:{numComponents:3,data:e.toPositionArray(g)}},i=a.createBufferInfoFromArrays(this.gl,h);a.setBuffersAndAttributes(this.gl,this.programInfo,i),a.drawBufferInfo(this.gl,i,this.gl.LINE_STRIP)}},renderPoints(){const b=this.mesh.transformationChain.getResult(),d=[],f=[];for(let a,e=0;e<this.points.length;++e)a=this.points[e],a=b.multiply(a),a=a.multiply(1/a.elements[3]),d.push(c.$V([a.elements[0],a.elements[1]])),this.points[e].isSelected?f.push(c.$V([0,1,0])):f.push(c.$V([1,0,0]));const g={position:{numComponents:2,data:e.toPositionArray(d)},color:{numComponents:3,data:e.toPositionArray(f)}},h=a.createBufferInfoFromArrays(this.gl,g);a.setBuffersAndAttributes(this.gl,this.programInfo,h),a.drawBufferInfo(this.gl,h,this.gl.POINTS)},renderSurface(){const b=this.mesh.transformationChain.getResult(),f=this.mesh.faces,g=this.mesh.vertices,h=[],k=[];for(let a=0;a<this.visibleFaces.length;++a){let d=f[this.visibleFaces[a]].isVisible?f[this.visibleFaces[a]].colorFront:f[this.visibleFaces[a]].colorBack;for(let e,i=0;3>i;++i)e=g[f[this.visibleFaces[a]].vertices[i]],e=b.multiply(e),e=e.multiply(1/e.elements[3]),h.push(c.$V([e.elements[0],e.elements[1]])),k.push(d)}const i={color:d.colors.curve},j={position:{numComponents:2,data:e.toPositionArray(h)},color:{numComponents:3,data:e.toPositionArray(k)}},l=a.createBufferInfoFromArrays(this.gl,j);a.setBuffersAndAttributes(this.gl,this.programInfo,l),a.drawBufferInfo(this.gl,l,this.gl.TRIANGLES)},onKeyPress(a){switch(a.preventDefault(),a.code){case'KeyW':this.camera.moveY(-1.5);break;case'KeyS':this.camera.moveY(1.5);break;case'KeyD':this.camera.rotateXZ(-0.1);break;case'KeyA':this.camera.rotateXZ(0.1);break;case'KeyX':this.selectedAxis='X';break;case'KeyY':this.selectedAxis='Y';break;case'KeyZ':this.selectedAxis='Z';break;case'NumpadAdd':this.draggedPoint?this.moveSelectedPoint(0.05):this.camera.moveXZ(2.5);break;case'NumpadSubtract':this.draggedPoint?this.moveSelectedPoint(-0.05):this.camera.moveXZ(-2.5);}return!1},moveSelectedPoint(a){switch(this.selectedAxis){case'X':return void(this.draggedPoint.elements[0]-=a);case'Y':return void(this.draggedPoint.elements[1]-=a);case'Z':return void(this.draggedPoint.elements[2]-=a);}}};return Object.setPrototypeOf(j,b),j});