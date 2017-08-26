define(['js/twgl', 'js/2d-boilerplate', 'js/sylvester', 'js/style', 'js/util', 'js/matrix-form'], function(twgl, Program, s, style, util, matrixForm) {
    'use strict'

    const CardinalSplineSegmentDemo = {
        CardinalSplineSegmentDemo(container, idPrefix) {
            this.Program(this.render, {
                container,
                idPrefix,
                width: 640,
                height: 480
            });

            this.points = [
                s.$V([80, 400]),
                s.$V([160, 200]),
                s.$V([240, 200]),
                s.$V([320, 400])
            ];

            this.curvePoints = [];
            this.isDragging = false;
            this.isMouseJustPressed = true;
            this.draggedPoint = null;
            this.tension = 0.0;

            this.calculateCoefficientMatrix();
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
        onKeyPress(event) {
            switch (event.code) {
                case "NumpadAdd":
                    this.tension += 0.1;
                    this.calculateCoefficientMatrix();
                    return;
                case "NumpadSubtract":
                    this.tension -= 0.1;
                    this.calculateCoefficientMatrix();
                    return;
                default:
                    return;
            }
        },
        calculateCoefficientMatrix() {
            const p = 0.5 * (1 - this.tension);

            this.coefficientMatrix = s.$M([
                [-p, 2 * p, -p, 0],
                [2 - p, p - 3, 0, 1],
                [p - 2, 3 - (2 * p), p, 0],
                [p, -p, 0, 0]
            ]);

            this.curveCalculator = matrixForm(this.coefficientMatrix);
        },
        calculateChords() {
            this.chords = [
                util.toPositionArray(util.line(this.points[0], this.points[2], 0.05)),
                util.toPositionArray(util.line(this.points[1], this.points[3], 0.05)),
            ];
        },
        calculateTangents() {
            const p = 0.5 * (1 - this.tension);

            this.tangents = util.toPositionArray([
                this.points[1],
                this.points[1].add(this.points[2].subtract(this.points[0]).multiply(p)),
                this.points[2],
                this.points[2].add(this.points[3].subtract(this.points[1]).multiply(p))
            ]);
        },
        calculateCurve() {
            this.curvePoints = this.curveCalculator(this.points);
        },
        render() {
            this.calculateCurve();
            this.calculateChords();
            this.calculateTangents();

            this.renderChords();
            this.renderCurve();
            this.renderTangents();
            this.renderPoints();
        },
        renderCurve() {
            const uniforms = {
                color: style.colors.curve
            };           
            
            const arrays = {
                position: {
                    numComponents: 2,
                    data: util.toPositionArray(this.curvePoints)
                }
            };

            const bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);

            twgl.setBuffersAndAttributes(this.gl, this.programInfo, bufferInfo);
            twgl.setUniforms(this.programInfo, uniforms);
            twgl.drawBufferInfo(this.gl, bufferInfo, this.gl.LINE_STRIP);
        },
        renderPoints() {
            const uniforms = {
                color: style.colors.controlPoint
            };

            const arrays = {
                position: {
                    numComponents: 2,
                    data: util.toPositionArray(this.points)
                }
            };

            const bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);

            twgl.setBuffersAndAttributes(this.gl, this.programInfo, bufferInfo);
            twgl.setUniforms(this.programInfo, uniforms);
            twgl.drawBufferInfo(this.gl, bufferInfo, this.gl.POINTS);
        },
        renderChords() {
            const uniforms = {
                color: style.colors.controlPolygon
            };

            for (let chord of this.chords) {
                const arrays = {
                    position: {
                        numComponents: 2,
                        data: chord
                    }
                };

                const bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);
                
                twgl.setBuffersAndAttributes(this.gl, this.programInfo, bufferInfo);
                twgl.setUniforms(this.programInfo, uniforms);
                twgl.drawBufferInfo(this.gl, bufferInfo, this.gl.LINES);
            }
        },
        renderTangents() {
            const uniforms = {
                color: style.colors.semiCurve
            };

            const arrays = {
                position: {
                    numComponents: 2,
                    data: this.tangents
                }
            };

            const bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);
            
            twgl.setBuffersAndAttributes(this.gl, this.programInfo, bufferInfo);
            twgl.setUniforms(this.programInfo, uniforms);
            twgl.drawBufferInfo(this.gl, bufferInfo, this.gl.LINES);
        }
    };

    Object.setPrototypeOf(CardinalSplineSegmentDemo, Program);

    return function setup(container, idPrefix) {
        const example = Object.create(CardinalSplineSegmentDemo);

        example.CardinalSplineSegmentDemo(container, idPrefix);

        example.start(false);
    }
});
