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


    /* Block Highlight */
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
}




