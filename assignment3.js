var req;
//only return 1 to 5 page numbers
function getGists() {
  //url to get gists set to variable url
  var url = 'https://api.github.com/gists';
  var pageNums = document.getElementById('pageNum');
  //only get 1 to 5 pages from gist
  if (pageNums < 1 || pageNums > 5)
  {
    pageNums = 1;
    console.log('Invalid amount of pages, return 1 page');
  }
  console.log('value in page number field: ' + pageNums);
  for (var i = 1; i <= pageNums; ++i) {
    if (i == 1)
    {
      reqGists(url, i);
    }
    else if (i == 2)
    {
      url += '?page=2';
      reqGists(url, i);
    }
    else
    {
      url = url.slice(0, url.length - 1);
      url += 1;
      reqGists(url, i);
    }
  }
}
//make an AJAX request and store results
function reqGists(url, page)
{
  var temp = 'results' + page;
  //make a request
  if (window.XMLHttpRequest) {
    var req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    req = new ActiveXObject('Microsoft.XMLHTTP');
  }
  if (!req)
  {
    throw 'Unable to create HttpRequest.';
  }
  req.onreadystatechange = function()
  {
    if (req.readyState === 4)
    {
      if (req.status === 200)
      {
        var gists = this.responseText;
        var json = JSON.parse(gists);
        loopGists(page, json);
        outputGists(page);
      }
    }
  };
  req.open('GET', 'https://api.github.com/gists', true);
  req.send();
  }
  //pushes gist to the session storage
function loopGists(page, json)
  {
    var fileholder, descrip, files, filename;
    var saveGist = true;
    var allUnchecked = true;
    if ((document.getElementById('python').checked) ||
    (document.getElementById('json').checked) ||
    (document.getElementById('javascript').checked) ||
    (document.getElementById('sql').checked))
    {
      allUnchecked = false;
    }
    //any boxes are checked
    if (!allUnchecked)
    {
      for (var x in sessionStorage)
      {
        var checkText = sessionStorage.getItem(x);
        if (checkText == null)
        {
          break;
        }
      }
    }
    //start loop through json results
    for (var i in json)
    {
      var language = [];
      descrip = json[i].descrip;
      href = json[i].html_url;
      //get files object
      files = json[i].files;
      //get the filename;
      for (var f in files)
      {
        fileholder = files[f];
        filename = fileholder.filename;
      }
      var storeItem = {
        'filename': filename,
        'description': descrip,
        'href': href,
        'language': language,
        'page': page
      };
      var keyname = json[i].id;
      //if keyname has a match already in favorites don't add
      if (localStorage.getItem(keyname))
      {
        saveGist = false;
      }
      else
      {
        if (!allUnchecked)
        {
          saveGist = false;
        }
      }
      if (saveGist)
      {
        sessionStorage.setItem(keyname, JSON.stringify(storeItem));
      }
      language = null;
      saveGist = true;
    }//end loop through json results
    console.log('how about here');
  }
function outputGists(page) {
    var temp = 'results' + page;
    var description, a, text, tr, th, button, json, pageNum;
    var tempOuter = document.getElementById(temp);
    pageNum = 'Page' + page;
    if (document.getElementById(pageNum))
    {
      var hide = document.getElementById(pageNum);
      console.log('Page exists');
      tempOuter.removeChild(hide);
    }
  //  var sep = document.creatElement('sep');
  //  sep.setAttribute('id', pageNum);
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    //loop through to create pages
    for (var i in sessionStorage)
    {
      var json = JSON.parse(sessionStorage.getItem(i));
      //code to fix browser inconsistencies
      if (json == null)
      {
        break;
      }
      if (json.page == page)
      {
        //creat button element
        button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'FAV');
        button.setAttribute('name', i);
        button.setAttribute('onclick', 'faveRow(this.name)');
      }
    }
  }
