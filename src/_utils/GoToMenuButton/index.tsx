import "./style.scss";
import { useNavigate } from "react-router-dom";
//@ts-ignore
export default function GoToMenuButton({appName}){
    const navigate = useNavigate()
    return(
        <button className="go-back-button" onClick={()=>{navigate('/')}}>{appName}</button>
    )
}