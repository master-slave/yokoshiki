function updateText(text) {
  this.setState({text})
}


class Dropmenu extends React.Component {

  render() {
    return (
        <span id="dropmenu" className="menu dropmenu">
          ステージ1
          <ul>
            <li><a href="index.html">スタート！</a></li>
            <li>ステージ1
              <ul>
                <li><a href="stage1_tutorial.html">説明するよ！</a></li>
                <li><a href="stage1.html">やってみよう！</a></li>
              </ul>
            </li>
            <li>ステージ2
              <ul>
                <li><a href="stage2_tutorial.html">説明するよ！1</a></li>
                <li><a href="stage2_tutorial2.html">説明するよ！2</a></li>
                <li><a href="stage2.html">やってみよう！</a></li>
              </ul>
            </li>
            <li>ステージ3
              <ul>
                <li><a href="stage3_tutorial.html">説明するよ！1</a></li>
                <li><a href="stage3_tutorial2.html">説明するよ！2</a></li>
                <li><a href="stage3.html">やってみよう！</a></li>
              </ul>
            </li>
            <li>ステージ4
              <ul>
                <li><a href="stage4_tutorial.html">説明するよ！1</a></li>
                <li><a href="stage4_tutorial2.html">説明するよ！2</a></li>
                <li><a href="stage4_tutorial3.html">説明するよ！3</a></li>
                <li><a href="stage4_tutorial4.html">説明するよ！4</a></li>
                <li><a href="stage4.html">やってみよう！</a></li>
              </ul>
            </li>
            <li>ステージ5
              <ul>
                <li><a href="stage5_tutorial.html">説明するよ！</a></li>
                <li><a href="stage5.html">やってみよう！</a></li>
                <li><a href="stage5_tutorial0.html">作品例</a></li>
              </ul>
            </li>
            <li>ステージ6
              <ul>
                <li><a href="stage6_tutorial.html">説明するよ！</a></li>
                <li><a href="stage6.html">やってみよう！</a></li>
                <li><a href="stage6_tutorial0.html">作品例</a></li>
              </ul>
            </li>
          </ul>
        </span>
    );
  }

}

