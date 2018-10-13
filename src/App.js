import React, { Component } from "react";

class App extends Component {
  state = {
    buffaloSweaters: []
  };

  componentDidMount() {
    // Got this down, now on to handling the Create!
    fetch("http://localhost:3001/buffalo_sweaters")
      .then(res => res.json())
      .then(data => this.setState({ buffaloSweaters: data }));
  }
  // handleInputChange = e => {
  //   // e.g. this.setState({ buffalo_name: 'bill' })
  //   // verify this works by console logging `this.state` in render
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };

  handleSubmit = e => {
    e.preventDefault();

    // this is where our post request should go when backend is set up!
    // NOTE: before now, our post request data has been made up of state
    // now, because we can't rely on the state to hold on to the real file
    // that the user uploaded, we have to get it from somewhere else.
    //
    // introducing FormData!
    // yayayay! FormData holds on to all of our data. :) :) :)
    // We can take out this.state from the request and since we're not
    // sending JSON anymore, we don't need to stringify and we can
    // take out the 'Content-Type' header!
    //
    // This is pretty much it for the front-end! Whichever components
    // would have sent form info to the backend just need to
    // format their form and their fetch like in this file.
    console.log("submitted form!");

    const data = new FormData(e.target);
    fetch("http://localhost:3001/buffalo_sweaters", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json"
        // NOTE: If this an authenticated POST, you'll still need to
        // include your authorization token.
      },
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          buffaloSweaters: [...this.state.buffaloSweaters, data]
        });
      });
  };

  render() {
    // now, we're incorporating a file upload into our form
    // we want to make sure that when a file is selected by user
    // that it's information (the whole file) is added to the state...
    // but the state isn't holding on to the whole file 😤, just a fake path
    // THERE'S GOT TO BE A BETTER WAY! cut to onSubmit
    //
    // NOTE: If you want your user to be able to upload multiple files
    // be sure to add the `multiple` attribute on the input field
    // but we don't need that now.
    console.log(this.state);
    return (
      <div>
        <h1>Buffalo Sweater App</h1>

        <h2>Create Buffalo Sweater</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Buffalo Name" name="buffalo_name" />
          <input
            type="text"
            placeholder="Sweater Design"
            name="sweater_design"
          />
          {/* the `image` name here matches the method we just added to the model */}
          <input type="file" name="image" />
          <input type="submit" value="Create Buffalo Sweater" />
        </form>

        <h2>All Buffalo Sweaters</h2>
        <ul>
          {this.state.buffaloSweaters.map(b => (
            <li key={b.id}>
              <h3 style={{ fontWeight: 300 }}>
                <strong>{b.buffalo_name}: </strong>
                {b.sweater_design}
              </h3>
              <img src={b.image_url} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
