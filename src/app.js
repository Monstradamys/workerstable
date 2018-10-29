import React from "react";
import EditBox from "./editbox";
import AddWorker from "./addworker";
import WorkersTable from "./workerstable";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: [],
            chosenWorker: [],
            openEditBox: false,
            workersInOrder: false
        }
    }

    componentWillMount() {
        this.setState({
            workers: localStorage.workers ? JSON.parse(localStorage.workers) : []
        })
    }


    generateWorkerId = () => {
        const id = `f${(Math.floor(Math.random()*1e8)).toString(16)}`;
        this.state.workers.map(worker => {
            if(worker.id === id) 
                this.generateWorkerId();
        })
        return id;
    }

    fillWorkersArr = (firstName, secondName, occupation) => {
        let id = this.generateWorkerId();
        this.state.workers.push({"firstName" : firstName, "secondName" : secondName, "occupation" : occupation, "id": id});
        this.forceUpdate();
        this.setLocalStorage();
    }

    setLocalStorage() {
        localStorage.setItem("workers", JSON.stringify(this.state.workers));
    }

    fillChosenWorker = (data) => {
        this.setState({
            chosenWorker: data,
        });
        this.setOpenEditBox(true);
    }

    setOpenEditBox = (value) => {
        this.setState({
            openEditBox: value
        })
    }

    updateWorkerInfo = (data) => {
        this.state.workers.map(worker => {
            if(worker.id === this.state.chosenWorker.id) {
                worker.firstName = data.firstName;
                worker.secondName = data.secondName;
                worker.occupation = data.occupation;
                this.forceUpdate()
                this.setLocalStorage();
            }
        });
    }

    removeWorker = (data) => {
        this.cleanChosen();
        for(let i = 0; i < this.state.workers.length; i++) {
            if(this.state.workers[i].id === data.id) {
                let newArr = this.state.workers.slice(0, i);
                newArr = newArr.concat(this.state.workers.slice(i+1,));

                this.state.workers = newArr;
                this.setOpenEditBox(false);
                this.forceUpdate();
                this.setLocalStorage();
            }
        }
    }

    cleanChosen() {
        if(document.getElementsByClassName("chosen")[0] !== undefined) {
            document.getElementsByClassName("chosen")[0].className = "main-block__table-list-worker";
            this.setOpenEditBox(false);
        }
    }

    setInOrder = (value) => {
        this.cleanChosen();

        if(this.state.workersInOrder) {
            const workersArr = [];
            for(let i = 0; i < this.state.workers.length; i++) {
                workersArr.unshift(this.state.workers[i]);
            }
            this.setState({
                workers: workersArr,
                workersInOrder: false
            });
        } else {
            const workers = this.state.workers;
            for(let i = 0; i < workers.length; i++) {
                for(let j = 0; j < workers.length; j++) {
                    if(workers[i][value][0].toUpperCase().charCodeAt() < workers[j][value][0].toUpperCase().charCodeAt() && i !== j) {
                        let temp = workers[i];
                        workers[i] = workers[j];
                        workers[j] = temp;
                    }
                    else if(workers[i][value][0].toUpperCase().charCodeAt() === workers[j][value][0].toUpperCase().charCodeAt() && i !== j) {
                        for(let n = 1; n < Math.min(workers[i][value].length, workers[j][value].length) ; n++) {
                            if(workers[i][value][n].charCodeAt() < workers[j][value][n].charCodeAt()) {
                                let temp = workers[i];
                                workers[i] = workers[j];
                                workers[j] = temp;
                                break;
                            } 
                            else if (workers[i][value][n].charCodeAt() > workers[j][value][n].charCodeAt())
                                break;
                        }
                    } 
                }
            }
            this.setState({
                workers: workers,
                workersInOrder: true,
            });
        }


    }


    render() {
        return (
            <div className="main-block">
                <p className="main-block__header">Our fabulous workers</p>
                <AddWorker fillWorkersArr={this.fillWorkersArr}/>
                <EditBox openEditBox={this.state.openEditBox}
                    updateWorkerInfo={this.updateWorkerInfo}
                    chosenWorker={this.state.chosenWorker}
                    removeWorker={this.removeWorker}/>
                <WorkersTable 
                    workers={this.state.workers}
                    fillChosenWorker={this.fillChosenWorker}
                    setOpenEditBox={this.setOpenEditBox}
                    workers={this.state.workers}
                    setInOrder={this.setInOrder}/>
            </div>
        )
    }
}