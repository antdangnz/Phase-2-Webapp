import * as React from "react";
import './HelpPage.css'


export default class HelpPage extends React.Component<{}> {
    
    public render() {
        return (
            <div className="centreText background-img">
                <div className="help-text-area display-box">
                    <h2 className="h2">Welcome</h2>
                    <p>
                        This React app is my demonstration of a facial-recognition based login app, using Microsoft's Cognitive Services.
                        Users will be able to register their facial features into the app, and will be able to use their face to log in.
                    </p>
                    <p>
                        The only requirements for this app is that your PC should have a webcam available that the app can use. You will need
                        to provide permission for the app to use your webcam (you should get a prompt as soon as you open the app). To ensure
                        that your experience is as fluid as possible, I recommend giving the app permanent permission to use your webcam, as it may 
                        continually prompt you for permission as you use it. 
                    </p>

                    <h2>Registration</h2>
                    <p>
                        To register your face for identification, visit the 'Register' page by clicking on the link in the header. Fill in the 
                        given form and take a clear profile picture to proceed. To keep the app simple, the app only requires your name and facial image. The name 
                        field will only take the first 100 characters entered.

                        <strong> Please Note: None of your images will be saved by the app or by Microsoft's Cognitive Services.</strong> Only 
                        your facial features will be recorded and saved. 
                    </p>
                    <p>
                        You may choose to write a quick description of yourself, if you wish, in the 'Quick Description' field. You can write 
                        anything you want, as long as it's not too long. The description field will only take the first 300 characters entered. A message 
                        box will appear once your details are ready to be used to log in.
                    </p>

                    <h2>Logging In</h2>
                    <p>
                        To log in, simply visit the Login page and take your picture for verification. If you are successful, you will be taken to 
                        the dashboard where you can view your makeshift profile page (lol). You will receive a popup message if you were unsuccessful.
                    </p>

                    <h2>Profile Page</h2>
                    <p>
                        The profile page. Your name will appear at the top of the page. On this page, you will be able to search up questions from the database, and look
                        for specific questions. You can also edit, delete and add your own questions into the database. Currently, the database behind this functionality
                        has the capabilities for ratings, however I did not implement them into this front-end project yet. From this page, you should be able to log out 
                        and return back to the login page
                    </p>

                    <p>
                        To log out, click on the 'Log Out' button in the header. This will take you back to the login page.
                    </p>

                    <h2>Known Issues</h2>
                    <ol>
                        <li>The quote API that I am using has a rate limit of 10 per hour. If this is exceeded, the user will be shown the default "quote" until the 
                        API has reset</li>
                    </ol>  

                    <h2>Credits</h2>
                    <p>
                        Question Collection  created by: Anthony Dang.
                    </p>
                    {/* <p> */}
                        Thanks to the original creators for providing the assets used in this project:
                    {/* </p> */}
                    <ol>
                        Background Image:
                        <li>http://www.stockazoo.com/uploads/3/5/4/5/3545172/100064_trees.jpg by Stockazoo</li>
                        Website Icon:
                        <li>https://image.flaticon.com/icons/svg/567/567026.svg by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> and licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></li>
                    </ol>  
                </div>
            </div>
        );
    }
}