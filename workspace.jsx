function updateToolbox(toolbox){
  console.log('updating toolbox');
  this.setState({toolbox})
}

class Workspace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toolbox: '<xml id="toolbox" style="display: none;"><block type="turn_on"></block></xml>'
    }
    updateToolbox = updateToolbox.bind(this);
  }

  render() {
    console.log("render workspace");
    console.log("resetting");


    $(function () {
      var touched = false;
      var touch_time = 0;
      var timer = null;
      var pointerDown = function (e) {
            touched = true;
            touch_time = 0;
            timer = setInterval(function () {
              touch_time += 100;
              if (touch_time == 1000) {
                workspace.clear();
                console.log("clearing workspace");
                resetInterpreter();
                turnOffFunction();
              }
            }, 100);
            e.stopPropagation();
            e.preventDefault();
          },
          pointerUp = function (e) {
            if (touched) {
              if (touch_time < 1000) {
                if ($('.button-play > img').attr('src')
                    == 'images/button_play.svg') {
                  $('.button-play > img').attr('src', 'images/button_stop.svg');
                  $('.button-play > img').attr('data-status', 'runtime');
                  playFunction();
                } else {
                  $('.button-play > img').attr('src', 'images/button_play.svg');
                  $('.button-play > img').attr('data-status', '');
                }
              }
            }
            touched = false;
            clearInterval(timer);
            $('.img-tutorial-hint').addClass('hidden');
            clearTimeout(tutorialHintTimer);
            e.stopPropagation();
            e.preventDefault();
          };
      var _ua = (function () {
        return {
          Touch: typeof document.ontouchstart !== "undefined",
          Pointer: window.navigator.pointerEnabled,
          MSPoniter: window.navigator.msPointerEnabled
        }
      })();
      var _start = _ua.Pointer ? 'pointerdown' : _ua.MSPointer ? 'MSPointerDown'
          : _ua.Touch ? 'touchstart' : 'mousedown';
      var _move = _ua.Pointer ? 'pointermove' : _ua.MSPointer ? 'MSPointerMove'
          : _ua.Touch ? 'touchmove' : 'mousemove';
      var _end = _ua.Pointer ? 'pointerup' : _ua.MSPointer ? 'MSPointerUp'
          : _ua.Touch ? 'touchend' : 'mouseup';

      $(".button-play").bind(_start, pointerDown);
      $(".button-play").bind(_end, pointerUp);

      arrowScroll();

      console.log('END');
    });

    turnOffFunction();

    return (
        <div id="workspace" className="workspace">
          <div id="blockly-workspace"></div>
          <div className="button-arrow">
            <button id="button-arrow-left">
              <img src="images/btn_arrow_left.svg"/>
            </button>
            <button id="button-arrow-right">
              <img src="images/btn_arrow_right.svg"/>
            </button>
          </div>
          <div className="button-play">
            <img src="images/button_play.svg"/>
          </div>
        </div>
    );
  }

  componentDidMount() {
    this.setupBlockly();
  }

  setupBlockly() {
    console.log("setting up blockly");
    resetInterpreter();
    turnOffFunction();
    if (workspace !== undefined) {
      workspace.dispose();
    }

    var options = {
      toolbox: this.state.toolbox,
      collapse: false,
      comments: false,
      disable: false,
      maxBlocks: 20,
      trashcan: false,
      horizontalLayout: true,
      toolboxPosition: 'end',
      css: true,
      media: 'google-blockly/media/',
      rtl: false,
      scrollbars: true,
      sounds: true,
      oneBasedIndex: true
    };

    /* Inject your workspace */
    workspace = Blockly.inject('blockly-workspace', options);

    /* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */
    var workspaceBlocks = document.getElementById("workspaceBlocks");

    /* Load blocks to workspace. */
    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
  }

  componentDidUpdate() {
    console.log("workspace updated " + this.state.toolbox);
    this.setupBlockly();
  }

}
