(function() {
 var int2array = function(num) {
   if (num >= Math.pow(2, 32)) return console.log('Bad Number');
   if (num == 0) return [0];

   var arr = [];

   while (num) {
     arr.unshift(num % 10);
     num = parseInt(num / 10);
   }

   return arr;
 };

 var intReverse = function(num) {
   num = parseInt(num);
   var ans = 0;
   
   while (num) {
     ans = ans * 10 + num % 10;
     num = parseInt(num / 10);
   }
   
   return ans;
 };
 
 var newScore = function(score) {
   var scores = int2array(score);
   
   $('.inner').empty();
   
   for (var i = 0, len = scores.length; i < len; i++) {
     $('.inner').append('<section class="postion p-' + i + '">'
      + '<div class="day top">' + scores[i] + '</div>'
      + '<div class="day buttom">' + (scores[i] + 1) % 10 + '</div>'
      + '</section>');

     var prevSection;
     if (i === len - 1) {
       var currSection = '.p-' + i;
       $(currSection).addClass('jump');
       
       var j = i;
       while ((scores[j--] + 1) % 10 === 0) {
         prevSection = '.p-' + j;
         $(prevSection).addClass('jump');
         
         if (j === 0) break;
       }

     }
   }
 };
 
 var score = 2986;
 newScore(score)

 setInterval(function() {
   newScore(++score);
 }, 800);
})();