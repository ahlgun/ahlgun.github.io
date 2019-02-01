// --- BRANCHES --- //
// Dots define branch depth, 
// : = First, :: = Second, and so on.

// ----- Heirarchial ----- //
// : App( :: ItemList( ::: DeleteItem ), :: InputField )

// ----- Prolonged ----- //
// ::  App < ItemList && InputField
// ::: App < ItemList < DeleteItem



// :
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list:this.props.list, 
			formData:{name:'', age:'', country:''}
		};
		this.updateList   = this.updateList.bind(this);
		this.deleteObject = this.deleteObject.bind(this);
		this.updateListItemValue  = this.updateListItemValue.bind(this);
		this.fillOutForm  = this.fillOutForm.bind(this);
		this.updateFormValue = this.updateFormValue.bind(this);
	};
	updateList(object) {
		let updatedList = this.state.list;
		updatedList.push(object);
		this.setState({list:updatedList});
	};
	deleteObject(index) {
	    this.state.list.splice(index, 1);
	    this.forceUpdate();
	};
	updateListItemValue(event) {
		let updatedList = this.state.list;
		let self  = event.target;
		let prop  = self.getAttribute('data-type');
		let index = self.getAttribute('data-index');
		updatedList[index].prop = self.value;
		this.setState({list:updatedList});
	};
	updateFormValue(event) {
		let updatedData = this.state.formData;
		let self = event.target;
		let datatype = self.getAttribute('data-type');
		let value = self.value;
		switch(datatype) {
			case 'name'    : updatedData.name    = value; break;
			case 'age'     : updatedData.age     = value; break;
			case 'country' : updatedData.country = value; break;
		}
		this.setState({formData:updatedData});

	};
	fillOutForm(event) {
		let self    = event.target;
		let name    = self.getAttribute('data-name');
		let age     = self.getAttribute('data-age');
		let country = self.getAttribute('data-country');
		this.setState({formData:{name:name, age:age, country:country}})
	};
	render() {
		return(
			<div id="App">
				<ItemList updateValue={this.updateValue} list={this.state.list} deleteObject={this.deleteObject} fillOutForm={this.fillOutForm} />
				<InputField updateList={this.updateList} formData={this.state.formData} updateFormValue={this.updateFormValue} />
			</div>
		);
	};
};



// ::
class ItemList extends React.Component {
	constructor(props) {
		super(props);
	};
	render() {
		let mappedList = this.props.list.map((object, index) => {
			return (
				<li key={index} id={'listItem' + index} className="listItem">
					<input onKeyPress={this.props.updateValue} data-index={index} data-type='name' type="text" placeholder="Name" defaultValue={object.name} /><span className="prop">Name</span><br/>
					<input onKeyPress={this.props.updateValue} data-index={index} data-type='age' type="text" placeholder="Age" defaultValue={object.age} /><span className="prop">Age</span><br/>
					<input onKeyPress={this.props.updateValue} data-index={index} data-type='country' type="text" placeholder="Country" defaultValue={object.country} /><span className="prop">Country</span><br/>
					<button onClick={this.props.fillOutForm} data-name={object.name} data-age={object.age} data-country={object.country}>Copy</button>
					<DeleteItem deleteObject={this.props.deleteObject} index={index} />
				</li>
			);
		});
		return(
			<div id="ItemList">
				<ul>
					{mappedList}
				</ul>
			</div>
		);
	};
};



// :::
class DeleteItem extends React.Component {
	constructor(props) {
		super(props);
	};
	render() {
		return(
			<button onClick={() => {this.props.deleteObject(this.props.index)}}> Delete </button>
		);
	};
};



// ::
class InputField extends React.Component {
	constructor(props) {
		super(props);
		this.Submitted = this.Submitted.bind(this);
	};
	Submitted(event) {
		// Prevent page reload
		event.preventDefault();
		// Get values
		let inputName    = event.target.querySelector('#inputName');    let nameValue    = inputName.value;
		let inputAge     = event.target.querySelector('#inputAge');     let ageValue     = inputAge.value;
		let inputCountry = event.target.querySelector('#inputCountry'); let countryValue = inputCountry.value;
		// Clear inputs
		inputName.value = inputAge.value = inputCountry.value = '';
		let newObject = {
			name:nameValue, 
			age:ageValue, 
			country:countryValue
		};
		// Call list-updater
		this.props.updateList(newObject);
	};
	render() {
		return(
			<form id="InputField" onSubmit={this.Submitted}>
				<h2>Add new</h2>
				<input type="text" onChange={this.props.updateFormValue.bind(this)} data-type='name' value={this.props.formData.name} id="inputName" placeholder="Name" />
				<input type="text" onChange={this.props.updateFormValue.bind(this)} data-type='age' value={this.props.formData.age} id="inputAge" placeholder="Age" />
				<input type="text" onChange={this.props.updateFormValue.bind(this)} data-type='country' value={this.props.formData.country} id="inputCountry" placeholder="Country" />
				<input type="submit" />
			</form>
		);
	};
};



let objectList = [
	{name:'Gunnar', age:'20', country:'Sweden'},
	{name:'Lovie Hetzler', age:'13', country:'Morocco'},
	{name:'Berna Kavanaugh', age:'8', country:'New Zeeland'},
	{name:'Joni Cardon', age:'23', country:'Canada'},
	{name:'Lanelle Escalante', age:'43', country:'France'}
];

ReactDOM.render(
	<App list={objectList}/>, 
	document.getElementById('prototype')
);