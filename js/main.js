var myInterpreter = null;
var runner;
var code;
var swiper;

var signalState = {};

if ('undefined' !== typeof Blockly) {
    Blockly.Blocks['turn_on'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("images/ico_turn_on.svg", 40, 40, "*"));
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#66C7FF");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    Blockly.Blocks['turn_off'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("images/ico_turn_off.svg", 40, 40, "*"));
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#66C7FF");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    Blockly.Blocks['wait'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("images/ico_wait.svg", 40, 40, "*"))
                .appendField(new Blockly.FieldNumber(1, 0, 999, 0.1), "SECOND");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#00833D");
            this.setTooltip("");
            this.setHelpUrl("");

            if ('undefined' !== typeof disabledField && disabledField) {
                this.setEditable(false);
            }
        }
    };
    Blockly.Blocks['loop'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("images/ico_loop.svg", 40, 40, "*"))
                .appendField(new Blockly.FieldNumber(4, 0, 999, 1), "COUNT");
            this.appendStatementInput("LOOP")
                .setCheck(null);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#EEE357");
            this.setTooltip("");
            this.setHelpUrl("");

            if ('undefined' !== typeof disabledField && disabledField) {
                this.setEditable(false);
            }
        }
    };
    Blockly.Blocks['color_selector'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldIconMenu(
                    [
                        {src: 'images/ico_turn_on_purple.svg',
                            value: 'purple', width: 48, height: 48, alt: 'むらさき'},
                        {src: 'images/ico_turn_on_pink.svg',
                            value: 'pink', width: 48, height: 48, alt: 'ピンク'},
                        {src: 'images/ico_turn_on_all.svg',
                            value: 'all', width: 48, height: 48, alt: 'カラフル'},
                        {src: 'images/ico_turn_on_blue.svg',
                            value: 'blue', width: 48, height: 48, alt: 'あお'},
                        {src: 'images/ico_turn_on_green.svg',
                            value: 'green', width: 48, height: 48, alt: 'みどり'},
                        {src: 'images/ico_turn_on_brown.svg',
                            value: 'brown', width: 48, height: 48, alt: 'ちゃいろ'},
                        {src: 'images/ico_turn_on_yellow.svg',
                            value: 'yellow', width: 48, height: 48, alt: 'きいろ'},
                        {src: 'images/ico_turn_on_red.svg',
                            value: 'red', width: 48, height: 48, alt: 'あか'},
                        {src: 'images/ico_turn_on_orange.svg',
                            value: 'orange', width: 48, height: 48, alt: 'オレンジ'}
                    ]), 'CHOICE');
            this.setOutput(true);
            this.setColour("#66C7FF");
        }
    };
    Blockly.Blocks['turn_on_color'] = {
        init: function () {
            this.jsonInit({
                "id": "turn_on_color",
                "message0": "%1 %2",
                "args0": [
                    {
                        "type": "field_image",
                        "src": "images/ico_turn_on_yellow.svg",
                        "width": 40,
                        "height": 40,
                        "alt": "Set LED Color"
                    },
                    {
                        "type": "input_value",
                        "name": "CHOICE"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "category": Blockly.Categories.looks,
                "colour": "#66C7FF"
            });
        }
    };
    Blockly.Blocks['car_selector'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldIconMenu(
                    [
                        {src: 'images/ico_car_on_blue.svg',
                            value: 'blue', width: 48, height: 48, alt: 'あお'},
                        {src: 'images/ico_car_on_yellow.svg',
                            value: 'yellow', width: 48, height: 48, alt: 'きいろ'},
                        {src: 'images/ico_car_on_red.svg',
                            value: 'red', width: 48, height: 48, alt: 'あか'}
                    ]), 'CHOICE');
            this.setOutput(true);
            this.setColour("#585858");
        }
    };
    Blockly.Blocks['car_on_color'] = {
        init: function () {
            this.jsonInit({
                "id": "car_on_color",
                "message0": "%1 %2",
                "args0": [
                    {
                        "type": "field_image",
                        "src": "images/ico_car_on_blue.svg",
                        "width": 40,
                        "height": 40,
                        "alt": "Set Signal Color"
                    },
                    {
                        "type": "input_value",
                        "name": "CHOICE"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "category": Blockly.Categories.looks,
                "colour": "#585858"
            });
        }
    };
    Blockly.Blocks['car_off'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("images/ico_car_off.svg", 40, 40, "*"));
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#585858");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    Blockly.Blocks['walk_selector'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldIconMenu(
                    [
                        {src: 'images/ico_walk_on_blue.svg',
                            value: 'blue', width: 48, height: 48, alt: 'あお'},
                        {src: 'images/ico_walk_on_red.svg',
                            value: 'red', width: 48, height: 48, alt: 'あか'}
                    ]), 'CHOICE');
            this.setOutput(true);
            this.setColour("#585858");
        }
    };
    Blockly.Blocks['walk_on_color'] = {
        init: function () {
            this.jsonInit({
                "id": "walk_on_color",
                "message0": "%1 %2",
                "args0": [
                    {
                        "type": "field_image",
                        "src": "images/ico_walk_on_blue.svg",
                        "width": 40,
                        "height": 40,
                        "alt": "Set Signal Color"
                    },
                    {
                        "type": "input_value",
                        "name": "CHOICE"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "category": Blockly.Categories.looks,
                "colour": "#585858"
            });
        }
    };
    Blockly.Blocks['walk_off'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("images/ico_walk_off.svg", 40, 40, "*"));
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#585858");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.JavaScript['turn_on'] = function (block) {
        var code = 'turnOnFunction();\n';
        return code;
    };
    Blockly.JavaScript['turn_off'] = function (block) {
        var code = 'turnOffFunction();\n';
        return code;
    };
    Blockly.JavaScript['wait'] = function (block) {
        var sec = block.getFieldValue('SECOND');
        var code = 'waitForSeconds($sec);\n'.replace('$sec', sec);
        return code;
    };
    Blockly.JavaScript['loop'] = function (block) {
        var code = '';
        var count = block.getFieldValue('COUNT');
        for (var i = 0; i < count; i++) {
            code += Blockly.JavaScript.statementToCode(block, 'LOOP');
        }
        return code;
    };
    Blockly.JavaScript['turn_on_color'] = function (block) {
        var field = block.getChildren()[0];
        var color = field.getFieldValue('CHOICE');
        var code = 'turnOnFunction("$color");\n'.replace('$color', color);
        return code;
    };
    Blockly.JavaScript['car_on_color'] = function (block) {
        var field = block.getChildren()[0];
        var color = field.getFieldValue('CHOICE');
        var code = 'signalOnFunction("$color");\n'.replace('$color', color);
        return code;
    };
    Blockly.JavaScript['car_off'] = function (block) {
        var code = 'signalOffFunction();\n';
        return code;
    };
    Blockly.JavaScript['walk_on_color'] = function (block) {
        var field = block.getChildren()[0];
        var color = field.getFieldValue('CHOICE');
        var code = 'signalOnFunction("$color");\n'.replace('$color', color);
        return code;
    };
    Blockly.JavaScript['walk_off'] = function (block) {
        var code = 'signalOffFunction();\n';
        return code;
    };

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
    var workspace = Blockly.inject('blockly-workspace', options);

    /* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

    var workspaceBlocks = document.getElementById("workspaceBlocks");

    /* Load blocks to workspace. */
    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);

    /* Block Highlight */
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';

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

    $(function () {
        var touched = false;
        var touch_time = 0;
        var timer = null;
        var pointerDown = function(e) {
                touched = true;
                touch_time = 0;
                timer = setInterval(function(){
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
            pointerUp = function(e) {
                if (touched) {
                    if (touch_time < 1000 ) {
                        if ($('.button-play > img').attr('src') == 'images/button_play.svg') {
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
        var _ua = (function(){
            return {
                Touch: typeof document.ontouchstart !== "undefined",
                Pointer: window.navigator.pointerEnabled,
                MSPoniter: window.navigator.msPointerEnabled
            }
        })();
        var _start = _ua.Pointer ? 'pointerdown' : _ua.MSPointer ? 'MSPointerDown' : _ua.Touch ? 'touchstart' : 'mousedown';
        var _move  = _ua.Pointer ? 'pointermove' : _ua.MSPointer ? 'MSPointerMove' : _ua.Touch ? 'touchmove' : 'mousemove';
        var _end   = _ua.Pointer ? 'pointerup' : _ua.MSPointer ? 'MSPointerUp' : _ua.Touch ? 'touchend' : 'mouseup';

        $(".button-play").bind(_start, pointerDown);
        $(".button-play").bind(_end, pointerUp);

        arrowScroll();

        console.log('END');
    });


    $('#tutorial').removeClass('visuallyhidden');
    if (location.hash == '#prev') {
        $('#tutorial').addClass('slide-in-prev');
    } else {
        $('#tutorial').addClass('slide-in');
    }

    turnOffFunction();
}

if ('undefined' !== typeof Swiper) {
    swiper = new Swiper('.swiper-container', {
        init: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

$(document).on('click', function (e) {
    if (!$(e.target).closest('#blockly-workspace').length
        && !$(e.target).closest('.blocklyWidgetDiv').length
        && !$(e.target).closest('.blocklyDropDownDiv').length
        && !$(e.target).closest('.blocklyTooltipDiv').length) {
        Blockly.hideChaff(true);
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
});

$('#screen-arrow .arrow-left').click(function () {
    var moveTo = this.href + '#prev';
    if ($('#tutorial').length > 0) {
        $('#tutorial').removeClass('slide-in');
        $('#tutorial').addClass('slide-out-prev');
        setTimeout(function () {
            $('#tutorial').addClass('visuallyhidden');
            location.href = moveTo
        }, 1000);
    } else {
        location.href = moveTo
    }
    return false;
});

$('#screen-arrow .arrow-right').click(function () {
    var moveTo = this.href;
    if ($('#tutorial').length > 0) {
        $('#tutorial').removeClass('slide-in-prev');
        $('#tutorial').addClass('slide-out');
        setTimeout(function () {
            $('#tutorial').addClass('visuallyhidden');
            location.href = moveTo
        }, 1000);
    } else {
        location.href = moveTo
    }
    return false;
});