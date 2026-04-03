Assignment 2 - WebGPU Intro <br/>
Sarah Hatch <br/>
April 2nd 2026<br/>

[Shader website](https://sarahschool27.github.io/4300_A2_Hatch/) 
(Uses camera locally)<br/>
[Main shader code](https://github.com/SarahSchool27/4300_A2_Hatch/blob/main/main.js)<br/>

Credit
- uses the [gulls framework](https://codeberg.org/charlieroberts/gulls/src/branch/main) by Prof Charlie Roberts
- Uses an adaptation of the gradient noise algorithm code written by [Inigo Quilez in 2013.](https://www.shadertoy.com/view/XdXGW8)


Aesthetic <br/>
In this piece I explored two ideas, incomplete video and wave movement. When I initially thought about masking video I thought about flashback memory scenes in media, where things are seperated and theres other particles in the area. Instead of going all in on fragmentation I wanted to try movement where the video windows opened and closed over time. I was inspired by my grid tests to incoperate sin waves into the piece and further inspired by rocking motion when I realized I could get one sine wave to drive another. One of the challenges aesthetically in this piece was getting the different sections to feel cohesive. Driving most of the movement in the scene off of the middle sin wave helped things feel related. I also tried to keep the colors cohesive. Even though there is video which comes with the users own colors I have tinted it to keep it in a smaller value range. I also used the video color layer in the background where the ripple effect is to spread it around the scene.


Technical<br/>
I began by exploring how to make grids and patterns in wgsl, especially how to modify the positions of the grid. The first part of this project I made was the dot grid at the top and bottom of the screen. I experimented with modifying the y-position of the gird both before and after the grid operation, what I got was this two fold result of modifyung before changed the shape of the grid and modfying after changed the content of the individual grid. From there I was already messing with sin operations, and I expanded on that to see how I could display a the line itself. I realized that with the ways creating shapes works in shaders you end up with distance information and as long as you hold on to that information you can continue to use it to create masks. In previous projects I have wanted to get information about whats surronding an object, but I'm almost always doing so from a point where I only have a black and white mask, these distance masks with information in the grey allowed me to get the space between the two lines. From there I created a mask of the space between sin waves and a noise algorithm and used that to show parts but not all of the video buffer. Doing this project helped me better understand grids, sin wave math, and the creating and manipulating of mask layers.

Feedback Reflection<br/>
The feedback I got was getnerally in line with what I expected. The lense my project was described was kind of hypnotic do to all the moving waves, but I also got feedback that it reminded them of multiple different things: marbles, sunlight, fish swimming. This was slightly unexpected as I wasn't trying to be representational in my patterns, but I do think abstract patterns often remind viewers of different things. In some ways this even better fits into my lose memory theme as the particles in the background could be many different things according to the viewers experiences. I was pleased to hear that to the feedback giver it seemed like the different pieces blended together well and nothing felt out of place to them as that was something I was worried about given there are a lot of different parts and techniques being used.

