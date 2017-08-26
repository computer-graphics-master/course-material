define(['js/twgl', 'js/2d-boilerplate', 'js/sylvester', 'js/style', 'js/util', 'js/matrix-form'], function(twgl, Program, s, style, util, matrixForm) {
    'use strict'

    const CardinalSplineDemo = {
        CardinalSplineDemo(container, idPrefix) {
            this.Program(this.render, {
                container,
                idPrefix,
                width: 640,
                height: 480
            });

            this.points = [];

            this.curvePoints = [];
            this.isDragging = false;
            this.isMouseJustPressed = true;
            this.draggedPoint = null;
            this.tension = 0.0;
            this.minPoints = 4;

            this.calculateCoefficientMatrix();
        },
        
        initDOM() {
            // I know, this is not the way to do it, but I'm outta time
            const cnt = this.settings.container;

            cnt.css('display', 'flex');

            const inputContainer = $('<span></span>');

            inputContainer.css('flex', '1');

            const controllerContainer = $('<div></div>');

            controllerContainer.addClass('canvas-controller');

            controllerContainer.append(this.createNumberInput('Tension', 'tension', 0, 0.025, event => this.changeTension(event)));
            
            inputContainer.append(controllerContainer);

            const canvasContainer = $('<span></span>');

            canvasContainer.css('flex', '2');

            canvasContainer.append(this.canvasMarkup());

            cnt.append(inputContainer);
            cnt.append(canvasContainer);
        },
        createNumberInput(label, name, value, step, onInput) {
            const id = this.withPrefix(name);

            const input = $(`<input type="number" value="${value}" id="${id}" name="${id}" step="${step}"/>`);

            input.on('input', onInput);

            const container = $('<div></div>');

            container.addClass('controller-input-container');

            container.append(`<label for="${id}">${label}</label>`);
            container.append(input);

            return container;
        },
        changeTension(event) {
            const num = Number.parseFloat(event.target.value);

            if (!Number.isNaN(num)) {
                this.tension = num;

                this.calculateCoefficientMatrix();
            }
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
                } else {
                    this.points.push(mousePosition);
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
        calculateCurve() {
            this.curvePoints = [];

            if (this.points.length >= this.minPoints) {
                for (let i = 0; i < this.points.length - 3; ++i) {
                    this.curvePoints = this.curvePoints.concat(this.calculatePiece(i));
                }
            }
        },
        calculatePiece(startIndex) {
            const geometry = this.points.slice(startIndex, startIndex + 4);

            return this.curveCalculator(geometry);
        },
        render() {
            this.calculateCurve();

            this.renderPoints();
            this.renderCurve();
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
                color: style.colors.controlPolygon
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
            twgl.drawBufferInfo(this.gl, bufferInfo, this.gl.LINE_STRIP);

            uniforms.color = style.colors.controlPoint;

            twgl.setUniforms(this.programInfo, uniforms);
            twgl.drawBufferInfo(this.gl, bufferInfo, this.gl.POINTS);
        }
    };

    Object.setPrototypeOf(CardinalSplineDemo, Program);

    return function setup(container, idPrefix) {
        const example = Object.create(CardinalSplineDemo);

        example.CardinalSplineDemo(container, idPrefix);

        example.start(false);
    }
});
