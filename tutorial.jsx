class Title extends React.Component {
  render() {
    return (
        <span className="title">LEDを光らせよう！</span>
    );
  }
}

class Description extends React.Component {
  render() {
    return (
        <>
          <div className="description">
            <p>
              <img src="images/examples/icon_on.svg"/>は、画面上のLEDを光らせる指示です。<br/>
              <img src="images/examples/icon_space.svg"/>に<img
                src="images/examples/icon_on.svg"/>を置き、プログラムを作りましょう。<br/>
              <img
                  src="images/examples/icon_play.svg"/>をおすと、コンピュータがプログラムに従って、<br/>
              LEDを光らせます。
            </p>
          </div>
          <span className="description-test">
        <img className="img-playground light-off"
             src="images/img_tutorial_light_off.svg"/>
        <img className="img-playground light-on"
             src="images/img_tutorial_light_on.svg"/>
        </span>
        </>
    );
  }
}

class Tutorial extends React.Component {

  render() {
    return (
        <div id="tutorial" className="visuallyhidden">
          <Title/>
          <Description/>
          <Workspace blocks={<xml id="workspaceBlocks" style="display: none">
          </xml>
          } toolbox={<xml id="toolbox" style="display: none;">
            <block type="turn_on"></block>
          </xml>
          }/>
        </div>
    );
  }

}

