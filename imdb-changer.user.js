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
    $(response.responseText).find('#searchResult').find('tr:not(".header")').each(function(i, data) {
      var peers = $(data).find('[align="right"]');
      var peersData = peers[0].innerText + "/" + peers[1].innerText;
      var link = $(data).find('.detName > .detLink').parent()[0].innerHTML;
      var originalMagnetLink = $(data).find('a[title="Download this torrent using magnet"]')
      var tr = $('<tr>');
      var magnetLink = '<a href="' + originalMagnetLink.attr('href') + '" title="' + originalMagnetLink.attr('title') + '"><img src="http://thepiratebay.se/static/img/icon-magnet.gif" alt="Magnet Link"</a>';
      tr.append('<td>' + link + magnetLink);
      tr.append('<td>' + peersData);
      tbody.append(tr);});
    table.append(tbody);
  }});
