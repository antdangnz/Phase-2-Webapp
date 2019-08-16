import * as React from "react";
import { Alert } from 'react-bootstrap';

import BrowserWebcam from './../BrowserWebcam/BrowserWebcam';

import './LoginPage.css';

interface IState {
    alertOpen: boolean,
    imageData: any,
    userData: string,
    userLoggedIn: boolean,
	userName: string
}

export default class LoginPage extends React.Component<{}, IState> {
    private alertMessage: string = 'Let me guess.. someone stole your sweetroll?';
    private globalApiKey: string = 'af15847e523645f2bf47ad0abb90c428';

    public constructor(props: any) {
		super(props)
        this.retrieveImage = this.retrieveImage.bind(this)

		this.state = {
            alertOpen: false,
            imageData: null,
            userData: 'Old 2011 memes',
            userLoggedIn: false,
			userName: 'Unknown'
		}
	}

    public async retrieveImage(image: any) {
        const apiKey = this.globalApiKey; // Removed keys
        
        this.setState({alertOpen: false})

        this.showAlert("Processing your photo....")
        
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01';
        await fetch(apiEndpoint, {
            body: image,
            headers: { 
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': apiKey
            },
            method: 'POST'
        }).then(response => {
			if (response.ok) {

				response.json().then(async data => {
                    if (data.length > 0) {
                        // Assumes the closest face is the person looking to log in.
                        this.handleFaceIdentify(apiKey, data[0].faceId);
                    } else {
                        this.showAlert("Sorry, we couldn't find your face. Try again!");
                    }
                });

			} else {
                this.showAlert("Sorry, we couldn't find your face. Make sure your camera is on and that you are facing the camera.");
			}
        })
	}

    public render() {
        return (
			<div className="centreText container-fluid background-img"> <br/>
                {
                    this.state.alertOpen ?
                    <Alert bsStyle="warning">
                        {this.alertMessage}
                    </Alert>
                    :
                    null
                }
                <div className="wrapper">
                    <div className="display-box">
                        <h2 className="centreText log-in">Log In</h2>

                        <div>
                            <BrowserWebcam 
                                windowWidth={500}
                                windowHeight={500}
                                retrieveImage={this.retrieveImage} 
                            />
                        </div>
                    </div>
                </div>
			</div>
        );
    }

    public showAlert(message: string) {
        this.alertMessage = message
        this.setState({alertOpen: true})
    }

    public componentWillUpdate(nextProps: any, nextState: any) {
        localStorage.setItem('userName', nextState.userName);
        localStorage.setItem('userData', nextState.userData)
        localStorage.setItem('userLoggedIn', String(nextState.userLoggedIn))

        if (nextState.userLoggedIn) {
            window.history.pushState(null, "", '/dashboard')
            window.location.reload();
        }
    }
    
	private async handleFaceIdentify(apiKey: string, faceId: string) {
		const requestBody: any = {
			"personGroupId": "adfacialpg",
			"faceIds": [
				faceId
			],
			"maxNumOfCandidatesReturned": 1,
			"confidenceThreshold": 0.5
		}

		const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/identify';
		await fetch(apiEndpoint, {
            body: JSON.stringify(requestBody),
            headers: { 
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': apiKey
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(async data => {
                    if (data[0].candidates.length > 0) {
                        // Assuming the first candidate is the one that has the most confidence.
                        this.handlePersonGroupLookup(apiKey, data[0].candidates[0].personId)
                    } else {
                        this.showAlert("Sorry, we couldn't identify your face.")
                    }
                });
            } else if (response.status === 409) {
                // Training in Progress
                setTimeout(() => {
                    this.handleFaceIdentify(apiKey, faceId);
                    }, 4000);
            } else {
                // Other unforseen errors
            }
            
        })
	}

	private async handlePersonGroupLookup(apiKey: string, personId: string) {
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/persongroups/adfacialpg/persons/' + personId;
        
		await fetch(apiEndpoint, {
            headers: { 
                'Ocp-Apim-Subscription-Key': apiKey
            },
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then(async data => {
                    this.setState({userName: data.name, userData: data.userData, userLoggedIn: true})
                });
            } else {
                // Couldn't find details for the face identified?? Not sure how this would be possible in this situation
            }
        })
	}
}