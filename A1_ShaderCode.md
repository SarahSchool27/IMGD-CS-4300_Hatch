//Sarah Hatch
//Assignment 1 - Shader Live Coding
//Black Hole Shader
//March 23rd, 2026

// PRESS CTRL+ENTER TO RELOAD SHADER
// reference at https://codeberg.org/charlieroberts/TheSchwartz#reference
// for wgsl reference see https://webgpu.rocks/wgsl/functions/numeric/
@fragment
fn fs( @builtin(position) pos : vec4f ) -> @location(0) vec4f {
  // get normalized texture coordinates (aka uv) in range 0-1
  let npos  = uvN( pos.xy );

  //dist field center
 	var d = distance(0.5, npos.x) * distance(0.5, npos.y);
	var dist = distance(vec2(0.5), npos);

  var color = vec3(0.0);

  if(frame < 100){
       color = PartOne_circlePulse(npos);


  }else if(frame< 300){

	   var range = 0.2;

	   var circle = (1-smoothstep(0.1, abs(range*sin(frame/100)), dist));

     color = vec3(circle);

  }else if(frame <400){
    var range = 2.;
    var circle =  1.-smoothstep(0.1, abs(range*sin(frame/100.)), dist);

    color = vec3(circle);
  }
  else if(frame <500){
    var oval = makeOval(vec2f(0.1),vec2f(0.5), 0.8, npos.xy);

	   var range = 0.0001;		
	   var circle =  (1-smoothstep(0.1, abs(range*sin(frame/100)+0.2), dist));


     color = vec3(circle*oval);
  } else if (frame < 1500){
      var range = 2.;
      var circle =  1.-smoothstep(0.1, abs(range*sin(frame/100.)+0.5), dist);
      color = vec3(circle);

      //swirl
    	//color = 1. - color;
    	color *=swirl(npos).rgb;


  }else if (frame < 2000){
    var range = 2.;
    var circle =  1.-smoothstep(0.1, abs(range*sin(frame/100.)+0.5), dist);
    color = vec3(circle);

    //swirl
    //color = 1. - color;
    color *=swirl(npos).rgb;

    color += PartX_Radial(npos, vec2(0.5), 1., 0.002);



  }
  else if (frame < 2200){
    color = 3*PartX_Radial(npos, vec2(0.5), 1., 0.002) * abs(cos(frame/100));
  }
  else if (frame < 2600){

  	color = PartX_Radial(npos, vec2(sin(frame/100), cos(frame/100)), 1., 0.002) * abs(cos(frame/100));
  }else if(frame < 3000){

      var dots = 0.;

      for( var i:f32 = 0.0; i < 1.; i+= 0.1) {
        var acircle = 1.- makeCircle(vec2(i), 0.06, npos);
        dots += acircle;
      }

    	color =vec3(dots);
      color +=0.7*lastframe(npos+vec2(0.1,0)).rgb;

  }else if(frame < 3300){
    var numCircs = 20.; //actually one less than numCircles


  	var dots = 0.;

  	for( var i:f32 = 0.0; i <= 1.; i+= 1/numCircs) {
      var acircle = 1.- makeCircle(vec2(i*abs(cos(frame/10))), 0.5/numCircs, npos);

      dots += acircle;
    }
    color =vec3(dots);

    color +=0.7*lastframe(npos+vec2(0.1,0)).rgb;

  }else if(frame < 3800){
			var numCircs = 20.; //actually one less than numCircles
      var dots =0.;
    	var numLines= 10.;
    	for( var y:f32 = 0.0; y < numLines; y+= 1) {

    		for( var i:f32 = 0.0; i <= 1.; i+= 1/numCircs) {
        	var acircle = 1.- makeCircle(vec2(i+(cos(frame/100)+y/numLines),i), 0.5/numCircs, npos);

       	 dots += acircle;
      	}
    	}

      color =vec3(dots);


	    color +=0.7*lastframe(npos+vec2(0.1,0)).rgb;
  }
  else if(frame < 4000){
       color = PartOne_circlePulse(npos);
       color +=0.7*lastframe(npos+vec2(0.1,0)).rgb;


  }









	//modify color. mult color by mask;
	let colorshift = 0.4 * cos(frame/100)+0.2;
	color *= vec3(0.8,colorshift,0.3);

 	return vec4f(color, 1. );


}


fn PartOne_circlePulse(npos: vec2f) -> vec3f{

	var circle = makeCircle(vec2f(0.5), 0.1, npos.xy);
 	var d = distance(0.5, npos.x) * distance(0.5, npos.y);
	var dist = distance(vec2(0.5), npos);

	circle *= (1.0- smoothstep(0.1, abs(0.1*sin(frame/100)+0.2), dist));


	return vec3f(circle);
}



fn PartTwo_AltPulse(npos: vec2f, range: f32) -> vec3f{

 	var d = distance(0.5, npos.x) * distance(0.5, npos.y);
	var dist = distance(vec2(0.5), npos);

	var circle =  (1-smoothstep(0.1, abs(range*(1+sin(frame/50))), dist));

	return vec3f(circle);
}

fn PartX_Radial(npos: vec2f, cent: vec2f, scale: f32, spinSpeed: f32)-> vec3f{

		var pos = cent - npos;

    var a = atan(pos.x/pos.y + (frame /100.));
		a = atan(pos.x/pos.y) + PI*fract(frame /(1/spinSpeed));
		var f = abs(cos(a));



		return vec3f(f);

}




fn makeCircle(cent: vec2f, size: f32, npos: vec2f) -> f32{
	var dist = distance(cent, npos);
	var circle = step(size, dist);
	return circle;

}




fn makeOval(cent1: vec2f, cent2:vec2f, size: f32, npos: vec2f)-> f32{
	var dist = distance(vec2(cent1), npos) + distance(vec2(cent2), npos);
	var circle2 = step(size, dist);
	return circle2;

}


fn swirl(npos: vec2f)->vec4f{
	var p = npos; //an editable variable
	p.x += sin(seconds()*0.2)*0.5;
	p.y += cos(seconds()*0.9)*0.5;

	//make circles
	var circle = distance(p, vec2(0.5,0.5)); //distance func, when dist = 0 its black

	//how do we constrain it??
	circle = step(mouse.y, circle);

	let feedback = lastframe( rotate ((npos), seconds()/8));
	let out = circle*0.2 + feedback *0.425;

return out;
}
