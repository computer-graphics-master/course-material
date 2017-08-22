define(['js/twgl', 'js/2d-boilerplate', 'js/hermite'], function(twgl, Program, hermite) {
    'use strict'

    const ContinuityExample = Object.create(Program);

    ContinuityExample.ContinuityExample = function ContinuityExample(element, id) {
        this.Program(this.render, {
            element,
            id
        });
    };

    ContinuityExample.render = function render() {
        this.renderCurves();
        this.renderPoints();
    };

    ContinuityExample.geomConstraints = [
        [80, 160, 0.0, 110.0],
        [60, 120, 120.0, 0.0],

        [160, 240,  0.0,  110.0],
        [120, 180, -120.0, 0.0],
    ];

    ContinuityExample.renderCurves = function renderCurves() {
        var uniforms = {
            color: [ 1.0, 0.0, 0.0, 1.0 ]
        };           
        
        const curve1 = hermite.calculateCurve(this.geomConstraints.slice(0, 2));
        const curve2 = hermite.calculateCurve(this.geomConstraints.slice(2, 4));

        const arrays = {
            position: {
                numComponents: 2,
                data: curve1.concat(curve2)
            }
        };

        const bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);

        twgl.setBuffersAndAttributes(this.gl, this.programInfo, bufferInfo);
        twgl.setUniforms(this.programInfo, uniforms);
        twgl.drawBufferInfo(this.gl, bufferInfo, this.gl.LINE_STRIP);
    };

    ContinuityExample.renderPoints = function renderPoints() {
        var uniforms = {
            color: [ 0.0, 0.0, 1.0, 1.0 ]
        };           

        const arrays = {
            position: [
                this.geomConstraints[0][0], this.geomConstraints[1][0], 0,
                this.geomConstraints[0][1], this.geomConstraints[1][1], 0,
                this.geomConstraints[2][1], this.geomConstraints[3][1], 0
            ]
        };

        const bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);

        twgl.setBuffersAndAttributes(this.gl, this.programInfo, bufferInfo);
        twgl.setUniforms(this.programInfo, uniforms);
        twgl.drawBufferInfo(this.gl, bufferInfo, this.gl.POINTS);
    };

    return function setup(element, id) {
        const example = Object.create(ContinuityExample);

        example.ContinuityExample(element, id);

        example.start();
    }
});
