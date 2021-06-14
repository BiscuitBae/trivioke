# Trivioke

Trivia quiz game made with React.

## Table of Contents

1. [Team](#team)
2. [Usage](#Usage)
3. [Requirements](#requirements)
4. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
5.[Deployment](#deployment)

## Team

  - __Development Team Members__: Berhane Cole, Bilal Hankins, James Thomason, & Persis Randolph


## Usage

> Sign Up/Login leads to trivia page where user can input team names, trivia category, and difficulty. Begins when begin game button is clicked, Correct answer adds a point to the team and incorrect triggers youtube call for karaoke.

## Requirements

- MySQL database v5.7

## Development

- Open Trivia Database is used for questions.
- Youtube API is used for karaoke.

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## Deployment

- Attempt to use an Amazon EC2 Instance with Ubuntu 20.04.


## Teams, Leaderboard
- Teams are saved to db on game start with team names from user input in Teams component. 
- User MUST be logged in to save teams as each team entry has a foreign key that is the users
    google id. This way, only teams associated with the current user are retrieved on log in
- Teams have stats of wins, losses, draws, and highscore, all default to 0, on creation
- All teams associated with user are retreived on login so that they can be viewed on the leaderboard
    at any time.
- Currently, you must type in a previously used team's name during the game load screen to play
    as that team and have it's stats updated 
- Stats calculated and updated when EndGame component mounts
- All relevant functions for retrieving, posting, updating teams are located in gameContext.js
    their corresponding routes are in server/index.js and funtions that interact with the teams db table
    can be found in server/helpers

## database 
- db connection found in db/mysql.js
- using mysql2/promises and connection pool to allow the use of promises and async/await when 
    interacting with db
- schema found in /userschema.sql
