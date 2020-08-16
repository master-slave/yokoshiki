

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      level: 1,
      toolboxXml :[`<xml id="toolbox" style="display: none;">
                  <block type="turn_on"></block>
                  <block type="turn_off"></block>
                </xml>`],
      bodyID: 'stage3',
      text: 'test'
    };
    this.updateMain= this.updateMain.bind(this)
  }

  updateMain = (toolbox) => {this.setState({ toolbox });
    updateToolbox('<xml id="toolbox" style="display: none;"><block type="turn_on"></block><block type="turn_off"></block></xml>');
  };

  render() {
    console.log("render main");
    return (
        <>
          <Header />
          <ScreenArrows updateText={this.updateMain}/>
          <Tutorial/>
        </>
    );
  }

  componentDidMount() {
    $(document).on('click', function (e) {
      if (!$(e.target).closest('#blockly-workspace').length
          && !$(e.target).closest('.blocklyWidgetDiv').length
          && !$(e.target).closest('.blocklyDropDownDiv').length
          && !$(e.target).closest('.blocklyTooltipDiv').length) {
        if (typeof Blockly !== "undefined") {
          Blockly.hideChaff(true);
        }
      }

      var el = $('#note');
      if (!$(e.target).closest('#note').length && !$(e.target).closest('#btn-note').length) {
        el.fadeOut();
      } else if ($(e.target).closest('#btn-note').length) {
        if (el.is(':hidden')) {
          el.fadeIn();
          $('.exclamation-hint').hide();
          swiper.init();
        } else {
          el.fadeOut();
        }
      }

      var el2 = $('.dropmenu');
      if ($(e.target).closest('.dropmenu').length) {
        if (!$(e.target).closest('.dropmenu > ul').length) {
          if (el2.hasClass('hover')) {
            el2.removeClass('hover');
          } else {
            el2.addClass('hover');
          }
        }
      } else {
        el2.removeClass('hover');
      }
    });

    var id = this.state.bodyID;
    document.body.id = id;
  }
}

ReactDOM.render(
    <Main/>, document.getElementById('root'));
