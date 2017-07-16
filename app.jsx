function Header(props) {
    return (
        <div className="header">
            <h1>{props.title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired
}

function Counter(props) {
    return (
        <div className="counter">
            <button className="counter-action decrement"> - </button>
            <div className="counter-score"> {props.score} </div>
            <button className="counter-action increment"> + </button>
        </div>
    );
}

function Player(props) {
    return (
        <div className="player"> 
            <div className="player-name">
                {props.name}
            </div>
            <div className="player-score">
                <Counter score={props.score} />
            </div>
        </div>
    );
}

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired
}

function Application(props) {
    return (
        <div className="scoreboard">
            <Header title={props.title}/>
            <div className="players">
                <Player name="Etienne Fichot" score={42} />
                <Player name="Mc fly" score={31} />
                <Player name="Another Guy on the Game" score={17} />                
            </div>
        </div>
    );
}

Application.propTypes = {
    title: React.PropTypes.string
}

Application.defaultProps = {
    title: "Scoreboard"
}

ReactDOM.render(<Application/>, document.getElementById('container'));