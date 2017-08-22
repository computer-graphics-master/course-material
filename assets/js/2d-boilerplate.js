define(['js/twgl', 'js/sylvester'], function twoDBoilerplate(twgl, sylvester) {
    'use strict'

    const width = 320;
    const height = 240;
    
    const vertexShader = 
    `attribute vec2 position;

    uniform vec2 resolution;
    
    void main() {
        // Convert coordinates to -1 -> 1
        vec2 clipSpace = (position / resolution) * 2.0 - 1.0;

        // Move origin to the top-left corner
        gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
        gl_PointSize = 6.0;
    }`;
    
    const fragmentShader =
    `precision mediump float;

    uniform vec4 color;
    
    void main() {
        gl_FragColor = color;
    }
    `;

    const defaultOptions = {
        vertexShader,
        fragmentShader,
        width,
        height
    }

    const delay = function delay(ms) {
        return new Promise(function executor(resolve) {
            setTimeout(resolve, ms);
        });
    };

    const Program = {
        Program(render, options = {}) {
            this.render = render;
            this.settings = Object.assign({}, defaultOptions, options);
        },
        setupDOM() {
            this.settings.element
                .append(`<canvas id="${this.settings.id}" width="${this.settings.width}" height="${this.settings.height}"></canvas>`);

            return delay(0);
        },
        setupGL() {
            this.canvas = document.getElementById(this.settings.id);
            this.setupEventHandlers();

            this.gl = this.canvas.getContext('webgl');

            if (!this.gl) {
                throw new Error('Failed to setup WebGL!');
            }
            
            this.programInfo = twgl.createProgramInfo(this.gl, [ this.settings.vertexShader, this.settings.fragmentShader ]);
            
            twgl.resizeCanvasToDisplaySize(this.gl.canvas);
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            this.gl.useProgram(this.programInfo.program);

            const uniforms = {
                resolution: [this.gl.canvas.width, this.gl.canvas.height]
            };

            twgl.setUniforms(this.programInfo, uniforms);
        },
        getMouseCoordinates(event) {
            return sylvester.$V([event.offsetX, event.offsetY ]);
        },
        setupEventHandlers() {
            this.canvas.addEventListener('mousedown', event => this.onMouseDown(this.getMouseCoordinates(event)));
            this.canvas.addEventListener('mouseup', event => this.onMouseUp(this.getMouseCoordinates(event)));
            this.canvas.addEventListener('mousemove', event => this.onMouseMove(this.getMouseCoordinates(event)));
        },
        onMouseDown() {
            // Shadow me
        },
        onMouseUp() {
            // Shadow me
        },
        onMouseMove() {
            // Shadow me
        },
        drawOnce() {
            this.render();
        },
        drawContinuously() {
            this.drawOnce();
            requestAnimationFrame(() => this.drawContinuously());
        },
        start(shouldDrawOnce = true) {
            this.setupDOM()
                .then(function resolved() {
                    this.setupGL();

                    if (shouldDrawOnce) {
                        this.drawOnce();
                    } else {
                        this.drawContinuously();
                    }
                }.bind(this));
        }
    };

    return Program;
});