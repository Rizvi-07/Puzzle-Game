var vertexShaderSource =

       `attribute vec3 a_coords;
        attribute vec2 a_texCoords;

        uniform mat4 u_Rx;
        uniform mat4 u_T;
		uniform mat4 u_S;
//		uniform mat4 u_lightWorldPosition;
        varying vec2 v_texCoords;
		

        void main() {

            v_texCoords = a_texCoords;

            gl_Position = u_T*u_S*u_Rx*vec4(a_coords, 1.0);
            }`;


/* Fragment Shader Code */

var fragmentShaderSource =

       `precision mediump float;

        uniform sampler2D u_texture;

        varying vec2 v_texCoords;

        void main() {
            vec4 color = texture2D( u_texture, v_texCoords );

            gl_FragColor = color;
            }`;