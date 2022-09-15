# P5 Projects

- [P5 Projects](#p5-projects)
  - [List](#list)
    - [Hyperspace-visual  :dizzy:](#hyperspace-visual--dizzy)
    - [Maze generators :triumph:](#maze-generators-triumph)
      - [One agent :walking:](#one-agent-walking)
      - [Multi-agents - Displayed already generated :running::running:](#multi-agents---displayed-already-generated-runningrunning)
      - [Multi-agents - Live generation :running: :sparkles:](#multi-agents---live-generation-running-sparkles)
    - [Game of Life - cellular automaton :seedling:](#game-of-life---cellular-automaton-seedling)
    - [Snake :snake:](#snake-snake)
    - [Flappy bird :baby_chick:](#flappy-bird-baby_chick)

That repository contains some of my p5 projects. Trying, testing things... :)

They, actually, all use the library https://p5js.org/.

I firstly wanted to do all these things with p5py, but sadly, this was really slow...

Of course, most (all ?) of these projects are not optimized, and are probably just a start point.  
So if you think it might be improved, feel free to PR :) As it, I could learn again :D

---

> Inspired by a great teacher on Youtube, Daniel Shiffman, aka. "The Coding Train".
> 
> https://www.youtube.com/c/TheCodingTrain  
> https://twitter.com/thecodingtrain  
> https://twitter.com/shiffman

---


## List

### Hyperspace-visual  :dizzy:

My very first project, using a custom Star class.  
Some stars are generated, placed randomly, then depending the mouse X position, the Z-speed will change slower or faster, or even be backwarded :)


https://user-images.githubusercontent.com/17339605/190255526-0cd64bc4-381a-4018-b2c9-75675b67100b.mp4


### Maze generators :triumph:

All of these maze generators use an agent-system.  
This or these agents will travel through an unbuilt maze, then create a path, that allow you to play this generated path once the last agent back to the start.

Just go to the page, wait that the last agent comes back to the start, and move yourself with keyboard arrows.

#### One agent :walking:

Only one agent is used to create the maze, that resulting in a long-time generation is the dimensions are a bit large.


https://user-images.githubusercontent.com/17339605/190255546-54864875-be82-4658-b6bc-5d8e81861137.mp4


#### Multi-agents - Displayed already generated :running::running:

Some agents, generated randomly along the travel of existing ones, create the final path.  
Resulting in a short-time generation.  
But on this version, you'll never see the generation in live.


https://user-images.githubusercontent.com/17339605/190255538-b1484296-f419-4e99-8316-16bd237c921e.mp4


#### Multi-agents - Live generation :running: :sparkles:

Here, you're able to see and enjoy the generation by all agents :)  
Also, if you notice a cool effect, as a burning papersheet... It was not expected when I did this version, I admit !


https://user-images.githubusercontent.com/17339605/190255540-d0c293cf-f28b-4fb8-b9ec-3d39bd223b7d.mp4


### Game of Life - cellular automaton :seedling:

If you don't know what is the Game of Life, created by Conway, and are interested by, then click on https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life :)

Controls : 

- SpaceBar to pause/play the simulation
- When the simulation is running, you still can spawn cells by clicking on the canvas.
  - Also, when you maintain the click, the game will paused automatically, until you release it.
  - You also can maintain click while you move the mouse, to place many cells in once.


https://user-images.githubusercontent.com/17339605/190255536-0ea7f406-d89f-4699-921f-1199ba3b062a.mp4


### Snake :snake:

The well known game, Snake :).  
The speed (here the framerate) will increase each 5 foods eaten.

[ Demo coming soon ...]

### Flappy bird :baby_chick:

Another known game. A bird, some pipes, go ahead and beat your score :)

Controls : 

- Press Spacebar to jump
- Press "P" to play/pause
- Press "R" to restart

[TODO : Improve graphics ...]

[ Demo coming soon ...]