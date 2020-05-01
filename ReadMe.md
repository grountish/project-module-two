excesAIze

Description
Lazy days at home are officially over. ExcersAIze is a project based on an Artificial Intelligence algorithm which recognizes objects within an image input. The idea is for the user to upload a picture, and based on the recognition of the algorythm, get different excercise routines. The user will also be able to save said routines and mix them together to create new ones, as-well as sharing them with other users!

User Stories
* 404 
* mainpage - logo and brief explanation of the project.
* homepage - Main functionality of the project, instructions and navbar for login signup and about. Able to see app but have to log in to try it.
* sign up - Signup 
* login - Login
* logout - logout for security.
* routine list - Where excercising routines will be displayed, with the possibility to mix them and make new routines
* about - about the app

Backlog
List of other features outside of the MVPs scope
User profile:
* see profile
* upload profile picture
* update profile info
* see other users profile
* list of routines
* edit routines and make new ones
Video chat:
* connect with other users to excercise together
* create videochat groups to make excercising groups
* stream same music

ROUTES:
* GET /main
    * renders the mainpage
* GET /home
    * renders the homepage
    * button begins experience and smooth scroll if logged in
    * button redirects to log-in
* GET /about
    * renders about
* POST /home
    * adds exercise to routines with a + button
* GET /auth/signup
    * renders the signup form
* POST /auth/signup
    * does not display if user is logged in
    * body:
        * username
        * email
        * password
* GET /auth/login
    * renders the login form
* POST /auth/login
    * does not display if user is logged in
    * body:
        * username
        * password
* GET /auth/logout
        * destroy session
* GET /personal
    * displays profile and routines
* GET /personal/edit
    * renders edit page
* POST /personal/edit
    * redirects to / if user is anonymous
    * body:
        * username
        * profile picture
        * email
* GET /personal/routine
    * renders every routine page
* POST /personal/routine
    * body:
        * excercises
    * button to delete excercise or move to another routine

User model

username: String,
email: String,
password: String,
imgName: String,
imgPath: String,
routines: [{type: Schema.Types.ObjectId, ref: 'Routine'}]


Routine model

name: String,
outines: [{type: Schema.Types.ObjectId, ref: 'Excercise'}],
description: String


Excercise model

name: String,
description: String,
type: String,
imgPath: String

Github
https://github.com/yolaresofia/project-module-two

Trello
https://trello.com/b/OluXJkN6/excersaize-app
