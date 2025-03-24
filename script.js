// Wait for the DOM to load before running the game script
document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');
  const resetBtn = document.getElementById('reset-btn');
  let currentPlayer = 'X';
  let board = Array(9).fill('');

  // Add click event listener to each box
  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      // Only allow marking an empty box and only if the game hasn't been won yet
      if (box.textContent === '' && !checkWinner()) {
        box.textContent = currentPlayer;
        board[index] = currentPlayer;

        // Check for a win after the move
        if (checkWinner()) {
          setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        } else if (board.every(cell => cell !== '')) {
          // Check for a draw if all boxes are filled
          setTimeout(() => alert("It's a draw!"), 100);
        } else {
          // Switch turns
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    });
  });

  // Reset game when the reset button is clicked
  resetBtn.addEventListener('click', resetGame);

  // Function to clear the board and reset variables
  function resetGame() {
    board = Array(9).fill('');
    boxes.forEach(box => (box.textContent = ''));
    currentPlayer = 'X';
  }

  // Function to check for winning combinations
  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winningCombos.some(combo => {
      const [a, b, c] = combo;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  }
});
