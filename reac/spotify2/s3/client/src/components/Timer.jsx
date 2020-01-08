import React, {Component} from 'react'

class Timer extends Component{
  constructor(props) {
    super(props)
    this.state = {
      count: props.start,
    }
  }

  render(){
    const {count} = this.state
    return (
      <div>
        <h1 onChange={console.log(count)}> Counter: {count} </h1>
      </div>
    )
  }

  componentDidMount () {
    console.log("CDM")
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({
        count: prevState.count + 1
      }))
    }, 1000)
  }
  componentWillUnmount () {
    clearInterval(this.myInterval)
    console.log("CWU")

  }

}
export default Timer;
