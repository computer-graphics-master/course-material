define(['js/sylvester', 'js/style', 'js/util', 'js/transformation-chain'], function(s, style, util, TransformationChain) {
    'use strict'

    const makeFace = function makeFace(vertices, normals, colorFront, colorBack) {
        return {
            vertices,
            normals,
            z: 0,
            shade: 0,
            isVisible: false,
            colorFront,
            colorBack
        };
    };

    const calculateFaceNormal = function calculateFaceNormal(f) {
        const a = this.transformedVertices[this.faces[f].vertices[0]], 
              b = this.transformedVertices[this.faces[f].vertices[1]], 
              c = this.transformedVertices[this.faces[f].vertices[2]];

        const v = util.vec.cross(a.subtract(b), a.subtract(c));

        return util.vec.normalize(v);
    };

    const fact = function fact(n) {
        let acc = 1;
    
        for (let i = n; i > 1; --i) {
            acc *= i;
        }
    
        return acc;
    };
    
    const binomial = function binomial(n, i) {
        return fact(n) / (fact(i) * fact(n - i));
    };
    
    const bernstein = function bernstein (n, i, u) {
        const b = binomial(n, i);
    
        return b * Math.pow(u, i) * Math.pow(1.0 - u, n - i);
    }
    
    const bezier = function bezier(u) {
        let ret = s.$V([0, 0, 0, 1]);
    
        for (let i = 0; i < 4; ++i)
        {
            let p = this.controlPoints[i].dup();

            p = p.multiply(bernstein(3, i, u))

            ret.elements[0] += p.elements[0];
            ret.elements[1] += p.elements[1];
            ret.elements[2] += p.elements[2];
        }
    
        return ret;
    }

    const bezierAlongLine = function bezierAlongLine(u, v) {
        const vec = this.controlPoints[4].subtract(this.controlPoints[0]).multiply(v);

        let ret = s.$V([0, 0, 0, 1]);

        for (let i = 0; i < 4; ++i) {
            const p = vec.add(this.controlPoints[i]).multiply(bernstein(3, i, u));

            ret.elements[0] += p.elements[0];
            ret.elements[1] += p.elements[1];
            ret.elements[2] += p.elements[2];
        }

        return ret;
    };

    const BezierMesh = {
        BezierMesh(controlPoints) {
            this.controlPoints = controlPoints;

            this.visibilityTransformationChain = Object.create(TransformationChain);
            this.visibilityTransformationChain.TransformationChain();

            this.transformationChain = Object.create(TransformationChain);
            this.transformationChain.TransformationChain();

            const verticesPerLine = 21;
            const facesPerLine = 20;

            this.faces = [];
            this.transformedVertices = [];
            this.normals = [];

            for (let i = 0; i < facesPerLine; ++i)
            {
                for (let j = 0; j < facesPerLine; ++j)
                {
                    const a = i * verticesPerLine + j,
                          b = i * verticesPerLine + j + 1,
                          c = (i + 1) * verticesPerLine + j,
                          d = (i + 1) * verticesPerLine + j + 1;
    
                    this.faces.push(makeFace([a, d, c], [0, 0, 0], s.$V([0.71, 0.28, 0.15]), s.$V([0.27, 0.53, 0.4])));
                    this.faces.push(makeFace([a, b, d], [0, 0, 0], s.$V([0.55, 0.15, 0]), s.$V([1, 0.94, 0.64])));
                }
            }

            for (let i = 0; i < verticesPerLine * verticesPerLine; ++i)
            {
                this.transformedVertices.push(s.$V([0, 0, 0, 1]));
                // normals.push_back({ { 0, 0, 0 }, 0 });
            }
        },
        update(centerVec) {
            this.transformationChain.recalculate();
            this.visibilityTransformationChain.recalculate();

            const tm = this.visibilityTransformationChain.getResult();

            this.vertices = [];

            for (let u = 0; u <= 1.01; u += 0.05)
            {
                for (let v = 0; v <= 1.01; v += 0.05)
                {
                    const p = bezierAlongLine.call(this, u, v);
        
                    this.vertices.push(p);
                }
            }
        
            for (let i = 0; i < this.vertices.length; ++i)
            {
                let res = tm.multiply(this.vertices[i]);

                res = util.vec.homogenousDivide(res);

                this.transformedVertices[i] = res;
            }

            for (let i = 0; i < this.faces.length; ++i)
            {
                this.faces[i].z = this.transformedVertices[this.faces[i].vertices[0]].elements[2]
                    + this.transformedVertices[this.faces[i].vertices[1]].elements[2]
                    + this.transformedVertices[this.faces[i].vertices[2]].elements[2];

                this.faces[i].z /= 3;
            }

            const ret = [];
        
            for (let i = 0; i < this.faces.length; ++i)
            {
                let toCamera = util.vec.sub(centerVec, this.transformedVertices[this.faces[i].vertices[0]]);
        
                toCamera = util.vec.normalize(toCamera);
        
                const normal = calculateFaceNormal.call(this, i);
        
                this.faces[i].shade = 1;
        
                this.faces[i].isVisible = util.vec.dot(normal, toCamera) > 0;
        
                ret.push(i);
            }
        
            return ret;
        },
        resetTransformedVertices() {
            for (let i = 0; i < this.vertices.length; ++i) 
            {
                this.transformedVertices[i] = this.vertices[i].dup();
            }
        },
    };

    return BezierMesh;
});