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
    if ($('#tutorial').length > 0) {
      $('#tutorial').removeClass('slide-in-prev');
      $('#tutorial').addClass('slide-out');
      setTimeout(function () {
        $('#tutorial').addClass('visuallyhidden');
      }, 1000);
    }
    return false;
  }

  backward(e) {
    this.setState({
      count: this.state.count - 1,
      id: 'stage3'
    });
    console.log("backward");

    if ($('#tutorial').length > 0) {
      $('#tutorial').removeClass('slide-in');
      $('#tutorial').addClass('slide-out-prev');
      setTimeout(function () {
        $('#tutorial').addClass('visuallyhidden');

      }, 1000);
    }
    return false;
  }

  render() {

    return (
        <div id="screen-arrow">
          <a href="#" className="arrow-left" onClick={this.backward}>
            <img src="images/btn_screen_left.svg" alt=""/>
          </a>
          <a href="#" className="arrow-right hidden"
             onClick={this.forward}>
            <img src="images/btn_screen_right.svg" alt=""/>
          </a>
        </div>
    );
  }

  componentDidMount() {
    var id = this.state.id;
    document.body.id = id;
  }
}
