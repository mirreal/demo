/**
 * Created by mirreal on 16/5/21.
 */

var typewriter = function(element) {
  var $this = element;
  var html = $this.innerHTML;
  var progress = 0;

  $this.innerHTML = '';

  var loop = setInterval(function() {
    var current = html.substr(progress, 1);

    if (current == '<') {
      progress = html.indexOf('>', progress) + 1;
    } else {
      progress += 1;
    }

    $this.innerHTML = html.substring(0, progress) + (progress & 1 ? '_' : '');
    if (progress >= html.length) {
      clearInterval(loop);
    }
  }, 80);
};
