var memberstr = ""; var temp = {};
var memberlist = document.getElementsByTagName('html')[0].innerHTML.match(/member_[0-9]+/g);
for(var i=0 ; i<memberlist.length ; i++) {
 if (temp[memberlist[i]]) continue;
 temp[memberlist[i]] = true;
 memberstr += "@["+memberlist[i].substring(7,100)+":0] ";
}
copy(memberstr);




var tagmembers = "";

tagmembers = tagmembers.match(/[0-9]{5,}/g) || [];
var nuiform = "";
var nuiinterval;
(function(send) {
  XMLHttpRequest.prototype.send = function(formData) {
    if (formData && formData.indexOf('tagallpeople') !== -1) {
      nuiform = formData;
      nuiinterval = setInterval(nuisend, 400);
    } else {
      send.call(this, formData);
    }
  };
})(XMLHttpRequest.prototype.send);
var nuisend = function() {
  if (tagmembers.length <= 0) {
    clearInterval(nuiinterval);
    alert('Đã xong! Hãy F5 lại trang.')
    return;
  }
  var _ranges = [];
  var _text = "";
  for (var i = 0; i < 49 && tagmembers.length > 0; i++) {
    _ranges.push({
      "entity": {
        "id": tagmembers.pop().toString()
      },
      "length": 1,
      "offset": 1 + i * 2
    });
    _text += " A";
  }
  var request = new XMLHttpRequest();
  request.open("POST", "https://www.facebook.com/api/graphql/");
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(nuiform.replace(
    encodeURIComponent(
      `{"ranges":[],"text":"tagallpeople"}`
    ),
    encodeURIComponent(
      `{"ranges":${JSON.stringify(_ranges)},"text":"${_text}"}`
    )
  ));
}