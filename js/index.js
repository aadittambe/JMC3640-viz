
  console.log("i am a hoopy frood")
  let censusData = dl.csv('states.csv')
  console.log("raw", censusData)

  let xyData = censusData.map( row => {
    row.x = row.year
    row.y = row.population
    return row
  })

  let neData = xyData.filter(row => row.state == "China")
  console.log("ne", neData)

  let iaData = xyData.filter(row => row.state == "India")
  console.log("ia", iaData)

  let ksData = xyData.filter(row => row.state == "Korea")
  console.log("ks", ksData)

  let irData = xyData.filter(row => row.state == "Iran")
  console.log("ir", irData)

  let mlData = xyData.filter(row => row.state == "Malaysia")
  console.log("ml", mlData)

  let caData =xyData.filter(row=> row.state == "Canada")
  console.log("ca", caData)

  let data2014 = xyData.filter(row => row.year == 2014)
  console.log(2014, data2014)

  let data2015 = xyData.filter(row => row.year == 2015)
  console.log(2015, data2015)

  let data2016 = xyData.filter(row => row.year == 2016)
  console.log(2016, data2016)

  let data2017 = xyData.filter(row => row.year == 2017)
  console.log(2017, data2017)

  let data2018 = xyData.filter(row => row.year == 2018)
  console.log(2018, data2018)


  let lineChartConfig = {
    type: 'line',
    data: {
      labels: [2014,2015,2016,2017,2018,],
      
      datasets: [{ 
          data: iaData,
          label: "India",
          borderColor: "#3e95cd",
          backgroundColor:  "#3e95cd",
          fill: false
        }, { 
          data: ksData,
          label: "Korea",
          borderColor: "#3cba9f",
          backgroundColor:  "#3cba9f",
          fill: false
        }, { 
          data: neData,
          label: "China",
          borderColor: "#8e5ea2",
          backgroundColor: "#8e5ea2",
          fill: false

        }, { 
          data: irData,
          label: "Iran",
          borderColor: "#32CD32",
          backgroundColor: "#32CD32",
          fill: false
          
        }, { 
          data: mlData,
          label: "Malaysia",
          borderColor: "#9932CC",
          backgroundColor: "#9932CC",
          fill: false
          
        },{ 
          data: caData,
          label: "Canada",
          borderColor: "#FFB6C1",
          backgroundColor: "#FFB6C1",
          fill: false
          
        },
      ]
    },
    options: {
      title: {
        display: true,
        text: 'International Student Enrollment'
      },
      scales: {
        yAxes: [
          {ticks: {
            min: 0,
            callback: dl.format.number(",") // if it was a $ you'd use dl.format.number("$,") 
          }
        }
      ]},
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => dl.format.number(",")(tooltipItem.yLabel) // if it was a $ you'd use dl.format.number("$,")(tooltipItem.yLabel) 
        }
      }
    }
  }


  let lineCtx = document.getElementById('lineChart')
  let lineChart = new Chart(lineCtx, lineChartConfig)

  let barChartConfig = {
    type: 'bar',
    data: {
      labels: data2018.map(row => row.state),
      datasets: [{ 
        data: data2014.map(row => row.population),
        label: "2014",
        borderColor: "#3e95cd",
        backgroundColor: "#3e95cd",
        fill: false
      },
        { 
        data: data2015.map(row => row.population),
        label: "2015",
        borderColor: "3cba9f",
        backgroundColor: "#3cba9f",
        fill: false
      },
      { 
        data: data2016.map(row => row.population),
        label: "2016",
        borderColor: "#8e5ea2",
        backgroundColor: "#0051ba",
        fill: false
      },
      {
        data: data2017.map(row => row.population),
        label: "2017",
        borderColor: "#32CD32",
        backgroundColor:  "#32CD32",
        fill: false
      },
      {
        data: data2018.map(row => row.population),
        label: "2018",
        borderColor: "#9932CC",
        backgroundColor:  "#9932CC",
        fill: false
      },
    ]},
    options: {
      title: {
        display: true,
        text: 'International Student Enrollment'
      },
      scales: {yAxes: [
        { ticks: {
            min: 0,
            callback: dl.format.number(",") // if it was a $ you'd use dl.format.number("$,") 
          }
        }
      ]},
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => dl.format.number(",")(tooltipItem.yLabel) // if it was a $ you'd use dl.format.number("$,")(tooltipItem.yLabel) 
        }
      }
    }
  }

  let barCtx = document.getElementById('barChart')
  let barChart = new Chart(barCtx, barChartConfig)



  // make the leaflet map
  let myMap = L.map('map').setView([22.6129241,-18.3123565], 1);

  // requires a mapbox account. see mapbox.com
  let mapboxLayer =   L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibGF0aHJvcGQiLCJhIjoiY2p2MnVnZHN3MWQ2bjRlbW5hZ2Uya3RybCJ9.z467PnsR1dCqYsPeZKmHVg'
  })

  // find more like this at https://leaflet-extras.github.io/leaflet-providers/preview/
  let watercolorLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
  })

  let terrainLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
  })

  let tonerLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  })

  tonerLayer.addTo(myMap)


  let colors = {
    India: "#FFCD00",
    China: "#D00000",
    Korea: "#0051ba",
    Iran: "#32CD32",
    Malaysia: "#9932CC",
    Canada: "#FFB6C1",
  }

  function makeMarkers(row) {
    console.log(row)
    let options = {
      radius: Math.sqrt(row.population)/0.5,
      color: colors[row.state]
  }
    let marker = L.circleMarker([row.lat, row.lng], options)
      .bindPopup(row.state + " (" + row.year + ")<br>Students: " + dl.format.number(",")(row.population))
    return marker
  }

  let points2014 = data2014.map(makeMarkers)
  let points2015 = data2015.map(makeMarkers)
  let points2016 = data2016.map(makeMarkers)
  let points2017 = data2017.map(makeMarkers)
  let points2018 = data2018.map(makeMarkers)
  
  console.log(points2014)
  let layer2014 = L.layerGroup(points2014)
  let layer2015 = L.layerGroup(points2015)
  let layer2016 = L.layerGroup(points2016)
  let layer2017 = L.layerGroup(points2017)
  let layer2018 = L.layerGroup(points2018)
  let groupControl = L.control.layers(null, null, {collapsed: false})
    .addBaseLayer(layer2014, "2014")
    .addBaseLayer(layer2015, "2015")
    .addBaseLayer(layer2016, "2016")
    .addBaseLayer(layer2017, "2017")
    .addBaseLayer(layer2018, "2018")
    .addTo(myMap)
    layer2016.addTo(myMap)
    groupControl.expand()


  console.log(layer2014, layer2015, layer2016, layer2017, layer2018)

  //   document.getElementById("button-2016").onclick =  (e) => {
  //     console.log("FF")
  //     layer2016.remove()
  //     layer2017.remove()
  //     layer2018.remove()
  //     layer2016.addTo(myMap)
  //     document.getElementById("button-2016").className = "selected"
  //     document.getElementById("button-2017").className = ""
  //     document.getElementById("button-2018").className = ""
  //     return false
  //   }

  //   document.getElementById("button-2017").onclick = (e) => {
  //     console.log(1)
  //     layer2016.remove()
  //     layer2017.remove()
  //     layer2018.remove()
  //     layer2017.addTo(myMap)
  //     document.getElementById("button-2016").className = ""
  //     document.getElementById("button-2017").className = "selected"
  //     document.getElementById("button-2018").className = ""
  //     return false
  //   }

  //   document.getElementById("button-2018").onclick = (e) => {
  //     layer2016.remove()
  //     layer2017.remove()
  //     layer2018.remove()
  //     layer2018.addTo(myMap)
  //     document.getElementById("button-2016").className = ""
  //     document.getElementById("button-2017").className = ""
  //     document.getElementById("button-2018").className = "selected"
  //     return false
  //   }

