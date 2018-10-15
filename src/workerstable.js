import React from "react"; 
import WorkerElem from "./workerelem"

const WorkersTable = (props) => {

    const setWorker = () => {
        let workerArr = [];
        for(let i = 0; i < props.workers.length; i++) {
            workerArr.push(<WorkerElem 
                            key={i} 
                            workers={props.workers[i]}
                            fillChosenWorker={props.fillChosenWorker}
                            setOpenEditBox={props.setOpenEditBox}/>)
        }
        return workerArr;
    }

    return (
        <div className="main-block__table">
            <div className="main-block__table-menu">
                <div onClick={() => props.setInOrder("firstName")}>First Name</div>
                <div onClick={() => props.setInOrder("secondName")}>Second Name</div>
                <div onClick={() => props.setInOrder("occupation")}>Occupation</div>
            </div>
            <div className="main-block__table-list">
                {setWorker()}
            </div>
        </div>
    )
}

export default WorkersTable;