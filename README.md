# Todo App

## About the app

This installable web app (SPA/PWA) enables you to create todo lists containing tasks & add, delete, update & check those tasks.

The app was built using React, Redux Toolkit, React Router, MUI, Firebase & deployed with GitHub Pages.

You can use the app in the browser or download it to your device. To use app in the browser, navigate to https://vadimgierko.github.io/todo-app/.

## How to download the app

You can download the app from the browser. If you're using Google Chrome, navigate to https://vadimgierko.github.io/todo-app/. New “install” icon will appear on the url right-hand side. The install icon looks like an ‘install icon’ symbol inside a computer screen icon, usually to the left of the share this page icon. Install may be accessed by tapping or clicking the install icon.

## Features

- User Authentication (user can create a free account and log in to use the app)
- Adding, updating & deleting (CRUD) todo lists (*with auto displayed amount of lists in parentheses*)
- Adding, updating & deleting (CRUD) tasks (todos) in particular lists (*with auto displayed amount of nested tasks in parentheses*)
- Dark/ light Mode switch
- PWA (the app can be downloaded from the browser & installed on any device)

## Tech Stack

- React 18.2
- React Context API
- Firebase 9.8
  - Realtime Database
  - Authentication
- Redux 4
  - Redux Toolkit 1.8
  - react-redux package
- React Router 6.3
- MUI 5.8
- GitHub Pages 4.0

## Note

The app was initially generated from my [vadimgierko/react-redux-router-firebase-auth-rtdb-crud-mui-app template](https://github.com/vadimgierko/react-redux-router-firebase-auth-rtdb-crud-mui-app#readme) & was expanded afterwards (the state management system was rewritten from scratch basically).

## How to use the app with partially implemented GTD system

You can partially implement David Allen's GTD (*Getting Things Done*) System using basic features of this app:

1. Create a few predefined lists:
  - 📂 PROJECTS (in progress nested tasks; define next action❗)
  - 🤷‍♂️ SOMEDAY/MAYBE (potential future projects or one-off tasks)
  - 🚀 NEXT ACTIONS (copy 1 from each project + closest one-off tasks)
2. When your adding a task:
  - if it must be done due some date 👉 add it to your calendar
  - if it must be done & takes 2 minutes to do 👉 do it now!
  - if it must be done, takes more than 2 minutes & is a one-off task 👉 add it to NEXT ACTIONS list
  - if it must be done, takes more than 2 minutes & is a project (a set of tasks) 👇
    - add the new project name (*de facto* new todo) to PROJECTS list
    - define the closest physical next action & add it to NEXT ACTIONS list
  - if it mustn't be done now/ASAP, but you may be interested to do it in the future 👉 add it to SOMEDAY/MAYBE list

Additionally, you can create separate lists for particular projects you're currently working on & put all project-related tasks there. But remember ⚠️ to always define the closest next physical action & to duplicate it into NEXT ACTIONS list (you can also mark this tasks as next action in parentheses inside a project). 