var turn = true; // true: X, false: O
var grid = [
	[
		[["", "", ""], ["", "", ""], ["", "", ""]], // 0, 0
		[["", "", ""], ["", "", ""], ["", "", ""]], // 0, 1
		[["", "", ""], ["", "", ""], ["", "", ""]]  // 0, 2
	],
	[
		[["", "", ""], ["", "", ""], ["", "", ""]], // 1, 0
		[["", "", ""], ["", "", ""], ["", "", ""]], // 1, 1
		[["", "", ""], ["", "", ""], ["", "", ""]]  // 1, 2
	],
	[
		[["", "", ""], ["", "", ""], ["", "", ""]], // 2, 0
		[["", "", ""], ["", "", ""], ["", "", ""]], // 2, 1
		[["", "", ""], ["", "", ""], ["", "", ""]]  // 2, 2
	]
];

function reset(){
	grid = [[[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]], [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]] ], [[["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]], [["", "", ""], ["", "", ""], ["", "", ""]]]];
	$("#TTT-winner").html("");
	$("#TTT-turnText").css("display", "block");
	$("#TTT-button").css("display", "none");
	$(".X").removeClass("X");
	$(".O").removeClass("O");
	$("table table td").addClass("possible");
	turn = true;
}

$(document).ready(function() {
	var innerhtml = "";
	for (var row = 0; row < 3; row++) {
		innerhtml += "<tr>"
		for (var col = 0; col < 3; col++) {
			innerhtml += "<td><table data-row=\"" + row + "\" data-column=\"" + col + "\">";
			for (var i = 0; i < 3; i++) {
				innerhtml += "<tr>";
				for (var j = 0; j < 3; j++) {
					innerhtml += "<td data-row=\"" + i + "\" data-column=\"" + j + "\"></td>";
				}
				innerhtml += "</tr>";
			}
			innerhtml += "</table></td>";
		}
		innerhtml += "</tr>"
	}
	
	$("#ultimate").html(innerhtml);
	$("table table td").addClass("possible");

	$("table table td").click(function() {
		if($(this).hasClass("possible")){
			var row = Number($($(this).parents("table:not(#ultimate)")[0]).data("row"));
			var col = Number($($(this).parents("table:not(#ultimate)")[0]).data("column"));
			var i = Number($(this).data("row"));
			var j = Number($(this).data("column"));
			turn = !turn;
			grid[row][col][i][j] = turn ? "O" : "X";
			$(".possible").removeClass("possible");
			$(this).addClass(grid[row][col][i][j]);

			if (winSquare(row, col)) {
				grid[row][col] = turn ? "O" : "X";
				$("table table[data-row=" + row + "][data-column=" + col + "]").addClass(turn ? "O" : "X");
			}

			if ($.isArray(grid[i][j])) {
				var tableGrid = grid[i][j];
				if (tableGrid[0].indexOf("") === -1 &&
					tableGrid[1].indexOf("") === -1 &&
					tableGrid[2].indexOf("") === -1) {

					grid[i][j] = "";
				}
			}
			if (winner()) {
				$("#TTT-winner").html((turn ? "O" : "X") + " won! Congrats!");
				$("#TTT-turnText").css("display", "none");
				$("#TTT-button").css("display", "inline-block");
			}
			else if (tie()) {
				$("#TTT-winner").html("The match ended with a tie!");
				$("#TTT-turnText").css("display", "none");
				$("#TTT-button").css("display", "inline-block");
			}
			else {
				if ($.isArray(grid[i][j])) {
					$("table table[data-row=" + i + "][data-column=" + j + "] td:not(.X, .O)").addClass("possible");
				}
				else {
					$("table table:not(.X, .O) td:not(.X, .O)").addClass("possible");
				}
				$("#turn").html(turn ? "X" : "O");
				$("#turn").css("color", turn ? "red" : "blue");
			}
		}
	});
});
function tie() {
	var result = true;
	for (var row = 0; row < 3; row++) {
		for (var col = 0; col < 3; col++) {
			if ($.isArray(grid[row][col])) {
				result = false;
			}
		}
	}
	return result;
}
function winner() {
	var result = false;
	for (var i = 0; i < 3; i++) {
		result = result || JSON.stringify(grid[i]) === JSON.stringify(["X","X","X"]);
		result = result || JSON.stringify(grid[i]) === JSON.stringify(["O","O","O"]);

		result = result || JSON.stringify([grid[0][i], grid[1][i], grid[2][i]]) === JSON.stringify(["X", "X", "X"]);
		result = result || JSON.stringify([grid[0][i], grid[1][i], grid[2][i]]) === JSON.stringify(["O", "O", "O"]);
	}
	result = result || JSON.stringify([grid[0][0], grid[1][1], grid[2][2]]) === JSON.stringify(["X", "X", "X"]);
	result = result || JSON.stringify([grid[0][0], grid[1][1], grid[2][2]]) === JSON.stringify(["O", "O", "O"]);

	result = result || JSON.stringify([grid[0][2], grid[1][1], grid[2][0]]) === JSON.stringify(["X", "X", "X"]);
	result = result || JSON.stringify([grid[0][2], grid[1][1], grid[2][0]]) === JSON.stringify(["O", "O", "O"]);
	return result;
}
function winSquare(row, col) {
	var result = false;
	for (var i = 0; i < 3; i++) {
		result = result || JSON.stringify(grid[row][col][i]) === JSON.stringify(["X","X","X"]);
		result = result || JSON.stringify(grid[row][col][i]) === JSON.stringify(["O","O","O"]);

		result = result || JSON.stringify([grid[row][col][0][i], grid[row][col][1][i], grid[row][col][2][i]]) === JSON.stringify(["X", "X", "X"]);
		result = result || JSON.stringify([grid[row][col][0][i], grid[row][col][1][i], grid[row][col][2][i]]) === JSON.stringify(["O", "O", "O"]);
	}
	result = result || JSON.stringify([grid[row][col][0][0], grid[row][col][1][1], grid[row][col][2][2]]) === JSON.stringify(["X", "X", "X"]);
	result = result || JSON.stringify([grid[row][col][0][0], grid[row][col][1][1], grid[row][col][2][2]]) === JSON.stringify(["O", "O", "O"]);

	result = result || JSON.stringify([grid[row][col][0][2], grid[row][col][1][1], grid[row][col][2][0]]) === JSON.stringify(["X", "X", "X"]);
	result = result || JSON.stringify([grid[row][col][0][2], grid[row][col][1][1], grid[row][col][2][0]]) === JSON.stringify(["O", "O", "O"]);
	return result;
}

