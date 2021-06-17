# Trivioke

Trivia quiz game made with React.

## Table of Contents

1. [Team](#team)
2. [Usage](#Usage)
3. [Requirements](#requirements)
4. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Login / Logout](#login-/-logout)
5.[Deployment](#deployment)
6.[Known Bugs](#known-bugs)

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

## Login / Logout

- Used react-google-login and Oath 2.0 for Login and Logout buttons.
  Set up credentials for the Google+ API in order to attain the Client ID. Used that client ID in conjunction with
  the react-google-login package in order to allow logins. Upon login, Google sends back a profile object containing
  the user's username, full name, profile picture, email, and googleId. Used this information to save new users to
  our DB, or log them back in if already existing.
  react-google-login documentation: https://www.npmjs.com/package/react-google-login

## Deployment

- Attempt to use an Amazon EC2 Instance with Ubuntu 20.04.

## Category Selection
The function getCategories in gameContext will return all available categories to play as from the opentriviadb api.

The categories are then rendered within the filter component as Dropdown Items in a Dropdown Button from react-bootstrap

## True/False Questions
The function boolRequest will send a request to the endpoint in the backend which will make an request to the opentriviaDB API with the parameter type set to boolean.

This endpoint sends the boolean question to the front end.

The boolRequest function will set the current question saved in state to be a true/false question.
## Random Button
The function random in gameContext will make a request to either the multiple choice or boolean endpoint with a random category. 

This sets the current Question to be from a random category in either multiple choice or true false format.

## Team Selector:
- # setTeamDropDown:
setTeamDropdown within components/Teams.jsx sets the amount of teams for a game. 
It is rendered within the Dropdown Button react-bootstrap component and is within the 
Teams.jsx return statement. This function takes in an integer from 2 incrementing to the 
specified number.Clicking a presented number renders that number of dropdown forms for 
the user to input team names and those team names to be stored within state and sent to the
Teams table in trivioke database. The number selected by the user also utilizes the
setTeamNumber function of the teamNumber state to pass the selected integer along to
listTeamForms to render the correct number of forms and keep track of those forms' 
state.
- # listTeamForms:
Maps across the user-specified integer return (n) forms. setTeamNames is used here
to correlate team names with team number and this information is passed back to state
use useEffect with the function setTeams and setCurrTeams. 
If a user does not fill in all of the team names and starts the game. The blank team does 
not appear in the game/state/database thus it is possible to play with only one player if 
desired. However a sweet alert is called if a user presses the enter key without filling out
the entire form preventing them from navigating to further pages without a set state.
# Countdown:
- # CountdownCircleTimer:
the 'react-countdown-circle-timer' dependency is implemented to facilitate the timer component
present on the game. It takes the (timer) set in state from load via gameContext and executes
a timer of that length. When the timer runs out the user is redirected to the /video page holding
the randomized karaoke song.
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

## Database 
- db connection found in db/mysql.js
- using mysql2/promises and connection pool to allow the use of promises and async/await when 
    interacting with db
- schema found in /userschema.sql
- Used an Amazon EC2 Instance with Ubuntu 20.04.
  Used PM2 for process management.
  Tutorial article here: https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-1-d67367ac5171
  Also see part 2 of that article for more steps.

## Known Bugs

1) Open Trivia DB has an API token to limit duplicate questions, but it expires every 6 hours.
2) Buttons in load menu don't maintain styling after selecting a second button.
3) Should not be a 50/50 lifeline option when playing T/F questions.
4) You should not be able to play a game unless you are logged in.
5) On production - team names are not saving to the associated googleId/userId.
