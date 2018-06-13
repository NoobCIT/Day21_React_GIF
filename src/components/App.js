import React, { Component } from 'react';
import API_KEY from '../variables.js';

function DisplayGifs(props) {
  return (
    <div className='container'>
      {props.list.map((gif) => {
        return <img className='gif' key={gif.id} alt={gif.title} src={gif.images.downsized.url}></img>
      })}
    </div>
  )
}
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gifData: [],
    }

    this.handleGenerateGifs = this.handleGenerateGifs.bind(this);
    this.handleClearGifs = this.handleClearGifs.bind(this);
  }

  handleGenerateGifs() {
    const URL = 'https://api.giphy.com/';
    const ENDPOINT = 'v1/gifs/trending?';
    //for the purposes of working on heroku, expose api key, yes this is bad.
    const KEY = 'api_key=CldczHCABbAZy7qC13QL07yAU6ZuPans';
    const PARAMS = '&limit=25&rating=PG-13';
    fetch(URL + ENDPOINT + KEY + PARAMS)
      .then(response => response.json())
      .then(data => {
        let gifList = data.data;
        console.log(gifList);
        this.setState({
          gifData: [...gifList],
        })
      })
  }

  handleClearGifs() {
    this.setState({
      gifData: [],
    })
  }

  render() {
    return (
      <div>
        <h1>Gifs using the <a href='https://giphy.com/'>GIPHY</a> API</h1>
        <button onClick={this.handleGenerateGifs}>Load/Reload GIFS</button>
        <button onClick={this.handleClearGifs}>Clear All Gifs</button>
        <DisplayGifs list={this.state.gifData} />
      </div>
    );
  }
}

export default App;
