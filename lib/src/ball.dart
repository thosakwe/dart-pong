import 'dart:async';
import 'dart:html' as $;
import 'dart:math';
import 'paddle.dart';

class Ball {
  static final Point<int> size = new Point(Paddle.size.y, Paddle.size.y);
  final int speed;
  int orientation = 1, horizontal = 0;
  Point<int> position;

  Ball(this.speed, this.position);

  Rectangle<int> get bounds {
    return new Rectangle<int>(position.x, position.y, size.x, size.y);
  }

  void update(Timer timer) {
    position = new Point<int>(position.x + horizontal, position.y + (orientation * speed));
  }

  void draw($.CanvasRenderingContext2D context) {
    var color = Paddle.color;
    context.setFillColorRgb(color.r, color.g, color.b);
    context.fillRect(position.x, position.y, size.x, size.y);
  }
}
