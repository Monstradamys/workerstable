import React from "react";

export default class WorkerElem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditBox: false
        }
    }
    
    getWorker = (e) => {
        if(e.target.parentNode.className === "main-block__table-list-worker chosen") {
            e.target.parentNode.className = "main-block__table-list-worker";
            this.setState({
                showEditBox: false
            });
            this.props.setOpenEditBox(false);
            return;
        }
            
        if(document.getElementsByClassName("chosen")[0]) 
            document.getElementsByClassName("chosen")[0].className = "main-block__table-list-worker";


        e.target.parentNode.className += " chosen";
        this.props.fillChosenWorker(this.props.workers);
        this.setState({
            showEditBox: true
        })
    }

    render() {
        return ( 
            <div className="main-block__table-list-worker" onClick={this.getWorker}>
                <div>  
                    {this.props.workers.firstName} 
                </div>
                <div>  
                    {this.props.workers.secondName} 
                </div>
                <div>  
                    {this.props.workers.occupation} 
                </div>
            </div>
        )
    }
}