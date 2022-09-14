# P5 Projects

- [P5 Projects](#p5-projects)
  - [> https://twitter.com/shiffman](#-httpstwittercomshiffman)
  - [List](#list)
    - [Hyperspace-visual](#hyperspace-visual)
    - [Maze generators](#maze-generators)
      - [One agent](#one-agent)
      - [Multi-agents - Displayed already generated](#multi-agents---displayed-already-generated)
      - [Multi-agents - Live generation](#multi-agents---live-generation)
    - [Game of Life - cellular automaton](#game-of-life---cellular-automaton)

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

### Hyperspace-visual

My very first project, using a custom Star class.  
Some stars are generated, placed randomly, then depending the mouse X position, the Z-speed will change slower or faster, or even be backwarded :)

[ Demo coming soon... ]


### Maze generators

All of these maze generators use an agent-system.  
This or these agents will travel through an unbuilt maze, then create a path, that allow you to play this generated path once the last agent back to the start.

Just go to the page, wait that the last agent comes back to the start, and move yourself with keyboard arrows.
#### One agent

Only one agent is used to create the maze, that resulting in a long-time generation is the dimensions are a bit large.

[ Demo coming soon... ]


#### Multi-agents - Displayed already generated

Some agents, generated randomly along the travel of existing ones, create the final path.  
Resulting in a short-time generation.  
But on this version, you'll never see the generation in live.

[ Demo coming soon... ]


#### Multi-agents - Live generation

Here, you're able to see and enjoy the generation by all agents :)  
Also, if you notice a cool effect, as a burning papersheet... It was not expected when I did this version, I admit !

[ Demo coming soon... ]


### Game of Life - cellular automaton

If you don't know what is the Game of Life, created by Conway, and are interested by, then click on https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life :)

Controls : 

- SpaceBar to pause/play the simulation
- When the simulation is running, you still can spawn cells by clicking on the canvas.
  - Also, when you maintain the click, the game will paused automatically, until you release it.
  - You also can maintain click while you move the mouse, to place many cells in once.

[ Demo coming soon... ]





