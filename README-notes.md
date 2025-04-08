# Blog Web Application with React

creating with Vite

the react will be used for api handling
checking data ,store in cookie , localstorage

in react we will use : tinyMCE which i a react component , its a rich text editor will be use in the text are to give the user the ability to style the text

html-react-parser : to display the html which will come a text from the database

react hook form(library): to handle forms with this already written code

using environment variable .env to store sensitive data: the deference in vite and others

to install all the packages: npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form

for backend services will a existence backend service for user authentication(login/ sign up)
appwrite : is a complete backend service and its open source its like a firebase
we will use the user to create and recode of users , database to store data and storage the store out data in appwrite

handle images optimization of the image, handling the size of image

handling the complex text aria with styling

state management , routing , redux - redux toolkit

putting the app in production level and managing the sensitive data and put them in secret (database pass and url)

and deploying

and the services that we will be using

tutorial url: https://www.youtube.com/watch?v=IdlF1zsUN3M
!!! time stamp:3:25:38

env has to be in the project root folder
the env file will be read one time so if you add any changes to it you have to restart the server

in create-react-app
most of the time you will ge the variable with : process.env.(variable name) but not all the time
you have to start the variable with `REACT_APP_(NAME)`

but in Vite:
you have to start the variable with `VITE_(NAME)` like : VITE_SOME_KEY and to get the variable you have get it with : `import.meta.env.(variable name)` like: `import.meta.env.VITE_SOME_KEY`

for the appwrite you need these variables:
VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=''
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""

in appwrite database there is collections which is tables
dont forget when create a collection you have to go to its setting and give the permissions
and also in storage section
