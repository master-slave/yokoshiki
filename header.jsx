class Header extends React.Component {

  render() {
    return (
        <div id="header">
          <Dropmenu/>
          <span className="title">説明するよ！</span>


          <ul className="right-icon">
            <li>
              <a id="btn-note" href="#"><img
                  src="images/ico_book.svg" alt=""/></a>
              <img className="exclamation-hint animated infinite slow tada"
                   src="images/ico_hint.svg"/>
              <div id="note" className="balloon note-explain"
                   style={{display: 'none'}}>
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <h4>0.使い方</h4>
                      <img src="images/note/img_note_explain.svg" alt=""/>
                      <p>
                        <img src="images/note/ico_note_char_a.svg"
                             className="note-explain-char" alt="A"/>
                        指示ブロックを並べてプログラムを作るところ。
                        このわくに入りきらないときは、両側の矢印をおして下さい。
                      </p>
                      <p>
                        <img src="images/note/ico_note_char_b.svg"
                             className="note-explain-char" alt="B"/>
                        指示ブロック
                      </p>
                      <p>
                        <img src="images/note/ico_note_char_c.svg"
                             className="note-explain-char" alt="C"/>
                        プログラムを実行させるボタン。<br/>
                        <img src="images/note/ico_note_play.svg" alt="再生"/>をおすと、
                        <img src="images/note/ico_note_stop.svg" alt="停止"/>に変わります。<br/>
                        <img src="images/note/ico_note_stop.svg"
                             alt="停止"/> をおすと、プログラムが一時停止します。<br/>
                        <img src="images/note/ico_note_play.svg" alt="再生"/>や
                        <img src="images/note/ico_note_stop.svg" alt="停止"/>を長おしすると、
                        <img src="images/note/ico_note_space.svg" alt=""/>/にある指示ブロックが全て消えます
                      </p>
                      <p>
                        <img src="images/note/ico_note_char_d.svg"
                             className="note-explain-char" alt="D"/>
                        課題を達成すると、右側に
                        <img src="images/note/ico_note_screen_right.svg"
                             alt="次へ"/>が出てきます。<br/>
                        <img src="images/note/ico_note_screen_right.svg"
                             alt="次へ"/>をおすと、次の画面に移ります。<br/>
                        <img src="images/note/ico_note_screen_left.svg"
                             alt="もどる"/>をおすと、前の画面にもどります。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
    );
  }

}

