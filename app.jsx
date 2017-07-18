const PLAYERS = [
    {
        name: "Etienne Fichot",
        score: 42,
        id: 1
    },
    {
        name: "Mc Fly",
        score: 23,
        id: 2
    },
    {
        name: "Another men on the game",
        score: 16,
        id: 3
    },
]

function Stats(props) {
    return (
        <table className="stats">
            <tbody>
                <tr>
                    <td>Players:</td>
                    <td>{props.totalPlayers}</td>
                </tr>
                <tr>
                    <td>Total Points:</td>
                    <td>{props.totalScore}</td>
                </tr>
            </tbody>
        </table>
    )
}


Stats.propTypes = {
    totalPlayers: React.PropTypes.number.isRequired,
    totalScore: React.PropTypes.number.isRequired
}

function Header(props) {
    return (
        <div className="header">
            <Stats totalPlayers={props.totalPlayers} totalScore={props.totalScore}/>
            <h1>{props.title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    totalPlayers: React.PropTypes.number.isRequired,
    totalScore: React.PropTypes.number.isRequired
}

function Counter(props) {
    return (
            <div className="counter">
                <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
                <div className="counter-score"> {props.score} </div>
                <button className="counter-action increment" onClick={function() {props.onChange(1);}}> + </button>
            </div>
        );
}

Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
}

function Player(props) {
    return (
        <div className="player"> 
            <div className="player-name">
                {props.name}
            </div>
            <div className="player-score">
                <Counter score={props.score} onChange={props.onChange} />
            </div>
        </div>
    );
}

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired    
}

const Application = React.createClass({
   propTypes: {
        title: React.PropTypes.string,
        players: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            score: React.PropTypes.number.isRequired,
            id: React.PropTypes.number.isRequired
        })).isRequired
   },

   getDefaultProps: function() {
       return ({
         title: "Scoreboard",
       });
   },

   getInitialState: function() {
        return {
           players: this.props.initialPlayers
       }
   },

   onChange: function(delta, i) {
        this.state.players[i].score = (delta === 1) ? this.state.players[i].score + 1 : this.state.players[i].score - 1;
        this.setState(this.state);
   },

   totalScore: function() {
       let totalScore = 0;
       this.state.players.map(function(player, i) {
        totalScore += player.score;
       }.bind(this))
       return totalScore;
   },

    render: function() {
        return (
        <div className="scoreboard">
            <Header title={this.props.title} totalPlayers={this.state.players.length} totalScore={this.totalScore()} />
            <div className="players">
                 {this.state.players.map(function(player, i) {
                    return <Player name={player.name} score={player.score} key={player.id} onChange={function(delta) {this.onChange(delta, i)}.bind(this)} />
                }.bind(this))}
            </div>
        </div>
    );
    }
});

ReactDOM.render(<Application initialPlayers={PLAYERS} />, document.getElementById('container'));