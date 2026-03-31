import { default as gulls } from 'https://cbcdn.githack.com/charlieroberts/gulls/raw/branch/main/gulls.js'
import { default as Video    } from '/gulls/video.js'
import { default as Mouse    } from '/gulls/mouse.js'


  async function run() {
  // start seagulls, by default it will use the first <canvas> element it
  // finds in your HTML page
  const sg = await gulls.init()

  // a simple vertex shader to make a quad
  const quadVertexShader = gulls.constants.vertex


  // our fragment shader, header contains bindings
  //const fragmentShader =  await gulls.import('./shaders/header.wgsl') + await gulls.import( './shaders/default.wgsl' )
  const fragmentShader = 
    `
    @group(0) @binding(0) var<uniform> res : vec2f;
    @group(0) @binding(1) var<uniform> frame : f32;
    @group(0) @binding(2) var<uniform> slider : f32;
    @group(0) @binding(3) var backSampler: sampler;
    @group(0) @binding(4) var backBuffer: texture_2d<f32>;
    @group(0) @binding(5) var<uniform> mouse : vec3f;

    // NOTE THAT THERE IS A DIFFERENT GROUP NUMBER FOR THE
    // VIDEO TEXTURE BELOW. This lets gulls easily rebind
    // the texture for each frame, without having to rebind
    // the other variables in group 0. Given the new group,
    // the binding index resets to 0.
    @group(1) @binding(0) var videoBuffer:    texture_external;
  
    @fragment
    fn fs( @builtin(position) pos : vec4f ) -> @location(0) vec4f {
      let p = pos.xy / res;

      let video = textureSampleBaseClampToEdge( videoBuffer, backSampler, p );

      let fb = textureSample( backBuffer, backSampler, p );

      let out = video * .05 + fb * .975;

      return vec4f( out.rgb, 1. );
  }`

  // our vertex + fragment shader together
  const shader = quadVertexShader + fragmentShader



  //get data for uniforms
  const slider = document.querySelector('#slider')
  

  //create uniforms
  let u_frame = sg.uniform(0)
  let u_slider = sg.uniform(slider.value)

  // set initial mouse values
  // Mouse.values[0] = x coordinate (between 0-1)
  // Mouse.values[1] = y coorcinate (between 0-1)
  // Mouse.values[2] = left mouse button (either 0 or 1)
  Mouse.init()
  const u_mouse = sg.uniform( Mouse.values )
  
  //video
  await Video.init()


  //Back buffer 
  const back = new Float32Array( gulls.width * gulls.height * 4 ) //four floats per pixel (rgba)
  const t_feedback = sg.texture( back ) 
  

  // create a render pass
  const renderPass = await sg.render({ 
    shader,
    // add a data array to specify uniforms / buffers / textures etc.
    data:[
      sg.uniform([ window.innerWidth, window.innerHeight ]),
      u_frame,
      u_slider,
      sg.sampler(),
      t_feedback,
      u_mouse,
      sg.video( Video.element )
    ],
    //functions
    copy: t_feedback, //every frame copy frame to t_feedback

    onframe() {u_frame.value++}, //update frame count
    onframe() { u_mouse.value = Mouse.values } //update mouse pos

  })


  // our sliders value returns a string, so we'll convert it to a
  // floating point number with parseFloat()
  slider.oninput = ()=> u_slider.value = parseFloat( slider.value )

  // run our render pass
  sg.run( renderPass )
}

run()