

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
				Contacts: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			getName: () => {
				getActions().changeName(); //function 
			},
			loadSomeData:async () => {
				const serverUrl = "https://assets.breatheco.de/apis/fake/contact/agenda"
				const unspecificApiData = await loadData(serverUrl)
					console.log("unspecificApiData", unspecificApiData);
					const ContactsArr = []

					for (const item of unspecificApiData.results) {
						console.log(item.url)
						let temp = await loadData(item.url)
						ContactsArr.push (temp.result.properties)
					};
					console.log("DONE")
					console.log(ContactsArr)
					setStore({Contacts: ContactsArr})
				
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			}
		}
	};
};

export default getState;
