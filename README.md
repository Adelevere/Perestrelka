# Perestrelka ("Shootout")

A browser-based version of the team math game "Perestrelka", built with JavaScript, HTML and CSS.

This project won the "Steps into Science of the 21st Century" city research conference for high school students (2024).

## How to run

1. Download or clone the repository.
2. Open `Perestrelka.html` in any web browser.
3. Enter the number of teams and start the game.

## Tech stack

- JavaScript
- HTML
- CSS

---

# "Perestrelka" ("Shootout") Game Rules

## Overview

**Perestrelka** is a turn-based team game in which teams compete by solving problems and "shooting" at each other to reduce their opponents' strength.

## Setup

1. **Number of teams:** from 2 to 50
2. **Starting stats for each team:**
   - Strength: 100 points
   - Correct answers: 2
   - Wrong answers: 2

## Gameplay

### Turn order

1. **Choosing the shooting team:** At the start of each turn, a team is selected to "shoot".
2. **Solving the problem:** The selected team solves a task.
3. **Result:**
   - **Correct answer:**
     - +10 points of strength
     - +1 to the correct answers counter
     - The team earns the right to shoot
   - **Wrong answer:**
     - +1 point of strength (compensation)
     - +1 to the wrong answers counter
     - The turn ends

### Shooting

After a correct answer:

1. **Choosing a target:** The team chooses an opponent to attack.
2. **Hit chance:** The probability of a hit depends on the ratio of the team's correct and wrong answers.
3. **Result of the shot:**
   - **Hit:**
     - Damage = 20% of the shooting team's current strength (minimum 5 points)
     - The target team's strength is reduced by this amount
     - If the target's strength drops to 0 or below, the team is eliminated
   - **Miss:** The shot deals no damage.

### Special cases

- **Eliminated target:** If the chosen target has already been eliminated, the system automatically selects a random team that is still in the game.
- **No targets left:** If no target can be chosen (all teams except the shooting team are eliminated), the game ends.

## End of the game

The game ends when:

1. **Only one team remains** — it is declared the winner.
2. **All teams are eliminated** — the game is a draw.
3. **The players end the game early** using the "End Game" button.

## Determining the winner

If the game ends early, teams are ranked by:

1. **Strength** (primary criterion)
2. **Number of correct answers** (secondary criterion)
3. **Number of wrong answers** (tertiary criterion)

## Strategy tips

- **Solve problems correctly** — this increases your strength and your chance of hitting.
- **Attack strong opponents** to reduce their advantage.
- **Keep an eye on every team's stats** in the results table.
- **Remember:** as your strength decreases, so does the damage you deal.

Good luck!
