import UI from '../../ui/UI';

/**
 * 动画面板
 * @author tengge / https://github.com/tengge1
 */
function AnimationPanel(options) {
    UI.Control.call(this, options);
    this.app = options.app;

    this.canvas = null;
    this.context = null;
};

AnimationPanel.prototype = Object.create(UI.Control.prototype);
AnimationPanel.prototype.constructor = AnimationPanel;

AnimationPanel.prototype.render = function () {
    var data = {
        xtype: 'div',
        parent: this.parent,
        cls: 'animation-panel',
        children: [{
            xtype: 'div',
            cls: 'controls',
            children: [{
                xtype: 'iconbutton',
                icon: 'icon-backward'
            }, {
                xtype: 'iconbutton',
                icon: 'icon-play'
            }, {
                xtype: 'iconbutton',
                icon: 'icon-forward'
            }, {
                xtype: 'iconbutton',
                icon: 'icon-stop'
            }]
        }, {
            xtype: 'canvas',
            cls: 'timeline',
            id: 'timeline'
        }]
    };

    var control = UI.create(data);
    control.render();

    this.app.on(`appStarted.${this.id}`, this.onAppStarted.bind(this));
};

AnimationPanel.prototype.onAppStarted = function () {
    var canvas = UI.get('timeline').dom;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    var context = canvas.getContext('2d', { alpha: false });

    this.canvas = canvas;
    this.context = context;

    context.fillStyle = '#555';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#888';
    context.beginPath();

    var duration = 60;
    var scale = 10;
    var width = duration * scale;
    var scale4 = scale / 4;

    for (var i = 0.5; i <= width; i += scale) {

        context.moveTo(i + (scale4 * 0), 18); context.lineTo(i + (scale4 * 0), 26);

        if (scale > 16) context.moveTo(i + (scale4 * 1), 22), context.lineTo(i + (scale4 * 1), 26);
        if (scale > 8) context.moveTo(i + (scale4 * 2), 22), context.lineTo(i + (scale4 * 2), 26);
        if (scale > 16) context.moveTo(i + (scale4 * 3), 22), context.lineTo(i + (scale4 * 3), 26);

    }

    context.stroke();

    context.font = '10px Arial';
    context.fillStyle = '#888'
    context.textAlign = 'center';

    var step = Math.max(1, Math.floor(64 / scale));

    for (var i = 0; i < duration; i += step) {

        var minute = Math.floor(i / 60);
        var second = Math.floor(i % 60);

        var text = (minute > 0 ? minute + ':' : '') + ('0' + second).slice(- 2);

        context.fillText(text, i * scale, 13);

    }
};

export default AnimationPanel;