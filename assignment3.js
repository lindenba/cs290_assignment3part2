var gistsArray = [];
//make an AJAX request and store results
function reqGists(url, page)
{
  var pageSelect = document.getElementsByName('page');
  var url = 'https://api.github.com/gists';
  if (pageSelect[0].value > 5)
  {
    pageSelect[0].value = 5;
  }
  for (var i = 1; i <= pageSelect[0].value; i++) {
  //make a request
  if (window.XMLHttpRequest)
  {
    var req = new XMLHttpRequest();
  } else if (window.ActiveXObject)
  {
    req = new ActiveXObject('Microsoft.XMLHTTP');
  }
  if (!req)
  {
    throw 'Unable to create HttpRequest.';
  }
  var params = {
      page: pageSelect
    };
    url += '?' + urlStringify(params, i);
  req.onreadystatechange = function()
  {
    if (req.readyState === 4)
    {
      if (req.status === 200) {
        var gists = JSON.parse(this.responseText);
        var gistsFinal = [];
        var sizeFinal = 0;
          for (var i = 0; i < gists.length; i++)
          {
            for (var key in gists[i].files)
            {
                  gistsFinal[sizeFinal] = gists[i];
                  sizeFinal++;
            }
          }
        }
        gistsArray = gistsFinal;
      //function to create list get from array and put in search results column
        createResultList(gistsArray, document.getElementById('search-results'));
    }
  };
  req.open('GET', url);
  req.send();
  }
}

window.onload = function()
{
  console.log('Begin!');
  sessionStorage.clear();
  createDisplaylist();
}

function urlStringify(param, i) {
  var string = [];
  for (var prop in param) {
   var s = encodeURIComponent(prop) + '=' + encodeURIComponent(i);
    string.push(s);
  }
  return string.join('&');
}
//create the result list from the gist api
function createResultList(array, list)
{
  var list = document.getElementById('gists');
  var ul = document.createElement('ul');
  for (var i = 0; i < array.length; i++)
  {
  var theFirstChild = list.firstChild;
  var conDiv = document.createElement('li');
  list.insertBefore(conDiv, theFirstChild);
  conDiv.id = array[i].id;
  if (array[i].description == null || array[i].description.length == 0)
  {
    var item = document.createElement('div');
    item.innerHTML += '<a href ="' + array[i].html_url +
     '">' + 'No Description' + '</a>';
     conDiv.appendChild(item);
  }
  else
  {
    var item = document.createElement('div');
    item.innerHTML += '<a href ="' +
        array[i].html_url + '"> ' + array[i].description + ' </a>';
    conDiv.appendChild(item);
  }
  this.fButton = document.createElement('button');
  this.fButton.innerHTML = 'Favorite';
  this.fButton.onclick = function()
  {
    localStorage.setItem('togist', JSON.stringify(this.parentNode.textContent));
    this.parentNode.style.display = 'none';
    createDisplaylist();
  };
  conDiv.appendChild(fButton);
  ul.appendChild(conDiv);
  list.appendChild(ul);
  // var favoriteButton = document.createElement('input');
  // favoriteButton.innerHTML = '+';
  // favoriteButton.type = 'button';
  // favoriteButton.value = 'favorite';
  // favoriteButton.setAttribute('onclick', 'addtoFavorite(this.parentNode)');
  // conDiv.appendChild(favoriteButton);
  // favoriteButton.onclick = function()
  // {
  //   var conDiv = this.getAttribute('onclick');
  // //  var tobeFavoredGist = findById('');
  //   for (var i = 0; i < gistsArray.length; i++)
  //   {
  //     if (gistsArray[i].id === favoriteButton.id)
  //     {
  //     localStorage.setItem(favoriteButton.id, JSON.stringify(gistsArray[i]));
  //       break;
  //     }
  //   }
  // };
  // list.appendChild(conDiv);
  }
  return list;
}
//create the display list for the favorites clicked on
function createDisplaylist()
{
  var list = document.getElementById('fav-gist');
  var ul = document.createElement('ul');
  for (var key in localStorage)
  {
    var temp = document.createElement('li');
    temp.innerHTML = localStorage[key];
    this.dButton = document.createElement('button');
    this.dButton.innerHTML = 'Remove Favorite';
    this.dButton.onclick = function()
    {
      this.parentNode.style.display = 'none';
      localStorage.clear();
      createDisplaylist();
    };
    temp.appendChild(dButton);
    ul.appendChild(temp);
    list.appendChild(ul);
  }
  return list;
}
