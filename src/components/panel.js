import style from './components.module.css'

function Panel(props) {
    return (
        <div className={style.panel}style={props.isStarted?{visibility: 'hidden'}:null}>
            <div className={style.addGamer} onClick={()=>{props.addPlayer()}}>
הוסף משתמש
            </div>
            <div className={style.addGamer} onClick={props.testLocalStorage}>
התחבר 
            </div>
            <div className={style.start} onClick={()=>props.start()}>
התחל משחק
            </div>
        </div>
    );
}
export default Panel;