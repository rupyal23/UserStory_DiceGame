"use strict";
//USER STORY DICE GAME
//Objective of game is to Win all the MONEY before your HEALTH or your ENERGY reaches zero. -- made function check winner
//Each Player places a bet on the number of drinks other player has to drink.
//If player successfully drinks -- wins the bet, wins the pot(MONEY), gains some ENERGY but loses some HEALTH. 
//IF player loses the bet -- loses the MONEY, loses the ENERGY.
//If People bets the maximum(max die roll) and if player wins that bet, he wins the pot(MONEY) with the multiplier(die roll) and would be able to recover some health.



function dieRoll(numSides){
	let dieRollNumber = Math.floor(Math.random()*numSides)+1;
	return dieRollNumber;
}

function placeBet(amount){
	let betPlaced = dieRoll(amount);
	return betPlaced;
}

function drinkBeer(numBottles){
	let beer2Drink = dieRoll(numBottles);
	return beer2Drink;
}

function beerDrunk(numBottles){
	let bottlesDrunk = dieRoll(numBottles);
	return bottlesDrunk;
}

function dieRollMultiplier(numSides){
	let multiplier = dieRoll(4);
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

//This function runs the game
function lastManStanding(){
	let player1Money = 500;
	let player2Money = 500;
	let player1Health = 100;
	let player2Health = 100;
	let player1Energy = 100;
	let player2Energy = 100;
	let playerBet = placeBet(10)*10;
	let peopleBet = placeBet(20)*10;
	let totalBet = playerBet + peopleBet;
	let player1DrinkDare = drinkBeer(6);
	let player2DrinkDare = drinkBeer(6);
	console.log("Round 1");
	console.log("Player 1 challenges Player 2 to drink "+player2DrinkDare+" beer bottles.");
	console.log("Bet placed by Player 1: $"+playerBet);
	console.log("Bets placed by people: $"+peopleBet);
	console.log("Total Pot is now: $"+totalBet);
	let player1BottlesDrunk = beerDrunk(6);
	let player2BottlesDrunk = beerDrunk(6);

	while(player1Health > 0 && player1Money > 0 && player1Energy > 0 && player2Health > 0 && player2Money > 0 && player2Energy > 0){
		if(player2BottlesDrunk >= player2DrinkDare)
		{
			player2Money += totalBet;
			player1Money -= playerBet; 
			console.log("Player 2 successfully drank "+player2DrinkDare+" bottles");
			console.log("Player 2 Wins the Pot");
			console.log("Player 2 Total money is now: $"+player2Money);	
		}
		else
		{
			player1Money += totalBet;
			player2Money -= playerBet;
			player2Health -= changeHealth(12);
			console.log("Player 2 loses the bet");
			console.log("Player 2 Money is now: $"+player2Money);
			console.log("Player 2 lost some health, Current Health is: "+player2Health);
		}
	}
	checkWinner(player1Health, player2Health. player1Money, player2Money, player1Energy, player2Energy);
}

	
//Winner Check

function checkWinner(player1Health, player2Health, player1Money, player2Money, player1Energy, player2Energy){

	if(player1Health == 0 || player1Money == 0 || player1Energy == 0)
	{
		console.log("Player 1 lost the game");
		console.log("PLAYER 2 WINS !");
	}
	else if(player2Health == 0 || player2Money == 0 || player2Energy == 0)
	{
		console.log("Player 2 lost the game");
		console.log("PLAYER 1 WINS !")
	}

}

function roundCount(){
	let round = 1;

}