import * as React from 'react';
import { Alert, Button, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap'
import BrowserWebcam from './../BrowserWebcam/BrowserWebcam';
import FormField from './../FormField/FormField'

import './RegisterPage.css'

interface IState {
    alertOpen: boolean,
    hasPhotoBeenTaken: boolean,
    imageData: any,
    isCameraOpen: boolean,
    isLoading: boolean,
    isModalOpen: boolean
    name: string,
    userData: string,
    validationState: any
}

export default class RegisterPage extends React.Component<{}, IState> {
    private alertMessage: string = "You have committed crimes against Skyrim and her people. What say you in your defense?"
    private errorOccured: boolean = false;

    private globalApiKey: string = 'af15847e523645f2bf47ad0abb90c428';

    public constructor(props: any) {
        super(props)

        this.updateName = this.updateName.bind(this)
        this.updateUserData = this.updateUserData.bind(this)
        this.updateImageData = this.updateImageData.bind(this)
        this.registerPerson = this.registerPerson.bind(this)
        this.openCamera = this.openCamera.bind(this)

        this.handleClick = this.handleClick.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)

        this.state = {
            alertOpen: false,
            hasPhotoBeenTaken: false,
            imageData: null,
            isCameraOpen: false,
            isLoading: false,
            isModalOpen: false,
            name: '',
            userData: '',
            validationState: null
        }
    }

    // Poorly designed atm but ALL GOOD MY GUY
    public updateName(inputString: string) {
        if (this.state.validationState === 'error') {
            this.setState({validationState: null})
        }

        if (inputString.length < 100) {
            this.setState({
                name: inputString
            })
        }
    }

    public updateUserData(event: any) {
        if (event.target.value.length < 300) {
            this.setState({
                userData: event.target.value
            })
        }
    }

    public updateImageData(image: any) {
        this.setState({
            hasPhotoBeenTaken: image !== -1,
            imageData: image
        })

    }

    public openCamera() {
        this.setState({isCameraOpen: !this.state.isCameraOpen})
    }

    public handleClick() {
        if (this.state.isLoading) {
            return;
        } else {
            this.setState({ alertOpen : false, isLoading: true });
            this.errorOccured = false;

            setTimeout(() => {
              this.setState({ isLoading: false, isModalOpen: !this.errorOccured}); // rewrite to accomodate errors
            }, 5000);
        }
    }

    public render() {
        return (
            <div className="centreText background-img">
                <br/>
                {
                    this.state.alertOpen ?
                    <Alert bsStyle="warning">
                        {this.alertMessage}
                    </Alert>
                    : null
                }
                <div className="wrapper">
                    <div className="display-box">
                    <div className="centreText">
                    <h2><b className="custom-h2">Hi!</b> Please fill out the form and take your picture to register.</h2>
                    <p>For simplicity, only your name and photo is required. Everything else is optional</p>
                </div>

                <div>
                    <form className="register-form" onSubmit={this.registerPerson}>
                        <FormField
                            id="formControlsText"
                            type="text"
                            label="Name"
                            placeholder="Enter Name"
                            updateField={this.updateName}
                            validationState={this.state.validationState}
                        />
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Quick Description (Optional)</ControlLabel>
                            <FormControl 
                            componentClass="textarea" 
                            placeholder="Write something about yourself" 
                            onChange={this.updateUserData}
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Take A Selfie</ControlLabel>
                            <br/>
                            <Button bsStyle="info" onClick={this.openCamera}>Click here to toggle the camera</Button>
                        </FormGroup>

                        {this.state.isCameraOpen === true ? 
                        <BrowserWebcam 
                            windowWidth={450}
                            windowHeight={450}
                            retrieveImage={this.updateImageData}
                        /> : <br />}
                        <br/>
                        <Button bsStyle="primary" bsSize="large" type="submit" disabled={!this.state.hasPhotoBeenTaken || this.state.isLoading} onClick={this.handleClick} >Submit</Button>
                        
                    </form>
                </div>
                    </div>
                </div>

                <Modal show={this.state.isModalOpen} onHide={this.handleModalClose}>
                        <Modal.Header>
                            <Modal.Title>Registration Complete</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            You can now attempt to log in. Close this message and switch over to the 
                            Log In page to log in.
                        </Modal.Body>

                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.handleModalClose}>Close</Button>
                        </Modal.Footer>
                </Modal>
            </div>
            
        );
    }

    private handleModalClose() {
        this.setState({isModalOpen: false})

    }

    private async registerPerson(event: any) {
        event.preventDefault() // Needed to stop the page from refreshing.

        const apiKey = this.globalApiKey; // Removed

        await this.handlePersonGroupCreate(apiKey)

        let requestBody: any

        if (this.state.name.length > 0) {
            requestBody = {
                'name': this.state.name,
                'userData': this.state.userData
            }

            // Handle creating a person
            const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/persongroups/adfacialpg/persons';
            await fetch(apiEndpoint, {
                body: JSON.stringify(requestBody),
                headers: { 
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': apiKey
                },
                method: 'POST'
            }).then(response => {
                response.json().then(async data => {
                    await this.handleAddPersonsFace(apiKey, data.personId)
                });
            })

        } else {
            this.errorOccured = true;
            this.alertMessage = "Error. The name field is required."
            this.setState({alertOpen: true, validationState: 'error'})
        }

        

    }

    private async handlePersonGroupCreate(apiKey: string) {
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/persongroups/adfacialpg';

        const requestBody: any = {
            'name': 'anthonyFacePersonGroup'
        }

        await fetch(apiEndpoint, {
            body: JSON.stringify(requestBody),
            headers: { 
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': apiKey
            },
            method: 'PUT'
        }).then(response => {
            if (response.ok) {
                /* PG was created successfully */
            } else if (response.status === 409) {
                /* PG is already made. This is okay and we will let the program continue */
            } else if (response.status >= 400 && response.status <= 499) {
                this.errorOccured = true;

                this.alertMessage = "Something's gone wrong creating a PersonGroup..."
                this.setState({alertOpen: true})
            }
        })
    }

    private async handleAddPersonsFace(apiKey: string, personId: string) {
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/persongroups/adfacialpg/persons/' + personId + '/persistedFaces?detectionModel=detection_01';

        await fetch(apiEndpoint, {
            body: this.state.imageData,
            headers: { 
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': apiKey
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(async data => {
                    await this.handleTrainingPersonGroup(apiKey)
                });
            } else if (response.status === 400) {
                this.errorOccured = true;
                this.alertMessage = "Sorry, we can't find a face in the photo you took. Please try again."
                this.setState({alertOpen: true})
            }

        })
    }

    private async handleTrainingPersonGroup(apiKey: string) {
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/persongroups/adfacialpg/train';

        await fetch(apiEndpoint, {
            headers: { 
                'Ocp-Apim-Subscription-Key': apiKey
            },
            method: 'POST'
        }).then(response => {
            // Done
        })
    }


}    

