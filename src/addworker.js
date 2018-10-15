import React from "react";

export default class AddWorker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpened: false,
            firstName: "",
            secondName: "",
            occupation: "",
        }
        this.nameRegEx = /^[a-zA-Z]{3,16}$/;
        this.occupationRegEx = /^[a-zA-Z]{3,16}$/;
    }


    validateInfoFromForm = () => {
        const {firstName, secondName, occupation} = this.state;
        if(firstName.match(this.nameRegEx) === null) 
            document.getElementsByName("firstName")[0].className = "wrong";
        if(secondName.match(this.nameRegEx) === null)
            document.getElementsByName("secondName")[0].className = "wrong";
        if(occupation.match(this.occupationRegEx) === null)  
            document.getElementsByName("occupation")[0].className = "wrong";
        if(document.getElementsByClassName("wrong")[0] === undefined) {
            this.props.fillWorkersArr(firstName, secondName, occupation);
            this.setIsFormOpened();
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


    setIsFormOpened = () =>{
        this.setState({
            isFormOpened: !this.state.isFormOpened
        });
    }


    chooseWhatToReturn() {
        return this.state.isFormOpened ? (
            <div className="main-block__form">
                <p>Add New Worker!</p>
                <form>
                    <input type="text" name="firstName" placeholder="First Name"
                        onChange={this.handleChange}/>
                    <input type="text" name="secondName" placeholder="Second Name"
                        onChange={this.handleChange}/>
                    <input type="text" name="occupation" placeholder="Occupation"
                        onChange={this.handleChange}/>
                </form>
                <button onClick={this.setIsFormOpened} className="form__button-back">Back</button>
                <button className="form__button-submit" onClick={this.validateInfoFromForm}>Submit</button>
            </div>
        ) : (
            <div onClick={this.setIsFormOpened} className="main-block__button-open">Add worker!</div>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.chooseWhatToReturn()}
            </React.Fragment>
        )
    }
}
