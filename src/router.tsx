import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App'
import { Header } from './Components/Header/Header';
import HelpPage from './Components/HelpPage/HelpPage';
import LoginPage from './Components/LoginPage/LoginPage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import RegisterPage from './Components/RegisterPage/RegisterPage';

import './css/styles.css';

export const AppRouter: React.StatelessComponent<{}> = () => {
    
    return (
        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/dashboard" component={ProfilePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/help" component={HelpPage} />
                    {/* <Redirect from='*' to='/' /> */}
                </main>
            </div>
        </BrowserRouter>
    );
}
