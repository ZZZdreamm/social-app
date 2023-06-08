
export default function Timer({time, bonusStyling}:TimerProps){
    return(
        <div className="timer" style={bonusStyling}>
           <span style={{fontSize:'2.5em'}}>{time}</span>
        </div>
    )
}

interface TimerProps{
    time:number;
    bonusStyling:any;
}