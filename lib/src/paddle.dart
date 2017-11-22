import 'dart:async';
import 'dart:html' as $;
import 'dart:math';
import 'package:color/color.dart';
import 'ball.dart';
import 'input_controller.dart';
import 'keyboard.dart';

class Paddle {
  static const Point<int> size = const Point(100, 15);
  static final RgbColor color = RgbColor.namedColors['magenta'];
  final InputController inputController;
  Point<int> position;

  Paddle(this.position, this.inputController);

  Rectangle<int> get bounds {
    return new Rectangle<int>(position.x, position.y, size.x, size.y);
  }

  void update(Keyboard keyboard, Ball ball, Timer timer) {
    position = inputController.update(position, ball, keyboard, timer);
  }

  void draw(Timer timer, $.CanvasRenderingContext2D context) {
    context.setFillColorRgb(color.r, color.g, color.b);
    context.fillRect(position.x, position.y, size.x, size.y);
  }
}
