/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 

function turnHoursToMinutes(array) {
  var newArray = array.map(function (item) {

    if(item.duration.includes('h')){
      if(item.duration.includes('min')){
        var duration = item.duration.split(' ');
        var h = parseInt(duration[0].split('h'));
        var min = parseInt(duration[1].split('min'));
        duration = (h*60+min);
        item.duration = duration;
        return item
      }else {
        item.duration = parseInt(item.duration.split('h'))*60;
        return item;
      }
    }else {
       item.duration = parseInt(item.duration.split('min'));
       return item;
    }   
  })
 
  return newArray;
}


// Get the average of all rates with 2 decimals 

function ratesAverage(array) {
  var sumOfRatings=array.reduce(function(acc, item){
    var rateNumber=item.rate*1;    
    return acc+rateNumber;
  },0)

  return parseFloat((sumOfRatings/array.length).toFixed(2));
}


// Get the average of Drama Movies

function dramaMoviesRate(array) {
  var dramaMovie=array.filter(function(item){
    return (item.genre.includes('Drama') );
  });

  if(dramaMovie.length) {
    return ratesAverage(dramaMovie);
  }
}


// Order by time duration, in growing order

function orderByDuration(array) {

  return array.sort(function(a, b) {
    return a.duration-b.duration || a.title.localeCompare(b.title);  
  })

}

// How many movies did STEVEN SPIELBERG

function howManyMovies(array) {
  var result = array.filter(function(item) {
    return item.genre.includes('Drama');
  });

  if (result.length) {
    var spielbergMovies = result.filter(function(item) {
      return item.director.includes('Steven Spielberg');
    })
    if(spielbergMovies.length) {
     return "Steven Spielberg directed "+spielbergMovies.length+" drama movies!";
    }else {
      return "Steven Spielberg directed 0 drama movies!";
    }
  }else {
    return undefined;
  }
}

// Order by title and print the first 20 titles

function orderAlphabetically(array) {
  var result = [];

  array.sort(function(a, b) {
    if(a.title>b.title) {
      return 1
    }else {
      return -1
    }
  });

  if(array.length<20) {
    for(var i=0; i<array.length; i++) {
      result.push(array[i].title)
    }    
  }else {
    for(var i=0; i<20; i++) {
      result.push(array[i].title)
    }      
  }

  return result;
}


// Best yearly rate average

function bestYearAvg(array) {
  var result;
  if(array.length>1){
    var groupMoviesByYear = {};

    array.forEach(function(item) {
      if(groupMoviesByYear[item.year]){
        groupMoviesByYear[item.year].push(item.rate*1)
      }else{
        groupMoviesByYear[item.year] = [];
        groupMoviesByYear[item.year].push(item.rate*1)
      }
    })

    var years = Object.keys(groupMoviesByYear)

    var media = {}

    for(var i=0; i<years.length; i++) {
      var currentYear = groupMoviesByYear[years[i]];
      var mediaPerYear = currentYear.reduce(function(acc, curr) {
        return acc+curr;
      })/currentYear.length
      media[years[i]] = mediaPerYear.toFixed(1)
    }

    var max = 0;
    for(var i=0; i<years.length; i++) {
      if(media[years[i]]>max) {
        max = media[years[i]];
        result = years[i]
      }else if(media[years[i]]==max) {
        if(result>years[i]){
          result = years[i]
        }
      }
    }
    return 'The best year was '+result+' with an average rate of '+media[result]
  }else if(array.length==1) {
    result = array[0].year
    return 'The best year was '+result+' with an average rate of '+array[0].rate

  }
}