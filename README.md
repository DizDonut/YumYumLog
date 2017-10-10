# Yum YumLog

## Collaborators: [jbcurrie](https://github.com/jbcurrie) | [dizDonut](https://github.com/dizDonut) | [travjbarnes](https://github.com/travjbarnes) | [buikevin96](https://github.com/buikevin96)

Yum Yum Log is a full stack web application that allows users to log their weekly food entries, track their personal progress, see nutrition data, and compare their results to the larger community.

The application stores nutrition data to a SQL database, and manipulates the data models with the Sequelize ORM. Handlebars.js is being used to render the front-end view.

Yum Yum Log is password protected, with authenticated API routes. 

# [Demo the App](https://aqueous-spire-55286.herokuapp.com/)

# [Slide Deck](https://docs.google.com/presentation/d/1QHL7gwAipinHJwtbs4vVJXGIWGpV9vaU8A4UyCxtbvA/edit?usp=sharing)

# Features

* ## Authentication and secured login

   ![](https://media.giphy.com/media/xT9IgnwFhumbKDl6tq/giphy.gif)

   Using passport.js and an encryption function, each user has secured access to their profile. 

* ## API routing

   ![](https://media.giphy.com/media/3o7aD06rFRAek5ZZQc/giphy.gif)

   Server-side authenticated API routes request and deliver data objects for manipulation on the client-side application interface. Based on the category selected, the user receives a datalist of food from the MySql database. 

* ## Persistent data storage 

   ![](https://media.giphy.com/media/l378sWAHEk4QxUKHe/giphy.gif)

   Yum Yum Log stores daily food log entries to MySql; the data is persistent, which allows the app to show users their personal progress over time; a community dashboard page shows progress for all users by category (fruits or vegetables).

   Using tools such as the Moment.js library, the app logs entries for the current calendar week and displays historical food log data

* ## View
   ![](https://media.giphy.com/media/xT9IgsEnLT0RjVqAIE/giphy.gif)

   Handlebars.js allows the application to dynamically display data to the webpage, creating a friendlier presentation for the user. 

**Technologies:** *Node.js, Express.js, Sequelize, Passport.js, bcrypt, handlebars.js, Heroku, W3CSS*
