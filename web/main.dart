import 'dart:html';
import 'package:pong/pong.dart' as pong;

void main() {
  var canvas = querySelector('#game');
  var game = new pong.Game(canvas);
  game.start();
}
