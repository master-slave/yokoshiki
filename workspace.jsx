class Workspace extends React.Component {

  render() {
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
    var toolbox = document.getElementById("toolbox");

    var options = {
      toolbox: toolbox,
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

}
