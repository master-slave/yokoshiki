var workspace;
var myInterpreter = null;
var runner;
var code;
var signalState = {};

if ('undefined' !== typeof Blockly) {
    var initApi = function (interpreter, scope) {
        var wrapper = function (param) {
            return turnOnFunction(param);
        };
        interpreter.setProperty(scope, 'turnOnFunction',
            interpreter.createNativeFunction(wrapper));

        wrapper = function () {
            return turnOffFunction();
        };
        interpreter.setProperty(scope, 'turnOffFunction',
            interpreter.createNativeFunction(wrapper));

        wrapper = function (param) {
            return signalOnFunction(param);
        };
        interpreter.setProperty(scope, 'signalOnFunction',
            interpreter.createNativeFunction(wrapper));

        wrapper = function (param) {
            return signalOffFunction();
        };
        interpreter.setProperty(scope, 'signalOffFunction',
            interpreter.createNativeFunction(wrapper));

        Blockly.JavaScript.addReservedWords('waitForSeconds');
        wrapper = interpreter.createAsyncFunction(
            function (timeInSeconds, callback) {
                // Delay the call to the callback.
                setTimeout(callback, timeInSeconds * 1000);
            });
        interpreter.setProperty(scope, 'waitForSeconds', wrapper);

        Blockly.JavaScript.addReservedWords('highlightBlock');
        wrapper = function (id) {
            id = id ? id.toString() : '';
            return highlightBlock(id);
        };
        interpreter.setProperty(scope, 'highlightBlock',
            interpreter.createNativeFunction(wrapper));
    };

    var highlightBlock = function (id) {
        workspace.highlightBlock(id);
    };

    var nextStage = function () {
        var file = location.href.split('/').pop();
        file = file.split('#').shift();
        var moveTo = '';
        switch (file) {
            case 'stage1_tutorial.html':
                var re = /^highlightBlock[\s\S]*turnOnFunction\(\);\s$/;
                if (code.match(re) != null) moveTo = 'stage1.html';
                break;
            case 'stage1.html':
                var re = /^highlightBlock[\s\S]*turnOnFunction\(\);\s$/;
                if (code.match(re) != null) moveTo = 'stage2_tutorial.html';
                break;
            case 'stage2_tutorial.html':
                var re = /^highlightBlock[\s\S]*turnOnFunction[\s\S]*highlightBlock[\s\S]*turnOffFunction\(\);\s$/;
                if (code.match(re) != null) moveTo = 'stage2_tutorial2.html';
                break;
            case 'stage2_tutorial2.html':
                var re = /^highlightBlock[\s\S]*turnOnFunction[\s\S]*highlightBlock[\s\S]*waitForSeconds\(2\);\shighlightBlock[\s\S]*turnOffFunction\(\);\s$/;
                if (code.match(re) != null) moveTo = 'stage2.html';
                break;
            case 'stage2.html':
                var re = /^highlightBlock[\s\S]*turnOnFunction[\s\S]*highlightBlock[\s\S]*waitForSeconds\(2\);\shighlightBlock[\s\S]*turnOffFunction\(\);\s$/;
                if (code.match(re) != null) moveTo = 'stage3_tutorial.html';
                break;
            case 'stage3_tutorial.html':
                var re = /^(highlightBlock[\s\S]*turnOnFunction[\s\S]*highlightBlock[\s\S]*waitForSeconds\(2\);\shighlightBlock[\s\S]*turnOffFunction[\s\S]*highlightBlock[\s\S]*waitForSeconds\(2\);\s){4}$/;
                if (code.match(re) != null) moveTo = 'stage3_tutorial2.html';
                break;
            case 'stage3_tutorial2.html':
                var re = /^highlightBlock[\s\S]*(highlightBlock[\s\S]*turnOnFunction[\s\S]*highlightBlock[\s\S]*waitForSeconds\(2\);\s*highlightBlock[\s\S]*turnOffFunction[\s\S]*highlightBlock[\s\S]*waitForSeconds\(2\);\s*){4}/;
                if (code.match(re) != null) moveTo = 'stage3.html';
                break;
            case 'stage3.html':
                var re = /^highlightBlock[\s\S]*(highlightBlock[\s\S]*turnOnFunction[\s\S]*highlightBlock[\s\S]*waitForSeconds\(2\);\s*highlightBlock[\s\S]*turnOffFunction[\s\S]*highlightBlock[\s\S]*waitForSeconds\(2\);\s*){4}/;
                if (code.match(re) != null) moveTo = 'stage4_tutorial.html';
                break;
            case 'stage4_tutorial.html':
                moveTo = 'stage4_tutorial2.html';
                break;
            case 'stage4_tutorial2.html':
                moveTo = 'stage4_tutorial3.html';
                break;
            case 'stage4_tutorial3.html':
                moveTo = 'stage4_tutorial4.html';
                break;
            case 'stage4_tutorial4.html':
                moveTo = 'stage4.html';
                break;
            case 'stage4.html':
                moveTo = 'stage5_tutorial.html';
                break;
            case 'stage5_tutorial.html':
                moveTo = 'stage5.html';
                break;
            case 'stage5.html':
                moveTo = 'stage5_tutorial.html';
                break;
            case 'stage5_tutorial0.html':
                moveTo = 'stage6_tutorial.html';
                break;
            case 'stage6_tutorial.html':
                moveTo = 'stage6.html';
                break;
            case 'stage6.html':
                moveTo = 'stage6_tutorial0.html';
                break;
            case 'stage6_tutorial0.html':
                moveTo = 'index.html';
                break;
        }
        if (moveTo) {
            setTimeout(function () {
                $('#screen-arrow .arrow-right').removeClass('hidden');
            }, 1000);
        }
    };

    var resetInterpreter = function (completed) {
        myInterpreter = null;
        if (runner) {
            clearTimeout(runner);
            runner = null;
        }
        if (completed) {
            nextStage();
        }

        setTimeout(function(){
            $('.button-play > img').attr('src', 'images/button_play.svg');
            $('.button-play > img').attr('data-status', '');
        }, 500);
    };

    var resetStepUi = function (clearOutput) {
        workspace.highlightBlock(null);
    }

    var playFunction = function () {
        if ($('body#stage5').length > 0 || $('body#stage6').length > 0) {
            signalOffFunction();
        }

        code = Blockly.JavaScript.workspaceToCode(workspace);
        var myInterpreter = new Interpreter(code, initApi);
        runner = function () {
            if (myInterpreter) {
                var hasMore = myInterpreter.run();
                if (hasMore) {
                    // Execution is currently blocked by some async call.
                    // Try again later.
                    if ($('.button-play > img').attr('data-status') == 'runtime') setTimeout(runner, 10);
                } else {
                    // Program is complete.
                    // outputArea.value += '\n\n<< Program complete >>';
                    resetInterpreter(true);
                    resetStepUi(false);
                }
            }
        };
        runner();
        console.log(code);
    };

    var turnOnFunction = function (param) {
        if (param == null) {
            $('.img-playground.light-on').css('display', 'inline');
        } else {
            $('.img-playground.light-on').css('display', 'none');
            $('.img-playground.light-on.' + param).css('display', 'inline');
        }
        $('.img-playground.light-off').css('display', 'none');
    };

    var turnOffFunction = function () {
        $('.img-playground.light-off').css('display', 'inline');
        $('.img-playground.light-on').css('display', 'none');
    };

    var signalOnFunction = function (param) {
        $('.img-playground').css('display', 'none');

        if (param == null) {
            //
        } else {
            signalState[param] = true;
        }

        var color = '';
        if (signalState['blue'])   color += 'b';
        if (signalState['yellow']) color += 'y';
        if (signalState['red'])    color += 'r';
        $('.img-playground.light-on.light-' + color).css('display', 'inline');
    };

    var signalOffFunction = function () {
        $('.img-playground').css('display', 'none');
        $('.img-playground.light-off').css('display', 'inline');
        signalState = {};
    };

    var arrowScroll = function () {
        var scrollTop = 0,
            scrollFlag = false,
            arrowButtonL = $('#button-arrow-left'),
            arrowButtonR = $('#button-arrow-right');

        var scrollL = function () {
            scrollTop += 2;
            Blockly.mainWorkspace.scrollX = scrollTop;
            Blockly.mainWorkspace.resize();
            if (scrollFlag === true) {
                setTimeout(scrollL, 1);
            }
        };
        var scrollR = function () {
            scrollTop -= 2;
            Blockly.mainWorkspace.scrollX = scrollTop;
            Blockly.mainWorkspace.resize();
            if (scrollFlag === true) {
                setTimeout(scrollR, 1);
            }
        };

        arrowButtonL.on('mousedown touchstart', function () {
            scrollFlag = true;
            scrollTop = Blockly.mainWorkspace.scrollX;
            setTimeout(scrollL, 1);
            return false;
        }).on('mouseup mouseleave touchend', function () {
            scrollFlag = false;
            clearTimeout(scrollL);
        });
        arrowButtonR.on('mousedown touchstart', function () {
            scrollFlag = true;
            scrollTop = Blockly.mainWorkspace.scrollX;
            setTimeout(scrollR, 1);
            return false;
        }).on('mouseup mouseleave touchend', function () {
            scrollFlag = false;
            clearTimeout(scrollR);
        });
    };

    var tutorialHintTimer = setTimeout(function () {
        $('.img-tutorial-hint').addClass('animated fadeOut');
    }, 10000);

}




