
uniform sampler2D ground_0;
uniform sampler2D ground_1;
uniform sampler2D noise;

uniform float repeat;
uniform float time;

varying vec2 vUv;

void main(){

    vec2 tuv = vUv * repeat;
    vec4 col0 = texture2D( ground_0, tuv );
    vec4 col1 = texture2D( ground_1, tuv );
    vec4 grad = clamp(  texture2D( noise, tuv ) * .5 + time, vec4(0.),vec4(1.) );
    vec4 color = mix( col0, col1, grad );

    gl_FragColor = color;
}
