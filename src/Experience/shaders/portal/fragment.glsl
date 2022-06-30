#define M_PI 3.1415926535897932384626433832795

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

#pragma glslify: perlin2d = require('../partials/perlin2d.glsl')

vec2 rotate(vec2 v, float a) 
{
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

varying vec2 vUv;


void main()
{
    // Uv s
    vec2 centeredUv = vUv - 0.5;
    float distanceToCenter = length(centeredUv);
    float radialRatio = atan(centeredUv.y, centeredUv.x) / (M_PI * 2.0) + 0.5;

    // Discard
    float discardPerliin = perlin2d(centeredUv * 20.0);

    if(distanceToCenter - discardPerliin * 0.03 > 0.5)
    {
        discard;
    }

    // Mix One
    vec2 distoredUv1 = rotate(centeredUv, distanceToCenter * 6.0);
    float mixOne = perlin2d(distoredUv1 * 20.0);
    mixOne += perlin2d(distoredUv1 * 8.0);
    mixOne -= distanceToCenter * 6.0;
    mixOne = step(-1.5, mixOne);
    vec3 color = mix(uColor1, uColor2, mixOne);

    // Mix Two 
    vec2 distoredUv2 = rotate(centeredUv, distanceToCenter * 3.0);
    float mixTwo = perlin2d(distoredUv2 * 20.0);
    mixTwo += perlin2d(centeredUv * 3.0);
    mixTwo = step(0.5, mixTwo);
    color = mix(color, uColor3, mixTwo);

    gl_FragColor = vec4(color, 1.0);
}