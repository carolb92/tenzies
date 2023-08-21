export default function Dice(props){

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
    }

    return (
        <div style={styles} className="die-face" onClick={props.holdDice}>
            <h1>{props.value}</h1>
        </div>
    )
}