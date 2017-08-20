define([],function(){function a(){}function e(){}function b(){}function c(){}var d=Math.sin,f=Math.cos,g=Math.round,h=Math.PI,l=Math.abs,i=Math.sqrt,k={version:'0.1.3',precision:1e-6};a.prototype={e:function(a){return 1>a||a>this.elements.length?null:this.elements[a-1]},dimensions:function(){return this.elements.length},modulus:function(){return i(this.dot(this))},eql:function(a){var b=this.elements.length,c=a.elements||a;if(b!=c.length)return!1;do if(l(this.elements[b-1]-c[b-1])>k.precision)return!1;while(--b);return!0},dup:function(){return a.create(this.elements)},map:function(b){var c=[];return this.each(function(a,d){c.push(b(a,d))}),a.create(c)},each:function(a){var b,c=this.elements.length,d=c;do b=d-c,a(this.elements[b],b+1);while(--c)},toUnitVector:function(){var a=this.modulus();return 0===a?this.dup():this.map(function(b){return b/a})},angleFrom:function(a){var b=a.elements||a,c=this.elements.length;if(c!=b.length)return null;var d=0,e=0,f=0;if(this.each(function(a,c){d+=a*b[c-1],e+=a*a,f+=b[c-1]*b[c-1]}),e=i(e),f=i(f),0==e*f)return null;var g=d/(e*f);return-1>g&&(g=-1),1<g&&(g=1),Math.acos(g)},isParallelTo:function(a){var b=this.angleFrom(a);return null===b?null:b<=k.precision},isAntiparallelTo:function(a){var b=this.angleFrom(a);return null===b?null:l(b-h)<=k.precision},isPerpendicularTo:function(a){var b=this.dot(a);return null===b?null:l(b)<=k.precision},add:function(a){var b=a.elements||a;return this.elements.length==b.length?this.map(function(a,c){return a+b[c-1]}):null},subtract:function(a){var b=a.elements||a;return this.elements.length==b.length?this.map(function(a,c){return a-b[c-1]}):null},multiply:function(a){return this.map(function(b){return b*a})},x:function(a){return this.multiply(a)},dot:function(a){var b=a.elements||a,c=0,d=this.elements.length;if(d!=b.length)return null;do c+=this.elements[d-1]*b[d-1];while(--d);return c},cross:function(b){var c=b.elements||b;if(3!=this.elements.length||3!=c.length)return null;var d=this.elements;return a.create([d[1]*c[2]-d[2]*c[1],d[2]*c[0]-d[0]*c[2],d[0]*c[1]-d[1]*c[0]])},max:function(){var a,b=0,c=this.elements.length,d=c;do a=d-c,l(this.elements[a])>l(b)&&(b=this.elements[a]);while(--c);return b},indexOf:function(a){var b,c=null,d=this.elements.length,e=d;do b=e-d,null==c&&this.elements[b]==a&&(c=b+1);while(--d);return c},toDiagonalMatrix:function(){return e.Diagonal(this.elements)},round:function(){return this.map(function(a){return g(a)})},snapTo:function(a){return this.map(function(b){return l(b-a)<=k.precision?a:b})},distanceFrom:function(a){if(a.anchor)return a.distanceFrom(this);var b=a.elements||a;if(b.length!=this.elements.length)return null;var c,d=0;return this.each(function(a,e){c=a-b[e-1],d+=c*c}),i(d)},liesOn:function(a){return a.contains(this)},liesIn:function(a){return a.contains(this)},rotate:function(b,c){var d,f,g,h,i;switch(this.elements.length){case 2:return(d=c.elements||c,2!=d.length)?null:(f=e.Rotation(b).elements,g=this.elements[0]-d[0],h=this.elements[1]-d[1],a.create([d[0]+f[0][0]*g+f[0][1]*h,d[1]+f[1][0]*g+f[1][1]*h]));break;case 3:if(!c.direction)return null;var k=c.pointClosestTo(this).elements;return f=e.Rotation(b,c.direction).elements,g=this.elements[0]-k[0],h=this.elements[1]-k[1],i=this.elements[2]-k[2],a.create([k[0]+f[0][0]*g+f[0][1]*h+f[0][2]*i,k[1]+f[1][0]*g+f[1][1]*h+f[1][2]*i,k[2]+f[2][0]*g+f[2][1]*h+f[2][2]*i]);break;default:return null;}},reflectionIn:function(b){if(b.anchor){var c=this.elements.slice(),d=b.pointClosestTo(c).elements;return a.create([d[0]+(d[0]-c[0]),d[1]+(d[1]-c[1]),d[2]+(d[2]-(c[2]||0))])}var e=b.elements||b;return this.elements.length==e.length?this.map(function(a,b){return e[b-1]+(e[b-1]-a)}):null},to3D:function(){var a=this.dup();switch(a.elements.length){case 3:break;case 2:a.elements.push(0);break;default:return null;}return a},inspect:function(){return'['+this.elements.join(', ')+']'},setElements:function(a){return this.elements=(a.elements||a).slice(),this}},a.create=function(b){var c=new a;return c.setElements(b)},a.i=a.create([1,0,0]),a.j=a.create([0,1,0]),a.k=a.create([0,0,1]),a.Random=function(b){var c=[];do c.push(Math.random());while(--b);return a.create(c)},a.Zero=function(b){var c=[];do c.push(0);while(--b);return a.create(c)},e.prototype={e:function(a,b){return 1>a||a>this.elements.length||1>b||b>this.elements[0].length?null:this.elements[a-1][b-1]},row:function(b){return b>this.elements.length?null:a.create(this.elements[b-1])},col:function(b){if(b>this.elements[0].length)return null;var c,d=[],e=this.elements.length,f=e;do c=f-e,d.push(this.elements[c][b-1]);while(--e);return a.create(d)},dimensions:function(){return{rows:this.elements.length,cols:this.elements[0].length}},rows:function(){return this.elements.length},cols:function(){return this.elements[0].length},eql:function(a){var b=a.elements||a;if('undefined'==typeof b[0][0]&&(b=e.create(b).elements),this.elements.length!=b.length||this.elements[0].length!=b[0].length)return!1;var c,d,f,g=this.elements.length,h=g,i=this.elements[0].length;do{c=h-g,d=i;do if(f=i-d,l(this.elements[c][f]-b[c][f])>k.precision)return!1;while(--d)}while(--g);return!0},dup:function(){return e.create(this.elements)},map:function(a){var b,c,d,f=[],g=this.elements.length,h=g,i=this.elements[0].length;do{b=h-g,c=i,f[b]=[];do d=i-c,f[b][d]=a(this.elements[b][d],b+1,d+1);while(--c)}while(--g);return e.create(f)},isSameSizeAs:function(a){var b=a.elements||a;return'undefined'==typeof b[0][0]&&(b=e.create(b).elements),this.elements.length==b.length&&this.elements[0].length==b[0].length},add:function(a){var b=a.elements||a;return'undefined'==typeof b[0][0]&&(b=e.create(b).elements),this.isSameSizeAs(b)?this.map(function(a,c,d){return a+b[c-1][d-1]}):null},subtract:function(a){var b=a.elements||a;return'undefined'==typeof b[0][0]&&(b=e.create(b).elements),this.isSameSizeAs(b)?this.map(function(a,c,d){return a-b[c-1][d-1]}):null},canMultiplyFromLeft:function(a){var b=a.elements||a;return'undefined'==typeof b[0][0]&&(b=e.create(b).elements),this.elements[0].length==b.length},multiply:function(a){if(!a.elements)return this.map(function(b){return b*a});var b=!!a.modulus,d=a.elements||a;if('undefined'==typeof d[0][0]&&(d=e.create(d).elements),!this.canMultiplyFromLeft(d))return null;var f,g,h,i,k,l,c=this.elements.length,m=c,n=d[0].length,o=this.elements[0].length,p=[];do{f=m-c,p[f]=[],g=n;do{h=n-g,i=0,k=o;do l=o-k,i+=this.elements[f][l]*d[l][h];while(--k);p[f][h]=i}while(--g)}while(--c);var d=e.create(p);return b?d.col(1):d},x:function(a){return this.multiply(a)},minor:function(f,a,b,c){var d,g,h,i=[],k=b,l=this.elements.length,m=this.elements[0].length;do{d=b-k,i[d]=[],g=c;do h=c-g,i[d][h]=this.elements[(f+d-1)%l][(a+h-1)%m];while(--g)}while(--k);return e.create(i)},transpose:function(){var a,b,c,d=this.elements.length,f=this.elements[0].length,g=[],h=f;do{a=f-h,g[a]=[],b=d;do c=d-b,g[a][c]=this.elements[c][a];while(--b)}while(--h);return e.create(g)},isSquare:function(){return this.elements.length==this.elements[0].length},max:function(){var a,b,c,d=0,e=this.elements.length,f=e,g=this.elements[0].length;do{a=f-e,b=g;do c=g-b,l(this.elements[a][c])>l(d)&&(d=this.elements[a][c]);while(--b)}while(--e);return d},indexOf:function(a){var b,c,d,e=this.elements.length,f=e,g=this.elements[0].length;do{b=f-e,c=g;do if(d=g-c,this.elements[b][d]==a)return{i:b+1,j:d+1};while(--c)}while(--e);return null},diagonal:function(){if(!this.isSquare)return null;var b,c=[],d=this.elements.length,e=d;do b=e-d,c.push(this.elements[b][b]);while(--d);return a.create(c)},// scaled up or switched, and the determinant is preserved.
toRightTriangular:function(){var a,b,c,d,e=this.dup(),f=this.elements.length,g=f,h=this.elements[0].length;do{if(b=g-f,0==e.elements[b][b])for(j=b+1;j<g;j++)if(0!=e.elements[j][b]){a=[],c=h;do d=h-c,a.push(e.elements[b][d]+e.elements[j][d]);while(--c);e.elements[b]=a;break}if(0!=e.elements[b][b])for(j=b+1;j<g;j++){var i=e.elements[j][b]/e.elements[b][b];a=[],c=h;do d=h-c,a.push(d<=b?0:e.elements[j][d]-e.elements[b][d]*i);while(--c);e.elements[j]=a}}while(--f);return e},toUpperTriangular:function(){return this.toRightTriangular()},determinant:function(){if(!this.isSquare())return null;var a,b=this.toRightTriangular(),c=b.elements[0][0],d=b.elements.length-1,e=d;do a=e-d+1,c*=b.elements[a][a];while(--d);return c},det:function(){return this.determinant()},isSingular:function(){return this.isSquare()&&0===this.determinant()},trace:function(){if(!this.isSquare())return null;var a,b=this.elements[0][0],c=this.elements.length-1,d=c;do a=d-c+1,b+=this.elements[a][a];while(--c);return b},tr:function(){return this.trace()},rank:function(){var a,b,c,d=this.toRightTriangular(),e=0,f=this.elements.length,g=f,h=this.elements[0].length;do{a=g-f,b=h;do if(c=h-b,l(d.elements[a][c])>k.precision){e++;break}while(--b)}while(--f);return e},rk:function(){return this.rank()},augment:function(a){var b=a.elements||a;'undefined'==typeof b[0][0]&&(b=e.create(b).elements);var c,d,f,g=this.dup(),h=g.elements[0].length,i=g.elements.length,k=i,l=b[0].length;if(i!=b.length)return null;do{c=k-i,d=l;do f=l-d,g.elements[c][h+f]=b[c][f];while(--d)}while(--i);return g},inverse:function(){if(!this.isSquare()||this.isSingular())return null;var a,b,c,d,f,g,h,i=this.elements.length,k=i,l=this.augment(e.I(i)).toRightTriangular(),m=l.elements[0].length,n=[];do{a=i-1,f=[],c=m,n[a]=[],g=l.elements[a][a];do d=m-c,h=l.elements[a][d]/g,f.push(h),d>=k&&n[a].push(h);while(--c);for(l.elements[a]=f,b=0;b<a;b++){f=[],c=m;do d=m-c,f.push(l.elements[b][d]-l.elements[a][d]*l.elements[b][a]);while(--c);l.elements[b]=f}}while(--i);return e.create(n)},inv:function(){return this.inverse()},round:function(){return this.map(function(a){return g(a)})},snapTo:function(a){return this.map(function(b){return l(b-a)<=k.precision?a:b})},inspect:function(){var b,c=[],d=this.elements.length,e=d;do b=e-d,c.push(a.create(this.elements[b]).inspect());while(--d);return c.join('\n')},setElements:function(a){var b,c=a.elements||a;if('undefined'!=typeof c[0][0]){var d,e,f,g=c.length,h=g;this.elements=[];do{b=h-g,d=c[b].length,e=d,this.elements[b]=[];do f=e-d,this.elements[b][f]=c[b][f];while(--d)}while(--g);return this}var i=c.length,l=i;this.elements=[];do b=l-i,this.elements.push([c[b]]);while(--i);return this}},e.create=function(a){var b=new e;return b.setElements(a)},e.I=function(a){var b,c,d,f=[],g=a;do{b=g-a,f[b]=[],c=g;do d=g-c,f[b][d]=b==d?1:0;while(--c)}while(--a);return e.create(f)},e.Diagonal=function(a){var b,c=a.length,d=c,f=e.I(c);do b=d-c,f.elements[b][b]=a[b];while(--c);return f},e.Rotation=function(b,g){if(!g)return e.create([[f(b),-d(b)],[d(b),f(b)]]);var h=g.dup();if(3!=h.elements.length)return null;var i=h.modulus(),k=h.elements[0]/i,l=h.elements[1]/i,m=h.elements[2]/i,n=d(b),o=f(b),c=1-o;return e.create([[c*k*k+o,c*k*l-n*m,c*k*m+n*l],[c*k*l+n*m,c*l*l+o,c*l*m-n*k],[c*k*m-n*l,c*l*m+n*k,c*m*m+o]])},e.RotationX=function(a){var b=f(a),c=d(a);return e.create([[1,0,0],[0,b,-c],[0,c,b]])},e.RotationY=function(a){var b=f(a),c=d(a);return e.create([[b,0,c],[0,1,0],[-c,0,b]])},e.RotationZ=function(a){var b=f(a),c=d(a);return e.create([[b,-c,0],[c,b,0],[0,0,1]])},e.Random=function(a,b){return e.Zero(a,b).map(function(){return Math.random()})},e.Zero=function(a,b){var c,d,f,g=[],h=a;do{c=a-h,g[c]=[],d=b;do f=b-d,g[c][f]=0;while(--d)}while(--h);return e.create(g)},b.prototype={eql:function(a){return this.isParallelTo(a)&&this.contains(a.anchor)},dup:function(){return b.create(this.anchor,this.direction)},translate:function(a){var c=a.elements||a;return b.create([this.anchor.elements[0]+c[0],this.anchor.elements[1]+c[1],this.anchor.elements[2]+(c[2]||0)],this.direction)},isParallelTo:function(a){if(a.normal)return a.isParallelTo(this);var b=this.direction.angleFrom(a.direction);return l(b)<=k.precision||l(b-h)<=k.precision},distanceFrom:function(a){if(a.normal)return a.distanceFrom(this);if(a.direction){if(this.isParallelTo(a))return this.distanceFrom(a.anchor);var b=this.direction.cross(a.direction).toUnitVector().elements,c=this.anchor.elements,d=a.anchor.elements;return l((c[0]-d[0])*b[0]+(c[1]-d[1])*b[1]+(c[2]-d[2])*b[2])}var e=a.elements||a,c=this.anchor.elements,f=this.direction.elements,g=e[0]-c[0],h=e[1]-c[1],k=(e[2]||0)-c[2],m=i(g*g+h*h+k*k);if(0===m)return 0;var n=(g*f[0]+h*f[1]+k*f[2])/m,o=1-n*n;return l(m*i(0>o?0:o))},contains:function(a){var b=this.distanceFrom(a);return null!==b&&b<=k.precision},liesIn:function(a){return a.contains(this)},intersects:function(a){return a.normal?a.intersects(this):!this.isParallelTo(a)&&this.distanceFrom(a)<=k.precision},intersectionWith:function(b){if(b.normal)return b.intersectionWith(this);if(!this.intersects(b))return null;var c=this.anchor.elements,d=this.direction.elements,e=b.anchor.elements,f=b.direction.elements,g=d[0],h=d[1],i=d[2],l=f[0],m=f[1],n=f[2],o=c[0]-e[0],p=c[1]-e[1],q=c[2]-e[2],r=l*l+m*m+n*n,s=g*l+h*m+i*n,t=((-g*o-h*p-i*q)*r/(g*g+h*h+i*i)+s*(l*o+m*p+n*q))/(r-s*s);return a.create([c[0]+t*g,c[1]+t*h,c[2]+t*i])},pointClosestTo:function(b){if(b.direction){if(this.intersects(b))return this.intersectionWith(b);if(this.isParallelTo(b))return null;var d=this.direction.elements,e=b.direction.elements,f=d[0],g=d[1],h=d[2],i=e[0],l=e[1],m=e[2],n=h*i-f*m,o=f*l-g*i,p=g*m-h*l,q=a.create([n*m-o*l,o*i-p*m,p*l-n*i]),r=c.create(b.anchor,q);return r.intersectionWith(this)}var r=b.elements||b;if(this.contains(r))return a.create(r);var s=this.anchor.elements,d=this.direction.elements,f=d[0],g=d[1],h=d[2],t=s[0],u=s[1],v=s[2],n=f*(r[1]-u)-g*(r[0]-t),o=g*((r[2]||0)-v)-h*(r[1]-u),p=h*(r[0]-t)-f*((r[2]||0)-v),w=a.create([g*n-h*p,h*o-f*n,f*p-g*o]),x=this.distanceFrom(r)/w.modulus();return a.create([r[0]+w.elements[0]*x,r[1]+w.elements[1]*x,(r[2]||0)+w.elements[2]*x])},rotate:function(c,d){'undefined'==typeof d.direction&&(d=b.create(d.to3D(),a.k));var f=e.Rotation(c,d.direction).elements,g=d.pointClosestTo(this.anchor).elements,h=this.anchor.elements,i=this.direction.elements,k=g[0],l=g[1],m=g[2],n=h[0],o=h[1],p=h[2],q=n-k,r=o-l,s=p-m;return b.create([k+f[0][0]*q+f[0][1]*r+f[0][2]*s,l+f[1][0]*q+f[1][1]*r+f[1][2]*s,m+f[2][0]*q+f[2][1]*r+f[2][2]*s],[f[0][0]*i[0]+f[0][1]*i[1]+f[0][2]*i[2],f[1][0]*i[0]+f[1][1]*i[1]+f[1][2]*i[2],f[2][0]*i[0]+f[2][1]*i[1]+f[2][2]*i[2]])},reflectionIn:function(a){if(a.normal){var c=this.anchor.elements,d=this.direction.elements,e=c[0],f=c[1],g=c[2],h=d[0],i=d[1],k=d[2],l=this.anchor.reflectionIn(a).elements,m=e+h,n=f+i,o=g+k,p=a.pointClosestTo([m,n,o]).elements,q=[p[0]+(p[0]-m)-l[0],p[1]+(p[1]-n)-l[1],p[2]+(p[2]-o)-l[2]];return b.create(l,q)}if(a.direction)return this.rotate(Math.PI,a);var r=a.elements||a;return b.create(this.anchor.reflectionIn([r[0],r[1],r[2]||0]),this.direction)},setVectors:function(b,c){if(b=a.create(b),c=a.create(c),2==b.elements.length&&b.elements.push(0),2==c.elements.length&&c.elements.push(0),3<b.elements.length||3<c.elements.length)return null;var d=c.modulus();return 0===d?null:(this.anchor=b,this.direction=a.create([c.elements[0]/d,c.elements[1]/d,c.elements[2]/d]),this)}},b.create=function(a,c){var d=new b;return d.setVectors(a,c)},b.X=b.create(a.Zero(3),a.i),b.Y=b.create(a.Zero(3),a.j),b.Z=b.create(a.Zero(3),a.k),c.prototype={eql:function(a){return this.contains(a.anchor)&&this.isParallelTo(a)},dup:function(){return c.create(this.anchor,this.normal)},translate:function(a){var b=a.elements||a;return c.create([this.anchor.elements[0]+b[0],this.anchor.elements[1]+b[1],this.anchor.elements[2]+(b[2]||0)],this.normal)},isParallelTo:function(a){var b;return a.normal?(b=this.normal.angleFrom(a.normal),l(b)<=k.precision||l(h-b)<=k.precision):a.direction?this.normal.isPerpendicularTo(a.direction):null},isPerpendicularTo:function(a){var b=this.normal.angleFrom(a.normal);return l(h/2-b)<=k.precision},distanceFrom:function(a){if(this.intersects(a)||this.contains(a))return 0;if(a.anchor){var b=this.anchor.elements,c=a.anchor.elements,d=this.normal.elements;return l((b[0]-c[0])*d[0]+(b[1]-c[1])*d[1]+(b[2]-c[2])*d[2])}var e=a.elements||a,b=this.anchor.elements,d=this.normal.elements;return l((b[0]-e[0])*d[0]+(b[1]-e[1])*d[1]+(b[2]-(e[2]||0))*d[2])},contains:function(a){if(a.normal)return null;if(a.direction)return this.contains(a.anchor)&&this.contains(a.anchor.add(a.direction));var b=a.elements||a,c=this.anchor.elements,d=this.normal.elements,e=l(d[0]*(c[0]-b[0])+d[1]*(c[1]-b[1])+d[2]*(c[2]-(b[2]||0)));return e<=k.precision},intersects:function(a){return'undefined'==typeof a.direction&&'undefined'==typeof a.normal?null:!this.isParallelTo(a)},intersectionWith:function(c){if(!this.intersects(c))return null;if(c.direction){var d=c.anchor.elements,f=c.direction.elements,g=this.anchor.elements,h=this.normal.elements,k=(h[0]*(g[0]-d[0])+h[1]*(g[1]-d[1])+h[2]*(g[2]-d[2]))/(h[0]*f[0]+h[1]*f[1]+h[2]*f[2]);return a.create([d[0]+f[0]*k,d[1]+f[1]*k,d[2]+f[2]*k])}if(c.normal){for(var l=this.normal.cross(c.normal).toUnitVector(),h=this.normal.elements,d=this.anchor.elements,m=c.normal.elements,n=c.anchor.elements,o=e.Zero(2,2),p=0;o.isSingular();)p++,o=e.create([[h[p%3],h[(p+1)%3]],[m[p%3],m[(p+1)%3]]]);for(var i=o.inverse().elements,q=h[0]*d[0]+h[1]*d[1]+h[2]*d[2],r=m[0]*n[0]+m[1]*n[1]+m[2]*n[2],s=[i[0][0]*q+i[0][1]*r,i[1][0]*q+i[1][1]*r],t=[],u=1;3>=u;u++)t.push(p==u?0:s[(u+(5-p)%3)%3]);return b.create(t,l)}},pointClosestTo:function(b){var c=b.elements||b,d=this.anchor.elements,e=this.normal.elements,f=(d[0]-c[0])*e[0]+(d[1]-c[1])*e[1]+(d[2]-(c[2]||0))*e[2];return a.create([c[0]+e[0]*f,c[1]+e[1]*f,(c[2]||0)+e[2]*f])},rotate:function(a,b){var d=e.Rotation(a,b.direction).elements,f=b.pointClosestTo(this.anchor).elements,g=this.anchor.elements,h=this.normal.elements,i=f[0],k=f[1],l=f[2],m=g[0],n=g[1],o=g[2],p=m-i,q=n-k,r=o-l;return c.create([i+d[0][0]*p+d[0][1]*q+d[0][2]*r,k+d[1][0]*p+d[1][1]*q+d[1][2]*r,l+d[2][0]*p+d[2][1]*q+d[2][2]*r],[d[0][0]*h[0]+d[0][1]*h[1]+d[0][2]*h[2],d[1][0]*h[0]+d[1][1]*h[1]+d[1][2]*h[2],d[2][0]*h[0]+d[2][1]*h[1]+d[2][2]*h[2]])},reflectionIn:function(a){if(a.normal){var b=this.anchor.elements,d=this.normal.elements,e=b[0],f=b[1],g=b[2],h=d[0],i=d[1],k=d[2],l=this.anchor.reflectionIn(a).elements,m=e+h,n=f+i,o=g+k,p=a.pointClosestTo([m,n,o]).elements,q=[p[0]+(p[0]-m)-l[0],p[1]+(p[1]-n)-l[1],p[2]+(p[2]-o)-l[2]];return c.create(l,q)}if(a.direction)return this.rotate(Math.PI,a);var r=a.elements||a;return c.create(this.anchor.reflectionIn([r[0],r[1],r[2]||0]),this.normal)},setVectors:function(b,c,d){if(b=a.create(b),b=b.to3D(),null===b)return null;if(c=a.create(c),c=c.to3D(),null===c)return null;if('undefined'==typeof d)d=null;else if(d=a.create(d),d=d.to3D(),null===d)return null;var e,f,g=b.elements[0],h=b.elements[1],k=b.elements[2],l=c.elements[0],m=c.elements[1],n=c.elements[2];if(null!==d){var o=d.elements[0],p=d.elements[1],q=d.elements[2];if(e=a.create([(m-h)*(q-k)-(n-k)*(p-h),(n-k)*(o-g)-(l-g)*(q-k),(l-g)*(p-h)-(m-h)*(o-g)]),f=e.modulus(),0===f)return null;e=a.create([e.elements[0]/f,e.elements[1]/f,e.elements[2]/f])}else{if(f=i(l*l+m*m+n*n),0===f)return null;e=a.create([c.elements[0]/f,c.elements[1]/f,c.elements[2]/f])}return this.anchor=b,this.normal=e,this}},c.create=function(a,b,d){var e=new c;return e.setVectors(a,b,d)},c.XY=c.create(a.Zero(3),a.k),c.YZ=c.create(a.Zero(3),a.i),c.ZX=c.create(a.Zero(3),a.j),c.YX=c.XY,c.ZY=c.YZ,c.XZ=c.ZX;var m=a.create,n=e.create,o=b.create,p=c.create;return{Vector:a,Matrix:e,Line:b,Plane:c,$V:m,$M:n,$L:o,$P:p}});