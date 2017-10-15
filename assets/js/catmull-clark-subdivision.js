define(['js/twgl','js/2d-boilerplate','js/sylvester','js/style','js/util','js/transformation-chain','js/camera','js/catmull-clark-subdivision-mesh'],function(a,b,c,d,e,f,g,h){'use strict';const i=`attribute vec2 position;
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
    }`,j=`precision mediump float;

    varying vec4 passColor;
    
    void main() {
        gl_FragColor = passColor;
    }
    `,k={CatmullClarkSubdivision(a,b,d){this.mesh=d,this.Program(this.render,{container:a,idPrefix:b,width:640,height:480,vertexShader:i,fragmentShader:j}),this.centerVec=c.$V([0,0,100,1]),this.camera=Object.create(g),this.camera.Camera(c.$V([0,0,0]),c.$V([0,1,0]),300,-15,3.9),this.selectedAxis='X',this.windowToViewport=e.matrix.windowToViewport(c.$V([-0.5,-0.5]),c.$V([0.5,0.5]),c.$V([120,90]),c.$V([520,390])),this.persProj=e.matrix.persProj(100),this.mesh.visibilityTransformationChain.push(this.camera.viewMatrix),this.mesh.transformationChain.push(this.camera.viewMatrix,this.persProj,this.windowToViewport),this.mesh.visibilityTransformationChain.recalculate(),this.mesh.transformationChain.recalculate(),this.isShowControlPoints=!0,this.isShowControlNet=!0,this.light=c.$V([0,-1,0])},update(){let a=this.camera.eye.add(this.light);a.elements.push(1),a=this.camera.viewMatrix.multiply(a),a=e.vec.normalize(a),this.visibleFaces=this.mesh.update(this.centerVec,a).concat([]),this.sortFaces(),this.mesh.resetTransformedVertices()},sortFaces(){this.visibleFaces.sort((a,b)=>{return this.mesh.faces[a].z-this.mesh.faces[b].z})},render(){this.update(),this.renderSurface(),this.renderControlNet()},renderControlNet(){const b=this.mesh.transformationChain.getResult(),d=this.mesh.faces,f=this.mesh.vertices;for(let g=0;g<this.visibleFaces.length;++g){const h=[],i=[];for(let a,e=0;4>e;++e){a=f[d[this.visibleFaces[g]].vertices[e]].vector,a=b.multiply(a),a=a.multiply(1/a.elements[3]),h.push(c.$V([a.elements[0],a.elements[1]]));d[this.visibleFaces[g]].shade;i.push(c.$V([0,0,0]))}const j={position:{numComponents:2,data:e.toPositionArray(h)},color:{numComponents:3,data:e.toPositionArray(i)}},k=a.createBufferInfoFromArrays(this.gl,j);a.setBuffersAndAttributes(this.gl,this.programInfo,k),a.drawBufferInfo(this.gl,k,this.gl.LINE_LOOP)}},renderSurface(){const b=this.mesh.transformationChain.getResult(),d=this.mesh.faces,f=this.mesh.vertices,g=[],h=[];for(let a=0;a<this.visibleFaces.length;++a){const e=[],i=[];for(let g,h=0;4>h;++h){g=f[d[this.visibleFaces[a]].vertices[h]].vector,g=b.multiply(g),g=g.multiply(1/g.elements[3]),e.push(c.$V([g.elements[0],g.elements[1]]));const j=d[this.visibleFaces[a]].shade;i.push(c.$V([j,j,j]))}g.push(e[0],e[1],e[2],e[2],e[3],e[0]),h.push(i[0],i[1],i[2],i[2],i[3],i[0])}const i={position:{numComponents:2,data:e.toPositionArray(g)},color:{numComponents:3,data:e.toPositionArray(h)}},j=a.createBufferInfoFromArrays(this.gl,i);a.setBuffersAndAttributes(this.gl,this.programInfo,j),a.drawBufferInfo(this.gl,j,this.gl.TRIANGLES)},onKeyPress(a){switch(a.preventDefault(),a.code){case'KeyW':this.camera.moveY(-1.5);break;case'KeyS':this.camera.moveY(1.5);break;case'KeyD':this.camera.rotateXZ(-0.1);break;case'KeyA':this.camera.rotateXZ(0.1);break;case'KeyX':this.selectedAxis='X';break;case'KeyY':this.selectedAxis='Y';break;case'KeyZ':this.selectedAxis='Z';break;case'NumpadAdd':this.draggedPoint?this.moveSelectedPoint(0.05):this.camera.moveXZ(2.5);break;case'NumpadSubtract':this.draggedPoint?this.moveSelectedPoint(-0.05):this.camera.moveXZ(-2.5);break;case'Enter':this.mesh.doSubdivision();}return!1}};return Object.setPrototypeOf(k,b),function(a,b){const c=Object.create(h);c.CatmullClarkSubdivisionMesh();const d=Object.create(k);d.CatmullClarkSubdivision(a,b,c),d.start(!1)}});