import React from "react";

export default class EditBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditFormOpen: false
        }
        this.nameRegEx = /^[a-zA-Z]{3,16}$/;
        this.occupationRegEx = /^[a-zA-Z]{3,16}$/;
    }
    setIsEditFormOpen = () => {
        this.setState({
            isEditFormOpen: !this.state.isEditFormOpen,            
            firstName: this.props.chosenWorker.firstName,
            secondName: this.props.chosenWorker.secondName,
            occupation: this.props.chosenWorker.occupation,
        });
    }

    validateInfoFromForm = () => {
        const {firstName, secondName, occupation, id} = this.state;
        if(firstName.match(this.nameRegEx) === null) 
            document.getElementsByName("firstName")[0].className = "wrong";
        if(secondName.match(this.nameRegEx) === null)
            document.getElementsByName("secondName")[0].className = "wrong";
        if(occupation.match(this.occupationRegEx) === null)  
            document.getElementsByName("occupation")[0].className = "wrong";
        if(document.getElementsByClassName("wrong")[0] === undefined) {
            this.props.updateWorkerInfo({"firstName": firstName, "secondName": secondName, "occupation":occupation});
            this.setIsEditFormOpen();
        }   
    }

    handleChange = (e) => {
        if(document.getElementsByClassName("wrong")[0] !== undefined) {
            if(e.target.name === "firstName" || e.target.name === "secondName") {
                if(e.target.value.match(this.nameRegEx))
                    document.getElementsByName(e.target.name)[0].className = "";
            }
            else if(e.target.name === "occupation") {
                if(e.target.value.match(this.occupationRegEx))
                    document.getElementsByName(e.target.name)[0].className = "";
            }
        }
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    removeWorker = () => {
        this.props.removeWorker(this.props.chosenWorker)
    }
    
    chooseWhatToReturn = () => {
        if(this.state.isEditFormOpen) {
            return (
                <div className="edit-block__form">
                    <form> 
                        <input type="text" name="firstName" 
                            defaultValue={this.props.chosenWorker.firstName}
                            onChange={this.handleChange}/>
                        <input type="text" name="secondName" 
                            defaultValue={this.props.chosenWorker.secondName}
                            onChange={this.handleChange}/>
                        <input type="text" name="occupation" 
                            defaultValue={this.props.chosenWorker.occupation}
                            onChange={this.handleChange}/>
                    </form>
                    <button onClick={this.setIsEditFormOpen} className="edit-block__form-button-back">Back</button>
                    <button onClick={this.validateInfoFromForm}>Submit</button>
                </div>
            )
        } else {
            return <div className="edit-block-button-edit" onClick ={this.setIsEditFormOpen}>Edit</div>
        }
    }


    render() {
        return this.props.openEditBox ? (
            <div className="edit-block">
                <div className="edit-block-button-remove" onClick={this.removeWorker}>
                    Remove
                </div>
                <div className="edit-block-button-edit">
                    {this.chooseWhatToReturn()}
                </div>
                
            </div>
        ) : null
    }
}