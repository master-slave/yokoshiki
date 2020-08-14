class ScreenArrows extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 1,
      id: 'stage1'
    };

    this.forward = this.forward.bind(this);
    this.backward = this.backward.bind(this);
  }

  forward(e) {
    this.setState({
      count: this.state.count + 1,
      id: 'stage2'
    });

  }

  backward(e) {
    this.setState({
      count: this.state.count - 1,
      id: 'stage3'
    });
    console.log("backward");
  }

  render() {

    return (
        <>
          <a href="#" className="arrow-left" onClick={this.backward}>
            <img src="images/btn_screen_left.svg" alt=""/>
          </a>
          <a href="#" className="arrow-right hidden"
             onClick={this.forward}>
            <img src="images/btn_screen_right.svg" alt=""/>
          </a>
        </>
    );
  }

  componentDidMount() {
    var id = this.state.id;
    document.body.id = id;
  }
}

ReactDOM.render(
    <ScreenArrows/>, document.getElementById('screen-arrow'));
