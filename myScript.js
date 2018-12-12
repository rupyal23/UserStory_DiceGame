"use strict";
//USER STORY DICE GAME
//1) Objective of game is to Win all the MONEY before your HEALTH or your ENERGY reaches zero. -- made function check winner
//2) If any one of these things- MONEY, HEALTH, ENERGY reaches zero. Player loses
//3) Each Player places a bet on the number of drinks other player has to drink.
//4) If player successfully drinks -- wins the bet, wins the pot(MONEY), gains some ENERGY but loses some HEALTH. 
//5) IF player loses the bet -- loses the MONEY, loses the ENERGY.
//6) If People bets the maximum(max die roll) and if player wins that bet, he wins the pot(MONEY) with the multiplier(die roll).


// One Single DIE ROLL function
function dieRoll(numSides){
	let dieRollNumber = Math.floor(Math.random()*numSides)+1;
	return dieRollNumber;
}

//to calclualte the multipier greater than 1
function betMultiplier(){
	let multiplier = dieRoll(4);
	while(multiplier === 1){
		multiplier = betMultiplier(4)   //running function again until multiplier is not equal to 1.
	}
	return multiplier;
}

function changeHealth(value){
	let healthChanged = dieRoll(value);
	return healthChanged;
}

function changeEnergy(energy){
	let energyChanged = dieRoll(energy);
	return energyChanged;
}

//checks for the bet placed by people, if its max bet or not.
function checkMax(numSides, peopleBet){
	if(peopleBet==numSides*2){
		return true;
	}
	else{
		return false;
	}
}

//created function to check money after every bet, if player does have enough money to bet. Also resolved as player money was going to negative
function checkMoney(playerMoney, playerBet){
	if(playerMoney < playerBet && playerMoney > 0){
		playerBet = playerMoney;
		return playerBet;
	}
	else{
		return playerBet;
	}
}
//This function runs the game
function lastManStanding(){
	let player1Money = 100;
	let player2Money = 100;
	let player1Health = 100;
	let player2Health = 100;
	let player1Energy = 100;
	let player2Energy = 100;
	let round = 0;
	while(player1Health > 0 && player1Money > 0 && player1Energy > 0 && player2Health > 0 && player2Money > 0 && player2Energy > 0){
		round++;
		console.log("%cRound"+round, "background: rgba(0,0,200,0.3); color: red; font-family: impact; font-size: 25px");
		let playerBet = dieRoll(10)*5;
		let changePlayer1Bet = checkMoney(player1Money, playerBet);
		let changePlayer2Bet = checkMoney(player2Money, playerBet);
		let peopleBet = dieRoll(20)*2;
		let totalBet = changePlayer1Bet + changePlayer2Bet + peopleBet;
		let player1DrinkDare = dieRoll(6);
		let player2DrinkDare = dieRoll(6);
		let player1BottlesDrunk = dieRoll(6);
		let player2BottlesDrunk = dieRoll(6);
		
		if(round % 2 == 1){		//for Odd Rounds, When player 1 challenges player 2
			console.log("PLAYER 1 challenges PLAYER 2 to drink "+player2DrinkDare+" beer bottles.");
			console.log("Bet placed by PLAYER 1: $"+changePlayer1Bet+" PLAYER 2: $"+changePlayer2Bet);
			console.log("Bets placed by PEOPLE: $"+peopleBet);
			console.log("Total Pot is now: $"+totalBet);
			if(checkMax(20, peopleBet))					// checks for if people placed the maximum bet
			{
				let multiplierNum = betMultiplier();
				console.log("%cPEOPLE have bet the MAXIMUM!, winning MONEY is "+multiplierNum+" times now!", "background: rgba(0,0,200,0.3); color: red");
				totalBet = totalBet*multiplierNum;			// if people placed the max bet, total pot will get increased as per the multiplier
			}
			if(player2BottlesDrunk >= player2DrinkDare) //if player 2 successfully wins the challenge
				{
			
					player2Money += totalBet;
					player1Money -= changePlayer1Bet;
					player2Health -= changeHealth(12);
					player2Energy += changeEnergy(8);
					player1Energy -= changeEnergy(8);
					console.log("PLAYER 2 successfully drank "+player2DrinkDare+" bottles");
					console.log("PLAYER 2 Wins the bet");
					console.log("PLAYER 1 MONEY is now: $"+player1Money);
					console.log("PLAYER 2 MONEY is now: $"+player2Money);	
					console.log("PLAYER 2 lost some HEALTH, CURRENT HEALTH is: "+player2Health);
				}
			else
				{
					player1Money += totalBet;	//if player 2 unable to win challenge
					player2Money -= changePlayer2Bet;
					player2Health -= changeHealth(12);
					console.log("PLAYER 2 was unable to drink "+player2DrinkDare+" bottles");
					console.log("PLAYER 1 Wins the bet");
					console.log("PLAYER 1 MONEY is now: $"+player1Money);
					console.log("PLAYER 2 MONEY is now: $"+player2Money);
					console.log("PLAYER 2 lost some HEALTH, CURRENT HEALTH is: "+player2Health);
				}
		}
		else if(round % 2 == 0){					//for even rounds, when player 2 challenges player 1
			console.log("PLAYER 2 challenges PLAYER 1 to drink "+player1DrinkDare+" beer bottles.");
			console.log("Bet placed by PLAYER 1: $"+changePlayer1Bet+" PLAYER 2: $"+changePlayer2Bet);
			console.log("Bets placed by PEOPLE: $"+peopleBet);
			console.log("Total Pot is now: $"+totalBet);
			if(checkMax(20, peopleBet))
				{
					let multiplierNum = betMultiplier();
					console.log("%cPEOPLE have bet the MAXIMUM!, winning MONEY is "+multiplierNum+" times now!", "background: rgba(0,0,200,0.3); color: red");
					totalBet = totalBet*multiplierNum;
				}

			if(player1BottlesDrunk >= player1DrinkDare)			//if player 1 wins the challenge
				{
		
					player1Money += totalBet;
					player2Money -= changePlayer2Bet; 
					player1Health -= changeHealth(12);
					console.log("PLAYER 1 successfully drank "+player1DrinkDare+" bottles");
					console.log("PLAYER 1 Wins the bet");
					console.log("PLAYER 1 MONEY is now: $"+player1Money);
					console.log("PLAYER 2 MONEY is now: $"+player2Money);
					console.log("PLAYER 1 lost some HEALTH, CURRENT HEALTH is: "+player1Health);	
				}
			else								// if player 1 does not win the challenge
				{
					player2Money += totalBet;
					player1Money -= changePlayer1Bet;
					player1Health -= changeHealth(12);
					console.log("PLAYER 1 was unable to drink "+player1DrinkDare+" bottles");
					console.log("PLAYER 2 wins the bet");
					console.log("PLAYER 1 MONEY is now: $"+player1Money);
					console.log("PLAYER 2 MONEY is now: $"+player2Money);
					console.log("PLAYER 1 lost some HEALTH, CURRENT HEALTH is: "+player1Health);
				}
		}
	}
	checkWinner(player1Health, player2Health, player1Money, player2Money, player1Energy, player2Energy);
}

	
//Winner Check

function checkWinner(player1Health, player2Health, player1Money, player2Money, player1Energy, player2Energy){

	if(player1Health <= 0 || player1Money <= 0 || player1Energy <= 0)
	{
		console.log("PLAYER 1 LOST THE GAME");
		console.log("%cPLAYER 2 WINS !", "font-family: impact; font-size:35px;letter-spacing: 1px");
		document.getElementById("displayWin").innerHTML = "PLAYER 2 WINS. GAME OVER"
	}
	else if(player2Health <= 0 || player2Money <= 0 || player2Energy <= 0)
	{
		console.log("PLAYER 2 LOST THE GAME");
		console.log("%cPLAYER 1 WINS !","font-family: impact;font-size: 35px;letter-spacing: 1px");
		document.getElementById("displayWin").innerHTML = "PLAYER 1 WINS. GAME OVER"
	}
}

