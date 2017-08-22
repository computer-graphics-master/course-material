define(['js/sylvester'], function hermite(sylvester) {
    'use strict'

    const publicAPI = {};

    const deltaParam = 0.01;

    const coefficientMatrix = sylvester.$M([
        [2, -3, 0, 1],
        [-2, 3, 0, 0],
        [1, -2, 1, 0],
        [1, -1, 0, 0]
    ]);

    publicAPI.calculateCurve = function calculateCurve(points = [], M = coefficientMatrix, params = [0, 1]) {
        const geomMatrix = sylvester.$M(points);
        const coeffs = sylvester.$M(M);

        const position = [];

        for (let t = params[0]; t < params[1]; t += deltaParam) {
            const paramVector = sylvester.$V([t * t * t, t * t, t, 1]);
            
            const result = geomMatrix.multiply(coeffs.multiply(paramVector));

            position.push(result.elements[0], result.elements[1]);
        }

        return position;
    }

    return publicAPI;
});