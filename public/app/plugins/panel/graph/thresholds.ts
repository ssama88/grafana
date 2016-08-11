///<reference path="../../../headers/common.d.ts" />

import 'jquery.flot';
import $ from 'jquery';
import _ from 'lodash';

export class ThresholdControls {
  plot: any;
  placeholder: any;
  height: any;
  thresholds: any;
  needsCleanup: boolean;

  constructor(private panelCtrl) {}

  getHandleHtml(handleIndex, model, valueStr) {
    var colorClass = 'crit';
    if (model.colorMode === 'warning') {
      colorClass = 'warn';
    }

    return `<div class="alert-handle-wrapper alert-handle-wrapper--T${handleIndex}">
    <div class="alert-handle-line alert-handle-line--${colorClass}">
    </div>
    <div class="alert-handle" data-handle-index="${handleIndex}">
    <i class="icon-gf icon-gf-${colorClass} alert-icon-${colorClass}"></i>
    <span class="alert-handle-value">${valueStr}</span>
    </div>
    </div>`;

  }

  setupDragging(handleElem, threshold, handleIndex) {
    var isMoving = false;
    var lastY = null;
    var posTop;
    var plot = this.plot;
    var panelCtrl = this.panelCtrl;

    function dragging(evt) {
      if (lastY === null) {
        lastY = evt.clientY;
      } else {
        var diff = evt.clientY - lastY;
        posTop = posTop + diff;
        lastY = evt.clientY;
        handleElem.css({top: posTop + diff});
      }
    }

    function stopped() {
      isMoving = false;
      // calculate graph level
      var graphValue = plot.c2p({left: 0, top: posTop}).y;
      graphValue = parseInt(graphValue.toFixed(0));
      threshold.value = graphValue;

      var valueCanvasPos = plot.p2c({x: 0, y: graphValue});

      handleElem.off("mousemove", dragging);
      handleElem.off("mouseup", dragging);

      // trigger digest and render
      panelCtrl.$scope.$apply(function() {
        panelCtrl.render();
        panelCtrl.events.emit('threshold-changed', {threshold: threshold, index: handleIndex});
      });
    }

    handleElem.bind('mousedown', function() {
      isMoving = true;
      lastY = null;
      posTop = handleElem.position().top;

      handleElem.on("mousemove", dragging);
      handleElem.on("mouseup", stopped);
    });
  }

  initDragging(evt) {
    var handleIndex = $(evt.currentTarget).data("handleIndex");
    console.log('alert handle index', handleIndex);
  }

  cleanUp() {
    this.placeholder.find(".alert-handle-wrapper").remove();
    this.needsCleanup = false;
  }

  renderHandle(handleIndex, defaultHandleTopPos) {
    var model = this.thresholds[handleIndex];
    var value = model.value;
    var valueStr = value;
    var handleTopPos = 0;

    // handle no value
    if (!_.isNumber(value)) {
      valueStr = '';
      handleTopPos = defaultHandleTopPos;
    } else {
      var valueCanvasPos = this.plot.p2c({x: 0, y: value});
      handleTopPos = Math.min(Math.max(valueCanvasPos.top, 0), this.height) - 6;
    }

    var handleElem = $(this.getHandleHtml(handleIndex, model, valueStr));
    this.placeholder.append(handleElem);

    handleElem.toggleClass('alert-handle-wrapper--no-value', valueStr === '');
    handleElem.css({top: handleTopPos});
  }

  prepare(elem) {
    if (this.panelCtrl.editingThresholds) {
      var thresholdMargin = this.panelCtrl.panel.thresholds.length > 1 ? '220px' : '110px';
      elem.css('margin-right', thresholdMargin);
    } else if (this.needsCleanup) {
      elem.css('margin-right', '0');
    }
  }

  draw(plot) {
    this.thresholds = this.panelCtrl.panel.thresholds;
    this.plot = plot;
    this.placeholder = plot.getPlaceholder();

    if (this.needsCleanup) {
      this.cleanUp();
    }

    // if no thresholds or not editing alerts skip rendering handles
    if (this.thresholds.length === 0 || !this.panelCtrl.editingThresholds) {
      return;
    }

    this.height = plot.height();

    if (this.thresholds.length > 0) {
      this.renderHandle(0, 10);
    }
    if (this.thresholds.length > 1) {
      this.renderHandle(1, this.height-30);
    }

    this.placeholder.off('mousedown', '.alert-handle');
    this.placeholder.on('mousedown', '.alert-handle', this.initDragging.bind(this));
    this.needsCleanup = true;
  }
}

