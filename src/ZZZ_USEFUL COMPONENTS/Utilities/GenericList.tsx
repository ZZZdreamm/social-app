import { ReactElement } from "react";
import Waiting from "./Waiting/indexxx";

export default function GenericList(props:genericListProps){
    if(!props?.list){
        return <Waiting message="Loading"/>
    }else if(props.list.length === 0){
        if (props.emptyListUI) {
            return props.emptyListUI;
        }
        return <>There are no elements to display</>
    }
    else{
        return props.children;
    }

}
interface genericListProps{
    list:any;
    loadingUI?:ReactElement;
    emptyListUI?:ReactElement;
    children:ReactElement;
}