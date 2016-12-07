
uniform sampler2D ground_0;
uniform sampler2D ground_1;
uniform sampler2D noise;

uniform float repeat;
uniform float time;

varying vec2 vUv;

void main(){

    vec2 uv = vUv * repeat;

    vec4 col0 = texture2D( ground_0, uv );
    vec4 col1 = texture2D( ground_1, uv );
    vec4 grad = clamp(  texture2D( noise, uv ) * .5 + time, vec4(0.),vec4(1.) );

    vec4 col = mix( col0, col1, grad );
    gl_FragColor = col;
}
