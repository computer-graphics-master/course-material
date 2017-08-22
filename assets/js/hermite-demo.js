define(['js/twgl', 'js/2d-boilerplate', 'js/sylvester', 'js/hermite'], function(twgl, Program, s, hermite) {
    'use strict'

    const HermiteDemo = {
        HermiteDemo(element, id) {
            this.Program(this.render, {
                element,
                id,
                width: 640,
                height: 480
            });

            this.points = [
                s.$V([80, 400]),
                s.$V([500, 80]),
                s.$V([500, 400]),
                s.$V([80, 80])
            ];

            this.curvePoints = [];
            this.isDragging = false;
            this.isMouseJustPressed = true;
            this.draggedPoint = null;
            
        },
        getClickedPoint(mousePosition) {
            for (let i = 0; i < this.points.length; ++i) {
                if (this.points[i].distanceFrom(mousePosition) <= 10) {
                    return this.points[i];
                }
            }

            return null;
        },
        onMouseDown(mousePosition) {
            if (this.isMouseJustPressed) {
                this.draggedPoint = this.getClickedPoint(mousePosition);

                if (this.draggedPoint) {
                    this.isDragging = true;
                }                

                this.isMouseJustPressed = false;
            }
        },
        onMouseUp() {
            this.isDragging = false;
            this.draggedPoint = null;
            this.isMouseJustPressed = true;
        },
        onMouseMove(mousePosition) {
            if (this.isDragging && this.draggedPoint) {
                this.draggedPoint.elements = mousePosition.elements;
            }
        },
        calculateCurve() {
            const pointsAndTangents = s.$M([
                this.points[0].elements,
                this.points[1].elements,
                this.points[2].subtract(this.points[0]).elements,
                this.points[3].subtract(this.points[1]).elements
            ]);

            this.curvePoints = hermite.calculateCurve(pointsAndTangents.transpose().elements);
        },
        render() {
            this.renderPoints();
            this.calculateCurve();
            this.renderCurve();
        },
        renderCurve() {
            var uniforms = {
                color: [ 1.0, 0.0, 0.0, 1.0 ]
            };           
            
            const arrays = {
                position: {
                    numComponents: 2,
                    data: this.curvePoints
                }
            };

            const bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);

            twgl.setBuffersAndAttributes(this.gl, this.programInfo, bufferInfo);
            twgl.setUniforms(this.programInfo, uniforms);
            twgl.drawBufferInfo(this.gl, bufferInfo, this.gl.LINE_STRIP);
        },
        renderPoints() {
            const uniforms = {
                color: [ 0.0, 0.0, 1.0, 1.0 ]
            };

            const pointsArrays = {
                position: {
                    numComponents: 2,
                    data: [...this.points[0].elements, ...this.points[1].elements]
                }
            };

            const linesArrays = {
                position: {
                    numComponents: 2,
                    data: [
                        ...this.points[0].elements,
                        ...this.points[2].elements,
                        ...this.points[1].elements,
                        ...this.points[3].elements
                    ]
                }
            };

            const pointsBufferInfo = twgl.createBufferInfoFromArrays(this.gl, pointsArrays);
            const linesBufferInfo = twgl.createBufferInfoFromArrays(this.gl, linesArrays);

            twgl.setBuffersAndAttributes(this.gl, this.programInfo, pointsBufferInfo);
            twgl.setUniforms(this.programInfo, uniforms);
            twgl.drawBufferInfo(this.gl, pointsBufferInfo, this.gl.POINTS);

            twgl.setBuffersAndAttributes(this.gl, this.programInfo, linesBufferInfo);
            twgl.setUniforms(this.programInfo, uniforms);
            twgl.drawBufferInfo(this.gl, linesBufferInfo, this.gl.LINES);
        }
    };

    Object.setPrototypeOf(HermiteDemo, Program);

    return function setup(element, id) {
        const example = Object.create(HermiteDemo);

        example.HermiteDemo(element, id);

        example.start(false);
    }
});
