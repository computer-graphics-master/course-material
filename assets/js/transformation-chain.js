define(['js/sylvester'],function(a){'use strict';const b={TransformationChain(){this.matrices=[]},push(...a){this.matrices.push(...a)},recalculate(){if(this.result=a.Matrix.I(4),0!=this.matrices.length)for(let a=0;a<this.matrices.length;++a)this.result=this.matrices[a].multiply(this.result)},getResult(){return this.result}};return b});