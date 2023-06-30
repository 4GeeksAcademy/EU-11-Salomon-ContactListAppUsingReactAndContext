import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			/**
			 * EDIT THIS!
			 * This function is the equivalent to "window.onLoad", it only runs once on the entire application lifetime
			 * you should do your ajax requests or fetch api requests here. Do not use setState() to save data in the
			 * store, instead use actions, like this:
			 *
			 * state.actions.loadSomeData(); <---- calling this function from the flux.js actions
			 *
			 **/

			fetch("https://assets.breatheco.de/apis/fake/contact/", {
      		method: "POST",
      		body: JSON.stringify([{
				"full_name": "Dave Bradley",
				"email": "dave@gmail.com",
				"agenda_slug": "my_super_agenda",
				"address":"47568 NW 34ST, 33434 FL, USA",
				"phone":"7864445566"
			}]),
      		headers: {
        	"Content-Type": "application/json"
			}
			})
			.then(resp => {
				console.log(resp.ok); // true if the response is successful
				console.log(resp.status); // the status code (e.g., 200, 400, etc.)
				console.log(resp.text()); // the response as text
				return resp.json(); // parse the response as JSON and return a promise
			})
			.then(data => {
				console.log(data); // the object received from the server
			})
			.catch(error => {
				console.log(error); // error handling
			});
		}, []);

		useEffect(() => {
			fetch("https://assets.breatheco.de/apis/fake/contact/{contact_id}", {
			method: "PUT",
			body: JSON.stringify([{
				"full_name": "Dave Bradley",
				"email": "dave@gmail.com",
				"agenda_slug": "my_super_agenda",
				"address":"47568 NW 34ST, 33434 FL, USA",
				"phone":"7864445566"
			}]),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(resp => {
				console.log(resp.ok); // true if the response is successful
				console.log(resp.status); // the status code (e.g., 200, 400, etc.)
				console.log(resp.text()); // the response as text
			})
			.then(data => {
				console.log(data); // the object received from the server
			})
			.catch(error => {
				console.log(error); // error handling
			});
			// Fetch the initial agenda list from the API
			fetch("https://assets.breatheco.de/apis/fake/contact/agenda")
			.then(resp => resp.json())
			.then(data => setTodos(data))
			.catch(error => console.log(error));
		}, []);

		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
