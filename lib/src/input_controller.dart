import 'dart:async';
import 'dart:html' as $;
import 'dart:math';
import 'ball.dart';
import 'keyboard.dart';

abstract class InputController {
  Point<int> update(Point<int> currentPosition, Ball ball, Keyboard keyboard, Timer timer);
}

class AIInputController implements InputController {
  final int speed;
  const AIInputController(this.speed);

  @override
  Point<int> update(
      Point<int> currentPosition, Ball ball, Keyboard keyboard, Timer timer) {
    int x = currentPosition.x, diff = ball.position.x - x;

    if (diff.abs() >= speed) {
      if (x < ball.position.x) x += speed;
      else if (x > ball.position.x) x -= speed;
    }

    return new Point<int>(x, currentPosition.y);
  }
}

class UserInputController implements InputController {
  final int speed;
  const UserInputController(this.speed);

  @override
  Point<int> update(
      Point<int> currentPosition, Ball ball, Keyboard keyboard, Timer timer) {
    if (keyboard.isDown($.KeyCode.LEFT)) {
      return new Point<int>(currentPosition.x - speed, currentPosition.y);
    } else if (keyboard.isDown($.KeyCode.RIGHT)) {
      return new Point<int>(currentPosition.x + speed, currentPosition.y);
    }

    return currentPosition;
  }
}
