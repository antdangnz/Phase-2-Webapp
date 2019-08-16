import * as React from "react";
import { Button, Modal, Table } from 'react-bootstrap';

import './QuestionDetail.css';

interface IProps {
    questionData: any
}

interface IState {
    editQuestion: boolean
}

export default class QuestionDetail extends React.Component<IProps, IState> {

    public constructor(props: any) {
        super(props)

        this.state = {
            editQuestion: false 
        }

        this.updateQuestion = this.updateQuestion.bind(this);
    }

    // public componentWillMount() {
    //     this.requestQuestions();
    // }

    // public componentDidMount = async () => {}

    public render() {
        return (
            <div className="centreText colour-box">
                {/* <div className="wrapper">
                    <div className="display-box">
                        
                    </div>
                </div> */}



                <div className="container">
                {/* <div className="row">
                    <b>{this.props.questionData.className} {this.props.questionData.classNumber}</b>&nbsp;
                </div>
                <div className="row">
                    <b>Question Type: </b>{this.props.questionData.questionType} &nbsp;
                    
                </div>
                <div className="row">
                    <b>{this.props.questionData.questionText}</b>&nbsp;
                </div>
                <div className="row">
                    <b>{this.props.questionData.answer}</b>&nbsp;
                </div> */}
                

                <Table striped={true} bordered={true} condensed={true} hover={true}>
                    <thead>
                        <tr>
                        <th />
                        <th>Question Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Class:</td>
                            <td>{this.props.questionData.className} {this.props.questionData.classNumber}</td>
                        </tr>

                        <tr>
                            <td>Institution:</td>
                            <td>{this.props.questionData.institution}</td>
                        </tr>

                        <tr>
                            <td>Author:</td>
                            <td>{this.props.questionData.author}</td>
                        </tr>

                        <tr>
                            <td>Question Type:</td>
                            <td>{this.props.questionData.questionType}</td>
                        </tr>

                        <tr>
                            <td>Question Details:</td>
                            <td>{this.props.questionData.questionText}</td>
                        </tr>

                        <tr>
                            <td>Answer:</td>
                            <td>{this.props.questionData.answer}</td>
                        </tr>
                    </tbody>
                </Table>
                <div className="row">
                    Date Created: {this.props.questionData.dateCreated}
                </div>
                
                <div className="row button-padding">
                    <Button bsStyle="success" className="btn" onClick={this.onOpenModal}>Edit </Button>
                    <Button bsStyle="success" className="btn" onClick={this.deleteQuestion.bind(this, this.props.questionData.questionId)}>Delete </Button>
                    
                </div>
                <Modal show={this.state.editQuestion} onHide={this.onCloseModal}>
                    <form>
                        <div className="form-group">
                            <label>Question Type</label>
                            <input type="text" className="form-control" id="edit-type-input" placeholder="Enter Question Type"/>
                            <small className="form-text text-muted">You can always edit questions at a later time</small>
                        </div>
                        <div className="form-group">
                            <label>Question Text</label>
                            <input type="text" className="form-control" id="edit-text-input" placeholder="Enter Question Details Here"/>
                            <small className="form-text text-muted">Edit the bulk of the question here</small>
                        </div>
                        <div className="form-group">
                            <label>Answer</label>
                            <input type="text" className="form-control" id="edit-answer-input" placeholder="Enter The Answer Here"/>
                            <small className="form-text text-muted">Edit the answer here</small>
                        </div>
                        <button type="button" className="btn" onClick={this.updateQuestion}>Save</button>
                    </form>
                </Modal>
            </div>

            <div className="fb-comments" data-href="https://questionapp.azurewebsites.net/dashboard" data-width="" data-numposts="5"/>

            </div>
        );
    }

    // PUT Question
    private updateQuestion(){
        const questionTypeInput = document.getElementById("edit-type-input") as HTMLInputElement
        const questionTextInput = document.getElementById("edit-text-input") as HTMLInputElement
        const answerInput = document.getElementById("edit-answer-input") as HTMLInputElement

        if (questionTypeInput === null || questionTextInput === null) {
			return;
		}

        const currentQuestion = this.props.questionData;

        const url = "https://questioncollection.azurewebsites.net/api/Questions/" + currentQuestion.questionId

        const updatedQuestionText = questionTextInput.value
        const updatedQuestionType = questionTypeInput.value
        const updatedAnswer = answerInput.value

		fetch(url, {
			body: JSON.stringify({
                "questionId": currentQuestion.questionId,
                "className": currentQuestion.className,
                "classNumber": currentQuestion.classNumber,
                "author": currentQuestion.author,
                "institution": currentQuestion.institution,
                "questionType": updatedQuestionType,
                "questionText": updatedQuestionText,
                "answer": updatedAnswer
            }),
			headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
			method: 'PUT'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error Response
				alert(response.statusText + " " + url)
			} else {
				location.reload()
			}
		  })
    }

    // Delete Question
    private deleteQuestion(id: any) {
        const url = "https://questioncollection.azurewebsites.net/api/Questions/" + id

        fetch(url, {
            method: 'DELETE'
        })
        .then((response : any) => {
            if (!response.ok) {
                alert(response.statusText)
            } else {
                location.reload()
            }
        })
    }

    private onOpenModal = () => {
        this.setState({ editQuestion: true });
    };
    
    private onCloseModal = () => {
		this.setState({ editQuestion: false });
    };


    // private requestQuestions() {
    //     const apiEndpoint = "https://questioncollection.azurewebsites.net/api/Questions";

    //     fetch(apiEndpoint, {
    //         method: "GET"
    //     }).then(response => {
    //         // // tslint:disable:no-console
    //         // console.log(response);
    //         // // tslint:disable:no-console
    //         // console.log("fsfafas");
    //         if (response.ok) {
    //             response.json().then(data => {
    //                 // // tslint:disable:no-console
    //                 // console.log('A new question has been added!');
    //                 // // tslint:disable:no-console
    //                 // console.log(data);
                    
    //                 // this.setState({randomGifLink: data.data.image_original_url})
    //             })
    //         }
    //     })
    // }
}