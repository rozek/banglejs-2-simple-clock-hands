;(function () {
  let HourHandWidth   = 2*3, halfHourHandWidth   = HourHandWidth/2;
  let MinuteHandWidth = 2*2, halfMinuteHandWidth = MinuteHandWidth/2;

  let SecondHandOffset = 10;

  let twoPi  = 2*Math.PI, deg2rad = Math.PI/180;
  let Pi     = Math.PI;
  let halfPi = Math.PI/2;

  let sin = Math.sin, cos = Math.cos;

  let HourHandLength  = 0;
  let HourHandPolygon = new Array(8);

  function prepareHourHandPolygon(newHourHandLength) {
    if (HourHandLength === newHourHandLength) { return; }

    HourHandLength  = newHourHandLength;
    HourHandPolygon = [
      -halfHourHandWidth,halfHourHandWidth,
      -halfHourHandWidth,halfHourHandWidth-HourHandLength,
       halfHourHandWidth,halfHourHandWidth-HourHandLength,
       halfHourHandWidth,halfHourHandWidth,
    ];
  }

  let MinuteHandLength  = 0;
  let MinuteHandPolygon = new Array(8);

  function prepareMinuteHandPolygon(newMinuteHandLength) {
    if (MinuteHandLength === newMinuteHandLength) { return; }

    MinuteHandLength  = newMinuteHandLength;
    MinuteHandPolygon = [
      -halfMinuteHandWidth,halfMinuteHandWidth,
      -halfMinuteHandWidth,halfMinuteHandWidth-MinuteHandLength,
       halfMinuteHandWidth,halfMinuteHandWidth-MinuteHandLength,
       halfMinuteHandWidth,halfMinuteHandWidth,
    ];
  }

  let transformedPolygon = new Array(HourHandPolygon.length);

  function transformPolygon (originalPolygon, OriginX,OriginY, Phi) {
    let sPhi = sin(Phi), cPhi = cos(Phi), x,y;

    for (let i = 0, l = originalPolygon.length; i < l; i+=2) {
      x = originalPolygon[i];
      y = originalPolygon[i+1];

      transformedPolygon[i]   = OriginX + x*cPhi + y*sPhi;
      transformedPolygon[i+1] = OriginY + x*sPhi - y*cPhi;
    }
  }

  exports.draw = function draw (
    Settings, CenterX, CenterY, outerRadius, Hours,Minutes,Seconds
  ) {
    prepareHourHandPolygon  (outerRadius * 0.5);
    prepareMinuteHandPolygon(outerRadius * 0.8);

    let HoursAngle   = (Hours+(Minutes/60))/12 * twoPi - Pi;
    let MinutesAngle = (Minutes/60)            * twoPi - Pi;

    g.setColor(Settings.Foreground === 'Theme' ? g.theme.fg : Settings.Foreground || '#000000');

    transformPolygon(HourHandPolygon, CenterX,CenterY, HoursAngle);
    g.fillPoly(transformedPolygon);

    transformPolygon(MinuteHandPolygon, CenterX,CenterY, MinutesAngle);
    g.fillPoly(transformedPolygon);

    if (Seconds != null) {
      g.setColor(Settings.Seconds === 'Theme' ? g.theme.fgH : Settings.Seconds || '#FF0000');

      let SecondsAngle = (Seconds/60) * twoPi - Pi;

      let sPhi = Math.sin(SecondsAngle), cPhi = Math.cos(SecondsAngle);

      let SecondHandLength = outerRadius * 0.9;
      g.drawLine(
        CenterX + SecondHandOffset*sPhi,
        CenterY - SecondHandOffset*cPhi,
        CenterX - SecondHandLength*sPhi,
        CenterY + SecondHandLength*cPhi
      );
    }
  };
})();

