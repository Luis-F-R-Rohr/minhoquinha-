function Run(){
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const grid = 20; // Tamanho de cada bloco da grade
  const snakeColor = 'limegreen';
  const foodColor = 'red';
  const speed = 100; // Milissegundos

  // Define a posição inicial da cobra no centro do canvas
  let snake = [{ x: 160, y: 160 }]; // Corpo da minhoca
  let food = { x: 80, y: 80 }; // Localização da comida
  let dx = grid; // Direção inicial (movimento horizontal)
  let dy = 0;
  let score = 0;
  let direction = ''; // Inicializa a direção como uma string vazia
  let changingDirection = false;

  function gameLoop() {
      if (changingDirection) {
          const prevDx = dx;
          const prevDy = dy;
          if (direction === 'left') {
              dx = -grid;
              dy = 0;
          } else if (direction === 'right') {
              dx = grid;
              dy = 0;
          } else if (direction === 'up') {
              dx = 0;
              dy = -grid;
          } else if (direction === 'down') {
              dx = 0;
              dy = grid;
          }
          changingDirection = false;
      }

      // Move a minhoca
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      // Verifica se a minhoca comeu a comida
      if (head.x === food.x && head.y === food.y) {
          score++;
          generateFood();
      } else {
          snake.pop();
      }

      // Verifica colisão com as bordas ou consigo mesma
      if (
          head.x < 0 || head.x >= canvas.width ||
          head.y < 0 || head.y >= canvas.height ||
          snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
      ) {
          document.querySelector('body').innerHTML = `<h1>Game Over! Sua pontuação é ${score}</h1>`;
          return;
      }

      // Limpa o canvas e desenha a minhoca e a comida
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawFood();

      setTimeout(gameLoop, speed);
  }

  function drawSnake() {
      ctx.fillStyle = snakeColor;
      snake.forEach(segment => ctx.fillRect(segment.x, segment.y, grid, grid));
  }

  function drawFood() {
      ctx.fillStyle = foodColor;
      ctx.fillRect(food.x, food.y, grid, grid);
  }

  function generateFood() {
      food = {
          x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
          y: Math.floor(Math.random() * (canvas.height / grid)) * grid
      };
  }

  document.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowUp' && dy === 0) {
          direction = 'up';
      } else if (event.code === 'ArrowDown' && dy === 0) {
          direction = 'down';
      } else if (event.code === 'ArrowLeft' && dx === 0) {
          direction = 'left';
      } else if (event.code === 'ArrowRight' && dx === 0) {
          direction = 'right';
      }
      changingDirection = true;
  });

  generateFood();
  gameLoop();

}
