#define M_PI 3.1415926535897932384626433832795

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

#pragma glslify: perlin3d = require('../partials/perlin3d.glsl')

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
    float discardPerliin = perlin3d(vec3(centeredUv * 20.0, uTime * 0.001));

    if(distanceToCenter - discardPerliin * 0.03 > 0.5 - (0.03 * 0.5))
    {
        discard;
    }

    // Mix One
    vec2 distoredUv1 = rotate(centeredUv, distanceToCenter * 6.0);
    float mixOne = perlin3d(vec3(distoredUv1 * 20.0, uTime * 0.001));
    mixOne += perlin3d(vec3(distoredUv1 * 8.0, uTime * 0.001));
    mixOne -= distanceToCenter * 6.0;
    mixOne = step(-1.5, mixOne);
    vec3 color = mix(uColor1, uColor2, mixOne);

    // Mix Two 
    vec2 distoredUv2 = rotate(centeredUv, distanceToCenter * 4.0);
    float mixTwo = perlin3d(vec3(distoredUv2 * 20.0, uTime * 0.001));
    mixTwo += perlin3d(vec3(centeredUv * 3.0, uTime * 0.001));
    mixTwo += pow(abs((distanceToCenter - 0.25) * 4.0), 2.0);
    mixTwo = step(0.4, mixTwo);
    color = mix(color, uColor3, mixTwo);

    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(test, test, test, 1.0);
}