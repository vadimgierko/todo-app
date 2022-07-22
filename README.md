# React Redux Router Firebase Auth RTDB CRUD MUI App Template Starter
(with basic TODO APP built-in as an example)

## Why/ when you may want to use this template app starter

Use this template starter app if you want to quickly start a new CRUD app:
- written in **React**
- with Redux state management using **Redux Toolkit**
- integrated with **Firebase Realtime Database** (you can integrate another database, like Firebase Firestore => just change the encapsulated code in CRUD functions stored in firebase-rtdb-crud folder)
- users **Authentication** set (Firebase too)
- basic routes set with **React Router**
- basic not styled layout & basic pages (routes)
- with **MaterialUI (MUI)** library for UI

If you want to find more about tech stack (versions) or app built-in features, scroll down to these sections in this README file.

If you want to set up & start your new app based on this template right now, read the next section below.

## How to set up & start your new app based on this template

- [ ] clone/ download this repository
- [ ] open it in your code editor (I'm using VSC via GitHub Desktop)
- [ ] open new terminal & run `npm install` to install all dependencies & create node_modules folder
- [ ] create `.env.local` file in root directory (not in src or public folder!)
- [ ] now open your browser & set up a new Firebase project (read Firebase docs how to do it)
- [ ] when the project will be set, copy its SDK keys properly into `.env.local` file (there is a fake example below):

```
/.env.local file

REACT_APP_API_KEY=AIzaSy4ur9OLh85Rg12dqZrk_nytEf82aNpEm2g
REACT_APP_AUTH_DOMAIN=your-auth-domain.firebaseapp.com
REACT_APP_DATABASE_URL=https://your-database-url.europe-west1.firebasedatabase.app
REACT_APP_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-storage-bucket.appspot.com
REACT_APP_MESSAGING_SENDER_ID=9687456322
REACT_APP_APP_ID=1:1009687456322:web:72fe62d7t94bfd905d6e7f
```

- [ ] now you're app is integrated with Firebase (Realtime Database & Authentication), so now you can:
  - [ ] run the app in browser with the command `npm start` in your terminal
  - [ ] figure out app structure, its features & so on (detailed description of app structure & features will be added later, but now you can check Features section of this README file to get basic info)

## Tech Stack

- [X] React 18
- [X] React Context API
- [X] Firebase 9
  - [X] Realtime Database
  - [X] Authentication
- [X] Redux 4
  - [X] Redux Toolkit 1.8
  - [X] react-redux package
- [X] React Router 6
- [X] MUI 5.8
- [X] GitHub Pages

## Features

- [X] Redux state management set:
  - [X] configured store with 2 reducers
  - [X] 2 kind of slices/ reducers set:
    - [X] for items (CRUD + pending)
    - [X] for current logged user
  - [X] CRUD async thunks integrated with Firebase RTDB CRUD functions (same names for both):
    - [X] addItemWithAutoKey()
    - [X] addItemWithGivenKey()
    - [X] deleteItem()
    - [X] fetchItems() // all items !
    - [X] fetchItem()
    - [X] updateItem()
  - [X] 2 additional more specific thunks to cut the amount of fetched data:
    - [X] updateItemValue()
    - [X] toggleItem() 

- [X] Firebase Realtime Database integration set
  - [X] config file using env (you need to create a new .env.local file for a new project & you're set)
  - [X] basic Firebase RTDB CRUD functions

- [X] Basic UI created using MUI
  - [X] `<Layout />` wrapping component, which consists from:
    - [X] `<Navbar />` with
      - [X] toggable `<UserIconMenu />` (sign in/up, log out)
    - [X] temporary toggable `<SideMenu />` (`<Drawer />`)
    - [X] `<Footer />`

  - [X] reusable `<AuthPage />` component (for signing in/up)
  - [X] reusable `<Form />` built with MUI components
  - [X] conditional `<ItemCard />` component (to read/ update an item in editMode)

- [X] Built-in dark mode
  - [X] darkMode value (true/false) & switchMode() function are available through useDarkMode() custom hook <= Context API
  - [X] => this triggers changes of default MUI theme provider (pallete => mode: dark/ light)

- [X] Routing (React Router) + reusable components/templates/pages for each type of routes & auth access:
  - [X] About page => / || /about
  - [X] SignIn page => /signin
  - [X] SignUp page => /signup
  - [X] Items page => /items
  - [X] Item page => /item/:itemKey
  - [X] Reusable AuthForm & AuthPage for:
    - [X] /sign-in
    - [X] /sign-up
  - [X] Items page for pages with lists of items
    - [X] /items
  - [X] item page for one single item
    - [X] /items/:itemKey

## TODO:

- [ ] add a few words about how data will be structured in database & security rules needed.

- [ ] Basic Docs with description (when working on next project based on this template to do it step by step)
  - [ ] here in README
  - [ ] in separate page ? => gh-pages
  - [ ] about || in footer
  - [ ] doc comments ??
- [ ] when complete, delete TODO section & start a new repo for TODO with UI (react-bootstrap; MUI)

## ISSUES:

- [ ] google suggestions in auth form show up not near the inputs they should/ refer

## TODO WHEN NEEDED (for another app with these features):
- [ ] update deleteUserAccount() /deleteUser.js to delete all user's data & force resign in:
      check TODO comment inside deleteUserAccount()
- [ ] fix multiply useEffect in ItemPage => to much pending... (pending in fetchItem & fetchItems)...
- [ ] AddItem page
- [ ] UpdateItem page