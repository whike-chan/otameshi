$(function() {
  /**
   * effect1 真っ二つ
   */
  var EF1 = {
    WRAP: $('.ef1-wrap'),
    TEXT: $('.ef1-tx'),
    MOVE: $('.ef1-move'),
    COPY: '',
    COPIED_CLASS: 'ef1-copied',
    SLIP: 2,
    ROTATE: 4
  }

  // 角度調整
  EF1.WRAP.css('transform','rotate(' + EF1.ROTATE + 'deg)');
  EF1.MOVE.css('transform','rotate(-' + EF1.ROTATE + 'deg)');

  // 文字複製
  EF1.COPY = EF1.TEXT.clone();
  EF1.COPY.addClass(EF1.COPIED_CLASS);
  EF1.COPY.appendTo(EF1.WRAP);

  // ズレ具合を渡す
  EF1.TEXT.css('transform','translateX(-' + EF1.SLIP + 'px)');
  EF1.COPY.css('transform','translateX(' + EF1.SLIP + 'px)');
});
