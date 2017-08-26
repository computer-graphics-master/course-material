define(['js/twgl', 'js/2d-boilerplate', 'js/sylvester', 'js/style', 'js/util', 'js/matrix-form'], function(twgl, Program, s, style, util, matrixForm) {
    'use strict'

    const KochanekBartelsSplineDemo = {
        KochanekBartelsSplineDemo(container, idPrefix) {
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
            this.bias = 0.0;
            this.continuity = 0.0;

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
            controllerContainer.append(this.createNumberInput('Bias', 'bias', 0, 0.025, event => this.changeBias(event)));
            controllerContainer.append(this.createNumberInput('Continuity', 'continuity', 0, 0.025, event => this.changeContinuity(event)));

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
        changeBias(event) {
            const num = Number.parseFloat(event.target.value);

            if (!Number.isNaN(num)) {
                this.bias = num;

                this.calculateCoefficientMatrix();
            }
        },
        changeContinuity(event) {
            const num = Number.parseFloat(event.target.value);

            if (!Number.isNaN(num)) {
                this.continuity = num;

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
            const q1 = p * (1 + this.bias) * (1 - this.continuity);
            const q2 = p * (1 - this.bias) * (1 + this.continuity);
            const q3 = p * (1 + this.bias) * (1 + this.continuity);
            const q4 = p * (1 - this.bias) * (1 - this.continuity);
        
            this.coefficientMatrix = s.$M([
                [-q1, 2 * q1, -q1, 0],
                [q1 - q2 - q3 + 2, q3 - (2 * q1) + (2 * q2) - 3, q1 - q2, 1],
                [q2 + q3 - q4 - 2, q4 - q3 - (2 * q2) + 3, q2, 0],
                [q4, -q4, 0, 0]
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

    Object.setPrototypeOf(KochanekBartelsSplineDemo, Program);

    return function setup(container, idPrefix) {
        const example = Object.create(KochanekBartelsSplineDemo);

        example.KochanekBartelsSplineDemo(container, idPrefix);

        example.start(false);
    }
});
