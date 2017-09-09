define(['js/sylvester'],function(a){'use strict';const b={Camera(b,c,d,e,f){this.lookAt=b,this.up=c,this.xzRadius=d,this.y=e,this.alpha=f,this.eye=null,this.viewMatrix=a.Matrix.Diagonal([1,1,1,1]),this.recalculateView()},rotateXZ(a){var b=Math.PI;this.alpha+=a,0>this.alpha?this.alpha+=2*b:this.alpha>2*b&&(this.alpha-=2*b),this.recalculateView()},moveXZ(a){this.xzRadius+=a,this.recalculateView()},moveY(a){this.y+=a,this.recalculateView()},recalculateView(){this.eye=a.$V([this.xzRadius*Math.cos(this.alpha),this.y,this.xzRadius*Math.sin(this.alpha)]);let b=this.eye.subtract(this.lookAt).toUnitVector(),c=this.up.cross(b).toUnitVector(),d=b.cross(c);this.viewMatrix.elements[0][0]=c.elements[0],this.viewMatrix.elements[0][1]=c.elements[1],this.viewMatrix.elements[0][2]=c.elements[2],this.viewMatrix.elements[1][0]=d.elements[0],this.viewMatrix.elements[1][1]=d.elements[1],this.viewMatrix.elements[1][2]=d.elements[2],this.viewMatrix.elements[2][0]=b.elements[0],this.viewMatrix.elements[2][1]=b.elements[1],this.viewMatrix.elements[2][2]=b.elements[2],this.viewMatrix.elements[0][3]=-c.dot(this.eye),this.viewMatrix.elements[1][3]=-d.dot(this.eye),this.viewMatrix.elements[2][3]=-b.dot(this.eye)}};return b});