import * as React from 'react';

import './App.css';

interface IState {
	userLoggedIn: boolean
}

class App extends React.Component<{}, IState> {

	public constructor(props: any) {
		super(props)

		this.state = {
			userLoggedIn: false
		}
	}

	public componentWillMount() {
		if (localStorage.getItem('userLoggedIn') !== null && localStorage.getItem('userLoggedIn') === 'true' ) {
            this.setState({
                userLoggedIn: true
			})
			window.history.pushState(null, "", '/dashboard')
			window.location.reload();

		} else {
			this.setState({
                userLoggedIn: false
			})

			window.history.pushState(null, "", '/login')
			window.location.reload();
		}
	}
  
	public render() {
		return (
			<div className="container-fluid">
				{/* {this.state.userLoggedIn ? <Redirect to='/dashboard' /> : <Redirect to='/login' />} */}
			</div>
		);
	}
}

export default App;
