var c = document.getElementById("board");
var ctx = c.getContext("2d");
var side_length = c.scrollWidth;

function draw_board(){
    var side_length = 600;
    var space_length = side_length/3;
    var line_spaces = [space_length, space_length*2]

    //Draw the vertical lines
    for (const index in line_spaces){
        ctx.moveTo(0, line_spaces[index]);
        ctx.lineTo(side_length, line_spaces[index]);
        ctx.stroke();
    }

    //Draw Horizontal Lines
    for (const index in line_spaces){
        ctx.moveTo(line_spaces[index], 0);
        ctx.lineTo(line_spaces[index], side_length);
        ctx.stroke();
    }
}

var board = [['-', '-', '-'],
['-', '-', '-'],
['-', '-', '-']]

var current_player = "o"

c.addEventListener('click', play)

function get_board_coordinates(x_point, y_point){
    return [Math.floor(x_point/side_length*3), Math.floor(y_point/side_length*3)];
}

function get_cartesian_coordinates(x_point, y_point){
    return [x_point*side_length/3, y_point*side_length/3];
}

function get_coords(board){
    return board;        
}

function draw_circle(x, y){
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.stroke();
}

function draw_x(x, y){
    ctx.moveTo(x-80, y-80);
    ctx.lineTo(x+80, y+80);
    ctx.stroke();

    ctx.moveTo(x+80, y-80);
    ctx.lineTo(x-80, y+80);
    ctx.stroke();
}

function check_horizontals(){
    for(var i = 0; i < board.length; i++){
        var val = board[i][0];
        var all_identical = true;
        for (var n = 1; n < board.length; n++){
            if(board[i][n] != val || board[i][n] == '-')
                all_identical = false;
        }
        if (all_identical)
            return true
    }
}

function check_verts(){
    for(var i = 0; i < board.length; i++){
        var val = board[0][i];
        var all_identical = true;
        for (var n = 1; n < board.length; n++){
            if(board[n][i] != val || board[n][i] == '-')
                all_identical = false;
        }
        if (all_identical)
            return true
    }
}




function check_diagnoals(){
    var val = board[0][0]
    var all_identical = true;
    for(var i = 1; i < board.length; i++){
        if(board[i][i] != val || board[i][i] == '-')
        all_identical = false;
    }
    if(all_identical)
        return true;
    
    
    var val = board[0][2]
    var all_identical = true;
    for(var i = 1; i < board.length; i++){
        if(board[i][2-i] != val || board[i][i] == '-')
            all_identical = false;
    }
    if(all_identical)
        return true;
}

function play(event){
    var x = event.pageX;
    var y = event.pageY;

    var board_coords = get_board_coordinates(x, y);

    board[board_coords[1]][board_coords[0]] = current_player;

    console.log(board_coords[0])
    var fixed_coords = get_cartesian_coordinates(board_coords[0], board_coords[1])

    if(current_player === 'o')
        draw_circle(fixed_coords[0]+100, fixed_coords[1]+100)
    else
        draw_x(fixed_coords[0]+100, fixed_coords[1]+100)

    console.log(board)

    if (current_player === 'o')
        current_player = 'x'
    else
        current_player = 'o'
    
    if(check_horizontals() || check_verts() || check_diagnoals())
        alert("you win!!!")
}

draw_board()
