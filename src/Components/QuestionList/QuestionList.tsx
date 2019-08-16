import * as React from "react";
import { Button, Table } from 'react-bootstrap';

import './QuestionList.css';

interface IProps {
    getQuestionByAuthor: any,
    questionList: any,
    selectDifferentQuestion: any
}

interface IState {
    editQuestion: boolean
}

export default class QuestionList extends React.Component<IProps, IState> {

    public constructor(props: any) {
        super(props)

        this.state = {
            editQuestion: false 
        }

        this.searchByAuthor = this.searchByAuthor.bind(this);
    }

    public render() {
        return (
			<div className="container colour-box">

                <div className="row">
                    <div className="input-group">
                        <input type="text" id="search-author-textbox" className="form-control" placeholder="Search By Author" />
                        <div className="input-group-append">
                            <Button className="btn btn-outline-secondary search-button" onClick={this.searchByAuthor}>Search</Button>
                        </div>
                    </div>  
                </div>

                <div className="row">
                    <Table className="table table-striped" hover={true}>
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </Table>
                </div>

            </div>
        );
    }

	private createTable() {
        const table:any[] = []
        const questionList = this.props.questionList
        if (questionList == null) {
            return table
        }

        for (let i = 0; i < questionList.length; i++) {
            const children = []
            const question = questionList[i]
            children.push(<td key={"id" + i}>{question.className} {question.classNumber}</td>)
            children.push(<td key={"name" + i}>{question.questionText.substr(0, 25)}...</td>)
            table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
        }
        return table
    }

    private selectRow(index: any) {
        const selectedQuestion = this.props.questionList[index]
        if (selectedQuestion != null) {
            this.props.selectDifferentQuestion(selectedQuestion)
        }
    }

    private searchByAuthor() {
        const textBox = document.getElementById("search-author-textbox") as HTMLInputElement
        // if (textBox === null) {
        //     return;
        // }
        const author = textBox.value 
        this.props.getQuestionByAuthor(author)  
    }




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