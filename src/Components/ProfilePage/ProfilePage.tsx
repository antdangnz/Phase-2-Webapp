import * as React from "react";
import { Button, Modal } from 'react-bootstrap';
import QuestionDetail from '../QuestionDetail/QuestionDetail';
import QuestionList from '../QuestionList/QuestionList';
import './ProfilePage.css';

// import * as signalR from '@aspnet/signalr';

interface IState {
    addQuestion: boolean,
    // hubConnection: any,
    questionList: any,
    selectedQuestion: any,
    userData: any,
    userLoggedIn: boolean,
    userName: any
}

export default class ProfilePage extends React.Component<{}, IState> {
    // private gifApiKey = "qRYlm13or0qBXPsCkk6RsCmFTEQMreT7";
	// private signalR = require("@aspnet/signalr");

    public constructor(props: any) {
        super(props)

        this.state = {
            addQuestion: false,
            // hubConnection: new this.signalR.HubConnectionBuilder().withUrl("https://questioncollection.azurewebsites.net/hub").build(),
            questionList: [] ,
            selectedQuestion: {},
            userData: "Never should've come here",
            userLoggedIn: false,
            userName: "Whiterun Guard"
        }
        this.selectQuestion = this.selectQuestion.bind(this)
        this.getQuestionsByAuthor = this.getQuestionsByAuthor.bind(this)
        this.postNewQuestion = this.postNewQuestion.bind(this)
    }

    public componentWillMount() {
        if (localStorage.getItem('userLoggedIn') !== null && localStorage.getItem('userLoggedIn') === 'true' ) {
            this.setState({
                userLoggedIn: true,
                userData: localStorage.getItem('userData'),
                userName: localStorage.getItem('userName')
            })
        } else {
            this.setState({
                userLoggedIn: false,
                userData: "Never should've come here",
                userName: "Whiterun Guard"
            })
        }

        // this.requestRandomGif();
        // this.requestQuoteOfTheDay();
        this.requestQuestions();
    }

    // public componentDidMount = async () => {
    //     await this.state.hubConnection.on("Connected", ()  => {
            
	// 	//   // tslint:disable:no-console
    //     //   console.log('A new user has connected to the hub.');
    //     });

    //     this.state.hubConnection.on("UpdateQuestionList", ()  => {
    //         // this.state.updateQuestionList();
            
	// 	//   // tslint:disable:no-console
    //     //     console.log('A new question has been added!');
    //     });
    
    //     this.state.hubConnection.start().then(() => this.state.hubConnection.invoke("BroadcastMessage"));
    // }

    public render() {
        return (
            <div className="centreText background-img">
                {/* <div className="wrapper">
                    <div className="display-box-profile"> */}
                        <div>
                            <h1 className="h1-profile">Welcome, {this.state.userName}</h1>
                        </div>
                        {/* <div>
                            <p className="user-data-profile">{this.state.userData}</p>
                        </div> */}
                        <Button bsStyle="success" onClick={this.onOpenModal}>Add Your Own Question</Button>
                        <br/><br/>
                        <div className="container">
                            <div className="row">
                                <div className="col-7">
                                    <h3>Detailed Question Data</h3>
                                    <QuestionDetail questionData={this.state.selectedQuestion} />
                                </div>
                                <div className="col-5">
                                    <h3>List of Questions</h3>
                                    <QuestionList getQuestionByAuthor={this.getQuestionsByAuthor} questionList={this.state.questionList} selectDifferentQuestion={this.selectQuestion} />
                                </div>
                            </div>
                        </div>
                    {/* </div>
                </div> */}
                <Modal show={this.state.addQuestion} onHide={this.onCloseModal}>
                    <form>
                        <div className="form-group">
                            <label>Class Name</label>
                            <input type="text" className="form-control" id="add-classname-input" placeholder="Enter Question Type"/>
                            <small className="form-text text-muted">You can always edit questions at a later time</small>
                        </div>
                        <div className="form-group">
                            <label>Class Number</label>
                            <input type="text" className="form-control" id="add-classnumber-input" placeholder="Enter Question Details Here"/>
                            <small className="form-text text-muted">Edit the bulk of the question here</small>
                        </div>
                        <div className="form-group">
                            <label>Institution</label>
                            <input type="text" className="form-control" id="add-institution-input" placeholder="Enter The Answer Here"/>
                            <small className="form-text text-muted">Edit the answer here</small>
                        </div>
                        <div className="form-group">
                            <label>Question Type</label>
                            <input type="text" className="form-control" id="add-type-input" placeholder="Enter Question Type"/>
                            <small className="form-text text-muted">You can always edit questions at a later time</small>
                        </div>
                        <div className="form-group">
                            <label>Question Text</label>
                            <input type="text" className="form-control" id="add-text-input" placeholder="Enter Question Details Here"/>
                            <small className="form-text text-muted">Edit the bulk of the question here</small>
                        </div>
                        <div className="form-group">
                            <label>Answer</label>
                            <input type="text" className="form-control" id="add-answer-input" placeholder="Enter The Answer Here"/>
                            <small className="form-text text-muted">Edit the answer here</small>
                        </div>

                        <Button type="button" className="btn" onClick={this.postNewQuestion}>Upload</Button>
                    </form>
                </Modal>
            </div>
        );
    }

    private onOpenModal = () => { this.setState({ addQuestion: true }); };
	
	// Modal close
	private onCloseModal = () => { this.setState({ addQuestion: false }); };
    
    private selectQuestion(newQuestion: any) {
		this.setState({ selectedQuestion: newQuestion });
    }

    private requestQuestions() {
        const apiEndpoint = "https://questioncollection.azurewebsites.net/api/Questions";

        fetch(apiEndpoint, {
            method: "GET"
        }).then(response => {
            // // tslint:disable:no-console
            // console.log(response);
            // // tslint:disable:no-console
            // console.log("fsfafas");
            if (response.ok) {
                response.json().then(data => {
                    // // tslint:disable:no-console
                    // console.log('A new question has been added!');
                    // // tslint:disable:no-console
                    // console.log(data);
                    this.setState({questionList: data})
                    
                    // this.setState({randomGifLink: data.data.image_original_url})
                })
            }
        })
    }
    
    private getQuestionsByAuthor(author: string) {
        let apiEndpoint = "https://questioncollection.azurewebsites.net/api/Questions/author/" + author;

        if (author.length === 0) {
            apiEndpoint = "https://questioncollection.azurewebsites.net/api/Questions/"
        }
        

        fetch(apiEndpoint, {
            method: "GET"
        }).then(response => {
            // // tslint:disable:no-console
            // console.log(response);
            // // tslint:disable:no-console
            // console.log("fsfafas");
            if (response.ok) {
                response.json().then(data => {
                    // // tslint:disable:no-console
                    // console.log('A new question has been added!');
                    // // tslint:disable:no-console
                    // console.log(data);
                    const newQuestionList = data[0];

                    if (newQuestionList !== undefined) {
                        this.setState({ selectedQuestion: newQuestionList, questionList : data})
                    }

                    
                    // this.setState({randomGifLink: data.data.image_original_url})
                })
            }
        })
    }

    private postNewQuestion() {
		const questionTypeInput = document.getElementById("add-type-input") as HTMLInputElement
        const questionTextInput = document.getElementById("add-text-input") as HTMLInputElement
        const classNameInput = document.getElementById("add-classname-input") as HTMLInputElement
        const classNumberInput = document.getElementById("add-classnumber-input") as HTMLInputElement
        const institutionInput = document.getElementById("add-institution-input") as HTMLInputElement
		const answerInput = document.getElementById("add-answer-input") as HTMLInputElement

        if (questionTypeInput === null || questionTextInput === null || classNameInput === null || 
            classNumberInput === null || institutionInput === null || answerInput === null) {
			return;
		}

		const questionType = questionTypeInput.value
        const questionText = questionTextInput.value
        const className = classNameInput.value
        const classNumber = classNumberInput.value
        const institution = institutionInput.value
        const answer = answerInput.value
        
		const url = "https://questioncollection.azurewebsites.net/api/Questions"

		fetch(url, {
			body: JSON.stringify({
                "className": className,
                "classNumber": classNumber,
                "author": this.state.userName,
                "institution": institution,
                "questionType": questionType,
                "questionText": questionText,
                "answer": answer,
                "dateCreated": new Date().toJSON()
            }),
			headers: {'cache-control': 'no-cache', 'Content-Type': 'application/json'},
			method: 'POST'
		})
        .then((response : any) => {
			if (!response.ok) {
				alert(response.statusText)
			} else {
				location.reload()
			}
		  })
	}
}