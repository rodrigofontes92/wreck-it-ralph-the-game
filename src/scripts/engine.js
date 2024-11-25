const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
    },
    values: {
      gameVelocity: 1000, // Velocidade inicial em milissegundos
      hitPosition: 0,
      result: 0,
      currentTime: 40,
      gameStarted: false, // Indica se o jogo já começou
      velocityIncrement: 100, // Incremento para cada 6 segundos
    },
    actions: {
      timerId: null,
      countDownTimerId: null,
      speedIncreaseTimerId: null,
    },
  };
  
  // Alerta ao carregar a página
  window.addEventListener("load", () => {
    alert("You have to hit Ralph as many times as you can. Ready?");
  
    // Só começa o jogo após o usuário confirmar o alerta
    state.values.gameStarted = true;
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.speedIncreaseTimerId = setInterval(increaseGameSpeed, 6000);
  });
  
  function countDown() {
    if (!state.values.gameStarted) return; // Não faz nada se o jogo não começou
  
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
  
    if (state.values.currentTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      clearInterval(state.actions.speedIncreaseTimerId); // Para o aumento de velocidade
      alert("Game over! Your score is: " + state.values.result);
      playSound("gameover");
    }
  }
  
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  function addListenerHitbox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("retro-hit");
        }
      });
    });
  }
  
  function increaseGameSpeed() {
    // Reduz a velocidade do timer de forma proporcional ao tempo
    state.values.gameVelocity = Math.max(state.values.gameVelocity - state.values.velocityIncrement, 200); // Limite mínimo de 200ms
    clearInterval(state.actions.timerId);
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  }
  
  function initialize() {
    addListenerHitbox();
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
  }
  
  initialize();
