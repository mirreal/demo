function loop() {
  for (let i = 0; i < 100; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      console.log(i)
      if (i % 3 === 0) console.log('fizz')
      if (i % 5 === 0) console.log('buzz')
    }
  }
}

// 有点差异
const loop() => {
  for (let i = 0; i < 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log(i + 'fizzbuzz');
    } else if (i % 3 === 0) {
      console.log(i + 'fizz');
    } else if (i % 5 === 0) {
      console.log(i + 'buzz');
    }
  }
}

loop()
