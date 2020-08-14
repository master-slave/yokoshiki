class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      level: 1,
      toolboxXml :[`<xml id="toolbox" style="display: none;">
                  <block type="turn_on"></block>
                </xml>`]
    }
  }

  render() {
    return (
        <>
          <Header/>
          <ScreenArrows/>
          <Tutorial/>
        </>
    );
  }

  componentDidMount() {
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

  }
}

ReactDOM.render(
    <Main/>, document.getElementById('root'));
