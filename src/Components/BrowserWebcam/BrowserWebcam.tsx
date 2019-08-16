import { toByteArray } from "base64-js"
import * as React from 'react';
import { Button } from 'react-bootstrap';
import * as Webcam from "react-webcam";

import './BrowserWebcam.css'

interface IProps {
    windowWidth: any,
    windowHeight: any,
    retrieveImage: any
}

export default class BrowserWebcam extends React.Component<IProps, {}> {
    public webcam: any;

    public constructor(props: any) {
        super(props);
        this.startCapturing = this.startCapturing.bind(this)
    }

    public setRef = (webcam: any) => {
        this.webcam = webcam;
    }

    public startCapturing() {
        const image = this.webcam.getScreenshot();
        const byteArrayImage = this.convertToByteArray(image);
        if (byteArrayImage === -1) {
            // Something went wrong
            this.props.retrieveImage(-1)
        } else {
            this.props.retrieveImage(byteArrayImage)
        }
    }

    public convertToByteArray(image: any) {
        let base64String
        try {
            base64String = image.split(',')[1];
            return toByteArray(base64String);
        } catch (error) {
            return -1;
        }
    }

    public render() {

        const videoConstraints = {
            width: 800,
            height: 500,
            facingMode: "user"
        };

        return (
        <div className="full-component-webcam">
            <Webcam className="webcam-box"
                audio={false}
                height={this.props.windowHeight}
                width={this.props.windowWidth}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <Button bsStyle="success" className="webcam-button" onClick={this.startCapturing} type="button">Take Pic</Button>
        </div>
        );
    }

}