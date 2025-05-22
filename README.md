# My First Scene using Three.js

## What is This Project

  That's a simple 1-week project for my **Computer Graphics** class in **Universidade La Salle**, where a simple 3D scene has to be created using the *three.js* libray, introducing concepts of transformations and camera configuration.

  For this scene, I choosed to display three 3D objects (like the project's definition says): a **cube**, a **cone** and a **circle** ahead of a **plane** object used as **background**.

  Each of these objects (except the plane) are **animated**, being constantly **rotated** and **scalated** using dynamic values. The objects were also **translated** before the animation aiming better positioning and avoiding an overlapping of the objects.

## Seeing the Output

  This project is **hosted** using ***GitHub Pages***, so the webpage for this first scene result can be acessed [clicking here](https://j00nathan.github.io/three.js-first-scene/).

  If you plan to clone the repository, you will first need to have **npx** installed (version 10.9.2 is preferible to avoid versioning errors), which is included by default after installing **node.js**. If you have these requirements installed in your computer, you can proceed cloning the repository in a local directory and executing the following command to instantiate a local npx server displaying the webpage: 

`npx serve .`

  ***Orbit Controls*** are included in this implementation, the keybinds to move the camera at the webpage are the following:
- `left-click + drag` to move the camera around the point where the camera is
- `scroll in/out` to zoom in and zoom out
- `right-click + drag` or `ctrl + left-click + drag` to move the camera around
