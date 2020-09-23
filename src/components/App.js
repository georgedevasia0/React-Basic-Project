import React, { Component,useState,useEffect } from 'react';
import { database, reference } from '../firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      title: '',
      body: '',
      x: '',
      y: ''
    };
    //bind
    this.handleChange = this.handleChange.bind(this)
    this.handlesubmit = this.handlesubmit.bind(this)
  }

  componentDidMount(){
    database.on('value', (snapShot) => {
      let collection = Object.keys(snapShot.val())
      // console.log(collection.length)
      this.setState({collection})
    })
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handlesubmit(e) {
    e.preventDefault()
    const note = {
      title: this.state.title,
      body: this.state.body
    }
    database.push(note)
    this.setState({
      title: '',
      body: ''
    })
  }
  render() {
    let {collection} = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 mx-auto mt-5">
            <form onSubmit={this.handlesubmit}>
              <div className="form-group">
                <input onChange={this.handleChange} value={this.state.title} type="text" name="title" className="form-control no-border" placeholder="Enter Title" required />
              </div>
              <div className="form-group">
                <textarea onChange={this.handleChange} value={this.state.body} type="text" name="body" className="form-control no-border" placeholder="Enter Title" required />
              </div>
              <div className="form-group">
                <button className="btn btn-primary col-sm-12">Save</button>
              </div>
            </form>
            {this.state.x}
          </div>
        </div>
        {collection.length > 0 && collection.map((item,_idx)=>(
          <div key={_idx}>
            <h3>{item}</h3>
            <RenderMsg title={item}/>
            </div>
        ))}
      </div>
    );
  }
}

function RenderMsg ({title}) {
  const [document, setDocument] = useState([])

  useEffect(() => {
    reference.ref(title).on("value", (snapShot) =>{
      let data = [];
      snapShot.forEach(item =>{
        data.push(item.val());
      })
      setDocument(data)
    } )    
  }, [title])

  return(
   <>
      {document.length > 0 && document.map((item,_idx) => (
        <div key={_idx} style={{marginLeft: "2rem"}}>
        <h4 >{Array.isArray(item) && _idx+1}</h4>
        {/* {console.log(Array.isArray(item))} */}
        <div>
          {Array.isArray(item) && item.map((msg,idx)=>(
            <p key={idx}>{msg}</p>
          ))}
        </div>
        </div>
      ))}
   </>
  )
}

export default App;
