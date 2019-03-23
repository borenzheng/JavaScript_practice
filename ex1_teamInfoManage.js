const team = {
_players:[
    {
        firstName: 'Pablo',
        lastName: 'Sanchez',
        age: 11
      },
      {
        firstName: 'Petter',
        lastName: 'Wang',
        age: 13
      },
      {
        firstName: 'Lisa',
        lastName: 'Du',
        age: 15
      } 
],
_games:[
    {
        opponent: 'Alice',
        teamPoints: 42,
        opponentPoints: 27
      },
      {
        opponent: 'Yue',
        teamPoints: 32,
        opponentPoints: 21
      },
      {
        opponent: 'Brenna',
        teamPoints: 49,
        opponentPoints: 37
      }
],
get players(){
    return this._players;
},
get games(){
    return this._games;
},
addPlayer(fn, ln, age){
    let player={
        firstName: fn,
        lastName: ln,
        age: age
    };
    this.players.push(player)

},
addGame(oppname, mypoints,oppopoints){
    let game = {
        opponent: oppname,
        teamPoints: mypoints,
        opponentPoints: oppopoints
    }
    this.games.push(game);
}

};
team.addPlayer('Linda','Chen',23);
team.addGame('URI', 29, 39);
console.log(team.players);
console.log(team.games);