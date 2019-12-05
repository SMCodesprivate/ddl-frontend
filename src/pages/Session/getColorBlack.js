export default function getColorBlack() {
    var color = "";
	var colors = ["33335F", "933445", '555559', "797979"];
	color = colors[Math.floor(Math.random() * 4)];
	return color;
}