
var gl;

var a_coords_location;
var a_coords_buffer;
var a_texCoords_location;
var a_texCoords_buffer;

var u_texture_location;
var textureObject;
var bufferInd;

var uniformAnyMatrix;



function draw() {

    gl.clearColor(0.0,0.6,0.6,1);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   

    gl.bindBuffer(gl.ARRAY_BUFFER, a_coords_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STREAM_DRAW);
    gl.vertexAttribPointer(a_coords_location, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_coords_location);




    gl.bindBuffer(gl.ARRAY_BUFFER, a_texCoords_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STREAM_DRAW);
    gl.vertexAttribPointer(a_texCoords_location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_texCoords_location);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    gl.uniform1i( u_texture_location, 0 );


    var indices = new Uint8Array([0,  1,  2,      0,  2,  3,
	                               4, 5 , 6 ,      4,  6, 7,
								   8,9,10  ,        8,10,11,
								  12,13,14,        12,14,15,
								  
								  
								  16,17,18,        16,18,19,
								  20,21,22,        20,22,23,
								  24,25,26,        24,26,27,
								  28,29,30,        28,30,31,
								  
								  32,33,34,        32,34,35,
								  36,37,38,        36,38,39,
								  40,41,42,        40,42,43,
								  44,45,46,        44,46,47,
								  
								  48,49,50,        48,50,51,
								  52,53,54,        52,54,55,
								  56,57,58,        56,58,59,
								  60,61,62,        60,62,63]);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInd);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STREAM_DRAW);
   
   
    /* Translation*/
    var tx = -0.25; var ty = -0.25; var tz = 0.0;
    var transMat = new Float32Array( [1.0, 0.0, 0.0, 0.0,
                                      0.0, 1.0, 0.0, 0.0,
                                      0.0, 0.0, 1.0, 0.0,
                                      tx,  ty, tz, 1.0] );
									  
	/*===================scaling==========================*/

         var Sx = .5, Sy = .75, Sz = 1.0;
         var xformMatrix = new Float32Array([
            Sx,   0.0,  0.0,  0.0,
            0.0,  Sy,   0.0,  0.0,
            0.0,  0.0,  Sz,   0.0,
            0.0,  0.0,  0.0,  1.0  
         ]);


    var anyMat = new Float32Array( [	1.0,  0.0,   0.0,  0.0,
                                      0.0,  1.0,   0.0,  0.0,
                                     	0.0,  0.0,   1.0,  0.0,
                                      0.0,  0.0,   0.0,  1.0] );

    gl.uniformMatrix4fv(uniformAnyMatrix, false, anyMat);
	gl.uniformMatrix4fv(uniformTransMat, false, transMat);
	gl.uniformMatrix4fv(uniformScaleMat, false, xformMatrix);
	
	// set the light position
  //  gl.uniform3fv(lightWorldPositionLocation, [20, 30, 60,0]);
  // set the shininess
 //   gl.uniform1f(shininessLocation, shininess);
 
     // set the light color
 //   gl.uniform3fv(lightColorLocation, m4.normalize([1, 0.6, 0.6]));  // red light

    // set the specular color
 //   gl.uniform3fv(specularColorLocation, m4.normalize([1, 0.2, 0.2]));  // red ligh

    gl.drawElements(gl.TRIANGLES, 3*32, gl.UNSIGNED_BYTE, 0);

}


function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
  var vsh = gl.createShader( gl.VERTEX_SHADER );
  gl.shaderSource( vsh, vertexShaderSource );
  gl.compileShader( vsh );

  var fsh = gl.createShader( gl.FRAGMENT_SHADER );
  gl.shaderSource( fsh, fragmentShaderSource );
  gl.compileShader( fsh );

  var prog = gl.createProgram();
  gl.attachShader( prog, vsh );
  gl.attachShader( prog, fsh );
  gl.linkProgram( prog );

  return prog;
}


/**
You do not have work in loadTexture(). Don't worry!
*/
function loadTexture( url, textureObject ) {
    var img = new Image();
    img.onload = function() {
         gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.bindTexture(gl.TEXTURE_2D, textureObject);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
        gl.generateMipmap(gl.TEXTURE_2D);
        draw();
    }
    img.src = url;
}


function initGL() {
    var prog = createProgram( gl, vertexShaderSource, fragmentShaderSource );
    gl.useProgram(prog);

    a_coords_location = gl.getAttribLocation(prog, "a_coords");
    a_coords_buffer = gl.createBuffer();
    a_texCoords_location = gl.getAttribLocation(prog, "a_texCoords");
    a_texCoords_buffer = gl.createBuffer();

    bufferInd = gl.createBuffer();

    u_texture_location = gl.getUniformLocation(prog, "u_texture");
    textureObject = gl.createTexture();
    loadTexture( "farewell.png", textureObject );

    uniformAnyMatrix = gl.getUniformLocation(prog, "u_Rx");
    uniformTransMat = gl.getUniformLocation(prog, "u_T");
	uniformScaleMat = gl.getUniformLocation(prog, "u_S");
	
	 // var lightWorldPositionLocation =
     // gl.getUniformLocation(prog, "u_lightWorldPosition");
	  
	  //  var lightColorLocation =
    //  gl.getUniformLocation(program, "u_lightColor");
 // var specularColorLocation =
   //   gl.getUniformLocation(program, "u_specularColor");
	//  //  var shininessLocation = gl.getUniformLocation(program, "u_shininess");
}


var cur = 15;
var allCorPos = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var eval = [1,3,4,1,3,3,3,1]
var q = 0;
var dx = [-4,+4,-1,+1];
 function click(gl)
 {
    var newPos = cur + dx[eval[q]-1];
    var j = cur * 8;
	var k = newPos * 8;
	allCorPos[cur] = newPos;
	allCorPos[newPos] = cur;
	cur = newPos;
     for (let i = 0; i < 8; i++) {
	
     
	[texCoords[j+i],texCoords[k+i]] = [texCoords[k+i],texCoords[j+i]];

	
   
  }
  q++;
	
	if(q == 8)
	{
	   q = 0;
	   cur = 15;
	
	}
	 gl.bindBuffer(gl.ARRAY_BUFFER, a_texCoords_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_texCoords_location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_texCoords_location);
   gl.clearColor(0.0,0.6,0.6,1);
   gl.enable(gl.DEPTH_TEST);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   gl.drawElements(gl.TRIANGLES, 3*32, gl.UNSIGNED_BYTE, 0);
 }


function init() {
  var canvas = document.getElementById("webglcanvas");
  gl = canvas.getContext("webgl");
  initGL();
  canvas.onmousedown = function (ev) { click(gl); };
}
