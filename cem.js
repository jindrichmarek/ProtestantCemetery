$(document).ready(function() {
    var $section = $('.buttons');
    var $panzoom = $('#ProtestantCemetery').panzoom({
        $zoomIn: $section.find(".zoom-in"),
        $zoomOut: $section.find(".zoom-out"),
        $zoomRange: $section.find(".zoom-range"),
        $reset: $section.find(".reset")});
    $panzoom.panzoom("option", {
	increment: 0.4,
	minScale: 1,
	maxScale: 19,
    });
    $( "#tabs" ).tabs();
    $( "span.numlink" ).click(function() {
	$("#stonebycat").load($(this).text() + ".html #main");
    });
    $( "span.numlink2" ).click(function() {
	$("#stonebynat").load($(this).text() + ".html #main");
    });
    $( "span.numlink3" ).click(function() {
	$("#stonebyyr").load($(this).text() + ".html #main");
    });
    $('table.simplestones').dataTable( {
	"bPaginate": true,
	"bLengthChange": true,
	"bFilter": true,
	"bSort": true});

    $('table.stones').dataTable( {
	"sPaginationType": "full_numbers",
	"bPaginate": true,
	"bLengthChange": true,
	"bFilter": true,
	"bSort": true,
	"bInfo": true,
	"aoColumns": [ { "sType": [ "prettynumbers" ] }, null,null,null,null ],
	"bScrollCollapse": true,
	"bAutoWidth": false,
	"bJQueryUI": true,
	"sDom": 'flprtip',
	"aoColumnDefs": [
	    { "sWidth": "5%", "aTargets": [ 0 ] },
	    { "sWidth": "8%", "aTargets": [ 1 ] },
	    { "sWidth": "15%", "aTargets": [ 2 ] },
	    { "sWidth": "8%", "aTargets": [ 3 ] },
	    { "sWidth": "12%", "aTargets": [ 4 ] }
	]  
    } );    

    $('svg').load(function() {
	$( "g.gstone" ).click(function() {
	    colourstone($(this).attr('id'));
	});
    });
});

$(document).on("click", "span.maplink", function(){
    colourstone($(this).text());
//    $( "#tabs" ).tabs( "option", "active", 1 );
});

var CurrentStone="S1";

function colourstone(one) {
    var g = $('#' + CurrentStone);
    var p = g.children('polygon');
    p.css('fill','F5FCFF');
    CurrentStone = one ;
    g = $('#' + CurrentStone);
    p = g.children('polygon');
    var r= g.children('rect')[0];
    p.css('fill','red');	
    var c=$("#locatorcircle")[0];
    c.setAttribute("cx",r.getAttribute("x"));
    c.setAttribute("cy",r.getAttribute("y"));
    $("#stonebycat").load(CurrentStone + ".html #main");
    $("#stonebynat").load(CurrentStone + ".html #main");
    $("#stonebyyr").load(CurrentStone + ".html #main");
    var pos=g.position();
    //console.log(pos);
    // var newx1 =r.getAttribute("x") - 500;
    // var newy1 =r.getAttribute("y") - 500;
    // var newx2 =r.getAttribute("x") + 500;
    // var newy2 =r.getAttribute("y") + 500;
    // var newVB = newx1 + " "+ newy1 + " " + newx2 + " "+ newy2;
    // var wherex = -pos.left + 700;
    // var wherey=-pos.top;
    // $("#ProtestantCemetery")[0].setAttribute('style','fill:none; -webkit-transform: matrix(4,0,0,4,'+wherex+','+wherey+')');
    
}


var fuzzyNum = function (x) {
    return +x.replace(/[^\d\.\-]/g, "");
}; 

jQuery.fn.dataTableExt.oSort['prettynumbers-asc'] = function(x, y) {
    return fuzzyNum(x) - fuzzyNum(y);
};   
jQuery.fn.dataTableExt.oSort['prettynumbers-desc'] = function(x, y) {
    return fuzzyNum(y) - fuzzyNum(x);
};

