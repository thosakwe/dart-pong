import 'dart:async';
import 'dart:html' as $;

class Keyboard {
  final $.Element container;
  final Map<int, bool> _keys = {};
  StreamSubscription _keyUp, _keyDown;

  Keyboard(this.container);

  bool isDown(int keyCode) => _keys.putIfAbsent(keyCode, () => false);

  void listen() {
    _keyUp = container.onKeyUp.listen((e) {
      _keys[e.keyCode] = false;
    });

    _keyDown = container.onKeyDown.listen((e) {
      _keys[e.keyCode] = true;
    });
  }

  void close() {
    _keyUp.cancel();
    _keyDown.cancel();
  }
}
