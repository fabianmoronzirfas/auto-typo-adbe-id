// ------------------DEFINE CONTENT-------------------------------------------var content_num = ("6") // PLACE CHAPTER NUMBERvar content_chap = ("CHAPTER 6") // LINE "CHAPTER"//here you only need to decide if you need the number or not //depends on your designvar content = ("The death of Paper\n(which never happened)") //PLACE SUBHEADLINE//decide where you want the text to wrap (\n)// -------------------------------------------CREATE DOKUMENT-------------------------------------------var ph = 214var pw = 140var doc = app.documents.add({ 	documentPreferences:{		pageWidth:pw,        pageHeight:ph}});// DEFINE MARGINSvar page = doc.pages.item(0);page.marginPreferences.properties = {	top	  :	15,	left  :	20,	right :	20,	bottom:	23};var top = page.marginPreferences.top;var left = page.marginPreferences.left;var bottom = page.marginPreferences.bottom;var right = page.marginPreferences.right;var ph = doc.documentPreferences.pageHeight;var pw = doc.documentPreferences.pageWidth;//-------------------------------------------PLACE BLACK RECTANGLE-------------------------------------------var rect_1 = page.rectangles.add({geometricBounds:[0,0,ph,pw]});rect_1.fillColor = doc.swatches.item(2);//-------------------------------------------NEW COLORS-------------------------------------------var c1 = doc.colors.add();c1.properties = {	name: "pink",	model:ColorModel.PROCESS,	space:ColorSpace.CMYK,	colorValue:[0,20,10,0]};var c2 = doc.colors.add();c2.properties = {	name: "blue",	model:ColorModel.PROCESS,	space:ColorSpace.CMYK,	colorValue:[20,10,0,0]};var c3 = doc.colors.add();c3.properties = {	name: "green",	model:ColorModel.PROCESS,	space:ColorSpace.CMYK,	colorValue:[10,0,20,0]};//---------------------------------------------CHAPTER NO-------------------------------------------//PLACE CONTENT INTO TEXTFRAMEvar tf = doc.pages.item(0).textFrames.add({	geometricBounds:[top-30,left,ph - bottom-100,pw - right],	contents: content_num	});//TYPEFACE, POINTSIZEvar fontname = "BentonModDisp" + "\t" + "Ultra";var myfont = app.fonts.item(fontname);var tf     = doc.pages.item(0).textFrames.item(0);var par    = tf.paragraphs.item(0);				par.appliedFont = myfont; 				par.properties 	= {					pointSize: 300};				//CENTERED TEXT	tf.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;par.justification = Justification.CENTER_ALIGN;// CREATE OUTLINESvar poly = tf.createOutlines(true);// OBJECT STYLEvar objSt_a  = doc.objectStyles.add();	objSt_a.properties = {          name:"objectstyle_a",		  strokeColor: doc.swatches.item(0),		  fillColor: c3,			strokeWeight: 0,		  strokeStyles:(StripedStrokeStyle),			transparencySettings:{			blendingSettings:{				opacity:3,			//	blendMode: BlendMode.MULTIPLY                  }          }};// GIVE OBJECT AN OBJECT STYLEpoly[0].appliedObjectStyle = objSt_a; //DUPLICATE AND TRANSFORMfor (var i = 1; i < 360; i = i + 2) {	var dupe_poly = page.polygons.lastItem().duplicate(undefined,[0,0.3*i]);// this is a relative duplicate    var rotate = app.transformationMatrices.add({counterclockwiseRotationAngle:(5 + i)});// rotate         dupe_poly.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, rotate); //       };  //---------------------------------------------"CHAPTER"-------------------------------------------//PLACE CONTENT INTO TEXTFRAMEvar tf = doc.pages.item(0).textFrames.add({	geometricBounds:[top,left,top+10,pw - right],	contents: content_chap	});//TYPEFACE, POINTSIZEvar fontname = "BentonModernTwo" + "\t" + "Roman";var myfont = app.fonts.item(fontname);var tf    = doc.pages.item(0).textFrames.item(0),fillColor = doc.swatches.item(1);var par    = tf.paragraphs.item(0);				par.appliedFont = myfont; 				par.properties 	= {					pointSize: 7.5,					fillColor : c3,					tracking: 150};				//JUSTIFY TEXT	tf.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;par.justification = Justification.CENTER_ALIGN;//---------------------------------------------"HEADLINE"-------------------------------------------//RECTANGLE (LINE)var rect_2 = page.rectangles.add({geometricBounds:[ph-bottom-17.5,left,ph-bottom-17.6,pw-right]});rect_2.fillColor = c3;rect_2.strokeColor = doc.swatches.item(0);//PLACE CONTENT INTO TEXTFRAMEvar tf = doc.pages.item(0).textFrames.add({	geometricBounds:[ph-bottom-12,left,ph-bottom,pw - right],	contents: content	});//TYPEFACE, POINTSIZEvar fontname = "Bureau Eagle" + "\t" + "Bold";var myfont = app.fonts.item(fontname);var tf    = doc.pages.item(0).textFrames.item(0),fillColor = doc.swatches.item(1);var par    = tf.paragraphs.item(0);				par.appliedFont = myfont; 				par.properties 	= {					pointSize: 17,					fillColor : c3,					tracking: 0};				//JUSTIFY TEXT	tf.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;par.justification = Justification.CENTER_ALIGN;