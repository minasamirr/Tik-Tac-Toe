document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const restartBtn = document.getElementById('restart-btn');

  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWin = () => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        gameActive = false;
        return gameState[a];
      }
    }
    if (!gameState.includes('')) {
      gameActive = false;
      return 'tie';
    }
    return null;
  };

  const handleCellClick = (clickedCell, clickedCellIndex) => {
    if (!gameActive || gameState[clickedCellIndex] !== '') return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
      if (winner === 'tie') {
        alert('It\'s a tie!');
      } else {
        alert(`${winner} wins!`);
      }
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  };

  const handleRestart = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    cells.forEach(cell => {
      cell.textContent = '';
    });
  };

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
  });

  restartBtn.addEventListener('click', handleRestart);
});
