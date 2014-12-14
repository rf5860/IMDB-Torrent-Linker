// ==UserScript==
// @name          IMDB Torrent Linker
// @description	  Modifies IMDB to search Pirate Bay
// @include       http://www.imdb.com/title/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @author        WMA
// ==/UserScript==
// Style
GM_addStyle('\
.torrent-table {\
border: 1px solid #DFDFDF;\
background-color: #F9F9F9;\
width: 100%;\
-moz-border-radius: 10px;\
-webkit-border-radius: 10px;\
border-radius: 10px;\
font-family: Arial,"Bitstream Vera Sans",Helvetica,Verdana,sans-serif;\
color: #333;\
margin-bottom: 20px\
}\
.torrent-table td, .torrent-table th {\
border-top-color: white;\
border-bottom: 1px solid #DFDFDF;\
border-right: 1px solid #DFDFDF;\
color: #555;\
}\
.torrent-table th {\
text-shadow: rgba(255, 255, 255, 0.796875) 0px 1px 0px;\
font-family: Georgia,"Times New Roman","Bitstream Charter",Times,serif;\
font-weight: normal;\
padding: 7px 7px 8px;\
text-align: left;\
line-height: 1.3em;\
font-size: 14px;\
}\
.torrent-table td {\
font-size: 12px;\
padding: 4px 7px 2px;\
vertical-align: top;\
');
$('#maindetails_center_top').css('margin-bottom', '0px');
var title = $('.header > span[itemprop="name"]').text();
var url = encodeURI("http://oldpiratebay.org/search.php?q=" + title + "&Torrent_sort=seeders.desc")
var elem = $('<div id="torrents" class="maindetails_center" style="margin-bottom: 400px">').insertBefore($('#maindetails_center_bottom'));
var thead = $('<thead><tr><th>Torrent</th><th>Seeders / Leechers</th>');
var table = $('<table class="torrent-table">').append(thead);
elem.append(table);
GM_xmlhttpRequest({
  method: "GET",
  url: url,
  onload: function(response) {
    var tbody = $('<tbody>');
    $(response.responseText).find('.table-torrents>tbody>tr').each(function(i, data) {
      var leechers = $(data).find('td.ly').text();
      var seeders = $(data).find('td.sy').text();
      var peersData = seeders + "/" + leechers;
      var title = $(data).find('td.title-row > a');
      var originalMagnetLink = $(data).find('a[title="MAGNET LINK"]');
      var link = $(data).find('td.title-row > a')[0].outerHTML;
      var tr = $('<tr>');
      var magnetLink = '<a href="http://oldpiratebay.org/' + originalMagnetLink.attr('href') + '" title="' + title + '"><img src="http://oldpiratebay.org/tpbimg/icons/magnet.png" alt="Magnet Link"</a>';
      tr.append('<td>' + link + magnetLink);
      tr.append('<td>' + peersData);
      tbody.append(tr);});
    table.append(tbody);
    $('.torrent-table>tbody>tr>td>a').each(function(i, data) { if (i==0){data.setAttribute("href", "http://thepiratebay.se" + data.getAttribute("href"));}});
  }});
