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

const Stopwatch = React.createClass({
    getInitialState: function() {
        return {
            time: 0
        }
    },

    start: function() {
        document.querySelector('#pause').classList.add('visible');
        document.querySelector('#start').classList.remove('visible');
        window.timer = setInterval(function() {
            this.state.time += 1;
            this.setState(this.state);
        }.bind(this), 1000);
    },

    stopIt: function () {
        document.querySelector('#start').classList.add('visible');        
        document.querySelector('#pause').classList.remove('visible');        
        clearInterval(window.timer);
    },

    resetIt: function() {
        clearInterval(window.timer);        
        this.state.time = 0;
        this.setState(this.state);
    },

    render: function() {
        return (
            <div className="stopwatch">
                <h2>Stopwatch</h2>
                <div className="stopwatch-time">{this.state.time}</div>
                <button onClick={function() {this.start()}.bind(this)} id='start' className='stopwatch-button visible' >Start</button>
                <button onClick={function() {this.stopIt()}.bind(this)} id='pause' className='stopwatch-button'>Pause</button>                
                <button onClick={function() {this.resetIt()}.bind(this)} id='reset' className='stopwatch-button visible'>Reset</button>
            </div>
        )
    }
})

const AddPlayer = React.createClass({
    propTypes: {
        add: React.PropTypes.func.isRequired,
    },

    onSubmit: function(e) {
        e.preventDefault();
        this.props.add(document.getElementById('player').value);
    },

    render: function () {
        return (
            <div className="add-player-form">
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="player" id='player'/>
                    <input type="submit" value="Add Player"/>
                </form>
            </div>
        )
    }
})

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
            <Stats totalPlayers={props.totalPlayers} totalScore={props.totalScore} />
            <h1>{props.title}</h1>
            <Stopwatch />        
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
            <button className="counter-action decrement" onClick={function () { props.onChange(-1); }}> - </button>
            <div className="counter-score"> {props.score} </div>
            <button className="counter-action increment" onClick={function () { props.onChange(1); }}> + </button>
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

    getDefaultProps: function () {
        return ({
            title: "Scoreboard",
        });
    },

    getInitialState: function () {
        return {
            players: this.props.initialPlayers
        }
    },

    onChange: function (delta, i) {
        this.state.players[i].score = (delta === 1) ? this.state.players[i].score + 1 : this.state.players[i].score - 1;
        this.setState(this.state);
    },

    totalScore: function () {
        let totalScore = 0;
        this.state.players.map(function (player, i) {
            totalScore += player.score;
        }.bind(this))
        return totalScore;
    },

    add: function(player) {
        let newPlayer = {
            name: player,
            score: 0,
            id: this.state.players.length + 1
        }
        console.log(newPlayer);
        this.state.players.push(newPlayer);
        this.setState(this.state);
    },

    render: function () {
        return (
            <div className="scoreboard">
                <Header title={this.props.title} totalPlayers={this.state.players.length} totalScore={this.totalScore()} />
                <div className="players">
                    {this.state.players.map(function (player, i) {
                        return <Player name={player.name} score={player.score} key={player.id} onChange={function (delta) { this.onChange(delta, i) }.bind(this)} />
                    }.bind(this))}
                </div>
                <AddPlayer add={function(player) {this.add(player)}.bind(this)}/>
            </div>
        );
    }
});

ReactDOM.render(<Application initialPlayers={PLAYERS} />, document.getElementById('container'));