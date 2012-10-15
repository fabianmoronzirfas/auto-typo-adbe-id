////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

This script takes two datafiles (created with the Get_Text_Data.jsx script and editedmas described). 
They are included with an #include. (If you generate your own datafiles you’ll have to change the 
filenames at the #include tag to your own files name.)  From its data it creates two facing horizontal 
barcharts. Each Bar represents the number of characters of one sentence.

*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//Document Variables
var doc = app.documents.add();
var page = doc.pages.item(0);

//Colors
var bgColor =  color_add (doc, "bgColor", ColorModel.PROCESS, [121, 181, 165]);
var color_one = color_add (doc, "color_one", ColorModel.PROCESS, [12, 5, 19, 0]);
var color_two = color_add (doc, "color_two", ColorModel.PROCESS, [83, 55, 52, 36]);

main();

function main () {

	//include the two datafiles
	#include "Data/1349967053319.js";
	#include "Data/1349967089216.js";

	//get the maximum of sentences one text contains to determine the height of the document
	var maxPhrases = Math.max(data_one.phrase_data.length, data_two.phrase_data.length);

	//get the maximum of characters one sentence contains to determinate the width of the document
	var maxCharacters = Math.max(getMax(data_one), getMax(data_two));

	//Layout Variables
	var yGrid 		= 3;  		//used for determine the y position of bars and other elements
	var xGrid 		= .25; 		//used for determine the x position of bars and other elements
	var margin 		= 25;		//determines the start of the chart
	var gutter 		= 10*xGrid;	//determines the gap in the middle of the chart
	
	var width 		= (2 * maxCharacters * xGrid) + (2 * margin) + gutter;
	var height 		= (maxPhrases + 1) * yGrid + (2 * margin);
	var xCenter		= width/2;


	//SETUP DOCUMENT AND PAGE//

	var docPrefs 	= {
		documentPreferences : {
			"pageWidth" : width,
			"pageHeight": height
		}
	}

	var pagePrefs = {
		marginPreferences : {
			top : margin,
			right : margin,
			bottom : margin, 
			left : margin
		}
	}

	//setup document
	doc.properties = docPrefs;

	//get and setup page
	page.properties = pagePrefs;

	//make background
	var bg = page.rectangles.add({
		geometricBounds : [0, 0, height, width],
	});

	bg.fillColor = bgColor;

	


	//SETUP AND DRAW BARCHART//

	//chart specific variables
	var barHeight 	= (2/3) * yGrid;
	
	//stores the relevant data for the barchart in one object which can easily be passed around
	var chartProperties = {
		"_yGrid" 		: yGrid,
		"_xGrid" 		: xGrid,
		"_gutter"	 	: gutter,
		"_margin"		: margin,
		"_xCenter" 		: xCenter,
		"_barHeight" 	: barHeight,
	}

	//draw the chart
	drawSimpleBarchart(data_one, 1, chartProperties, color_one);
	drawSimpleBarchart(data_two, -1, chartProperties, color_two);
}


//DRAW SIMPLE BARCHART//

/*data = the data for the Barchart
side = 1 / -1 = draw the chart on the right or left side
properties = object with the relevant measurements needed to draw the chart*/

function drawSimpleBarchart(data, side, properties, color) {

	//determine the starting Point of the Chart
	var xOrigin = properties._xCenter + (side * properties._gutter/2);
	var yOrigin = properties._margin;

	//draw headline
	for (var i = 0; i < data.phrase_data.length; i++) {

		if(i==0) {
			var top  	= yOrigin + properties._yGrid * i;
			var left 	= xOrigin;
			var right  	= xOrigin + (side * data.phrase_data[i].characters * properties._xGrid);
			var bottom 	= top + properties._barHeight*2;
		}

		//calculate the dimensions of the bar
		if(i>0) {
			var top  	= yOrigin + properties._yGrid * (i+1);
			var left 	= xOrigin;
			var right  	= xOrigin + (side * data.phrase_data[i].characters * properties._xGrid);
			var bottom 	= top + properties._barHeight;
		}

		//draw bar
		var bar = page.rectangles.add({ 
			geometricBounds : [top, left, bottom, right],
			fillColor : color,
			strokeWeight : 0
		});
	};
}


//GET MAX//

//get the maximum of characters contained by one word out of the data set
function getMax(_data) {
	var _max = 0;
	for (var i = 0; i < _data.phrase_data.length; i++) {
		if(_data.phrase_data[i].characters>_max) {
			_max = _data.phrase_data[i].characters;
		}
	}
	return _max;
}


//COLOR ADD//
/*Handy color function for creating color objects 
by Fabian Morón Zirfas / https://github.com/fabiantheblind*/

function color_add(myDocument, myColorName, myColorModel, myColorValue){
      if(myColorValue instanceof Array == false){
          myColorValue = [(parseInt(myColorValue, 16) >> 16 ) & 0xff, (parseInt(myColorValue, 16) >> 8 ) & 0xff, parseInt(myColorValue, 16 ) & 0xff ];
          myColorSpace = ColorSpace.RGB;
      }else{
          if(myColorValue.length == 3)
            myColorSpace = ColorSpace.RGB;
          else
            myColorSpace = ColorSpace.CMYK;
      }
      try{
          myColor = myDocument.colors.item(myColorName);
          myName = myColor.name;
      }
      catch (myError){
          myColor = myDocument.colors.add();
          myColor.properties = {name:myColorName, model:myColorModel, space:myColorSpace ,colorValue:myColorValue};
      }
      return myColor;
  }
