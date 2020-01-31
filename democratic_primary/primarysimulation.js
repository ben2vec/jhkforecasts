var category = ["Biden", "Bloomberg", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
// since Category B and E are really close to each other, assign them diverging colors
var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00FF90", "#00B050", "#98d2f8", "#0077FF", "#002E66", "#E7B5FF", "#B722FF", "purple"])



var formatValue = d3.format(".2");



var parseTime = d3.timeParse("%Y-%m-%d")
formatDate = d3.timeFormat("%b - %d");

d3.csv("simulator.csv", function (data) {

  

  var data = data.map((d, i) => {
    return {
      state: d.state,
      date: parseTime(d.date),
      delegates: +d.delegates,
      Bidenproj: +d.Bidenproj,
      Bloombergproj: +d.Bloombergproj,
      Buttigiegproj: +d.Buttigiegproj,
      Klobucharproj: +d.Klobucharproj,
      Sandersproj: +d.Sandersproj,
      Steyerproj: +d.Steyerproj,
      Warrenproj: +d.Warrenproj,
      Yangproj: +d.Yangproj,
    }
  })

  var Bidensimulation = Math.random()
  Bloombergsimulation = Math.random()
  Buttigiegsimulation = Math.random()
  Klobucharsimulation = Math.random()
  Sanderssimulation = Math.random()
  Steyersimulation = Math.random()
  Warrensimulation = Math.random()
  Yangsimulation = Math.random()
  BidenUS = data[57].Bidenproj
  BloombergUS = data[57].Bloombergproj
  ButtigiegUS = data[57].Buttigeigproj
  KlobucharUS = data[57].Klobucharproj
  SandersUS = data[57].Sandersproj
  SteyerUS = data[57].Steyerproj
  WarrenUS = data[57].Warrenproj
  YangUS = data[57].Yangproj
  Bidenbump = 0
  Bloombergbump = 0
  Buttigiegbump = 0
  Klobucharbump = 0
  Sandersbump = 0
  Steyerbump = 0
  Warrenbump = 0
  Yangbump = 0

  console.log(BidenUS)
  console.log(Bidenbump)
  console.log(Bloombergbump)
  var data = data.map((d, i) => {

    d.state = d.state
    d.date = d.date
    d.delegates = d.delegates
    d.Bidenproj = d.Bidenproj + Bidenbump < 0 ? 0 : d.Bidenproj + Bidenbump
    d.Bloombergproj = d.Bloombergproj + Bloombergbump < 0 ? 0 : d.Bloombergproj + Bloombergbump
    d.Buttigiegproj = d.Buttigiegproj + Buttigiegbump < 0 ? 0 : d.Buttigiegproj + Buttigiegbump
    d.Klobucharproj = d.Klobucharproj + Klobucharbump < 0 ? 0 : d.Klobucharproj + Klobucharbump
    d.Sandersproj = d.Sandersproj + Sandersbump < 0 ? 0 : d.Sandersproj + Sandersbump
    d.Steyerproj = d.Steyerproj + Steyerbump < 0 ? 0 : d.Steyerproj + Steyerbump
    d.Warrenproj = d.Warrenproj + Warrenbump < 0 ? 0 : d.Warrenproj + Warrenbump
    d.Yangproj = d.Yangproj + Yangbump < 0 ? 0 : d.Yangproj + Yangbump
    return d;
  })
  console.log(data)
  //IA & NH
  var firstSection = data.slice(0, 2)

  var firstSection = firstSection.map((d, i) => {
    d.Bidenstd = Math.pow(d.Bidenproj,.8)
    d.Bloombergstd = Math.pow(d.Bloombergproj,.8)
    d.Buttigiegstd = Math.pow(d.Buttigiegproj,.8)
    d.Klobucharstd = Math.pow(d.Klobucharproj,.8)
    d.Sandersstd = Math.pow(d.Sandersproj,.8)
    d.Steyerstd = Math.pow(d.Steyerproj,.8)
    d.Warrenstd = Math.pow(d.Warrenproj,.8)
    d.Yangstd = Math.pow(d.Yangproj,.8)
    d.Bidenvoteraw = jStat.normal.inv((Bidensimulation * 3 + Math.random()) / 4, d.Bidenproj, d.Bidenstd);
    d.Bloombergvoteraw = jStat.normal.inv((Bloombergsimulation * 3 + Math.random()) / 4, d.Bloombergproj, d.Bloombergstd);
    d.Buttigiegvoteraw = jStat.normal.inv((Buttigiegsimulation * 3 + Math.random()) / 4, d.Buttigiegproj, d.Buttigiegstd);
    d.Klobucharvoteraw = jStat.normal.inv((Klobucharsimulation * 3 + Math.random()) / 4, d.Klobucharproj, d.Klobucharstd);
    d.Sandersvoteraw = jStat.normal.inv((Sanderssimulation * 3 + Math.random()) / 4, d.Sandersproj, d.Sandersstd);
    d.Steyervoteraw = jStat.normal.inv((Steyersimulation * 3 + Math.random()) / 4, d.Steyerproj, d.Steyerstd);
    d.Warrenvoteraw = jStat.normal.inv((Warrensimulation * 3 + Math.random()) / 4, d.Warrenproj, d.Warrenstd);
    d.Yangvoteraw = jStat.normal.inv((Yangsimulation * 3 + Math.random()) / 4, d.Yangproj, d.Yangstd);
    d.Bidenvoteraw = d.Bidenvoteraw > 0 ? d.Bidenvoteraw : 0;
    d.Bloombergvoteraw = d.Bloombergvoteraw > 0 ? d.Bloombergvoteraw : 0;
    d.Buttigiegvoteraw = d.Buttigiegvoteraw > 0 ? d.Buttigiegvoteraw : 0;
    d.Klobucharvoteraw = d.Klobucharvoteraw > 0 ? d.Klobucharvoteraw : 0;
    d.Sandersvoteraw = d.Sandersvoteraw > 0 ? d.Sandersvoteraw : 0;
    d.Steyervoteraw = d.Steyervoteraw > 0 ? d.Steyervoteraw : 0;
    d.Warrenvoteraw = d.Warrenvoteraw > 0 ? d.Warrenvoteraw : 0;
    d.Yangvoteraw = d.Yangvoteraw > 0 ? d.Yangvoteraw : 0;
    d.sumvoteraw = d.Bidenvoteraw + d.Bloombergvoteraw + d.Buttigiegvoteraw + d.Klobucharvoteraw + d.Sandersvoteraw + d.Steyervoteraw + d.Warrenvoteraw + d.Yangvoteraw
    d.candsabove0 = (d.Bidenvoteraw > 0 ? 1 : 0) + (d.Bloombergvoteraw > 0 ? 1 : 0) + (d.Buttigiegvoteraw > 0 ? 1 : 0) + (d.Klobucharvoteraw > 0 ? 1 : 0) + (d.Sandersvoteraw > 0 ? 1 : 0) + (d.Steyervoteraw > 0 ? 1 : 0) + (d.Warrenvoteraw > 0 ? 1 : 0) + (d.Yangvoteraw > 0 ? 1 : 0)
    d.sumdistribute = (100 - d.sumvoteraw) / 2
    d.distributeper = d.sumdistribute / d.candsabove0
    d.Bidenvote = d.Bidenvoteraw == 0 ? 0 : d.Bidenvoteraw + d.distributeper + ((d.Bidenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Bloombergvote = d.Bloombergvoteraw == 0 ? 0 : d.Bloombergvoteraw + d.distributeper + ((d.Bloombergvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Buttigiegvote = d.Buttigiegvoteraw == 0 ? 0 : d.Buttigiegvoteraw + d.distributeper + ((d.Buttigiegvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Klobucharvote = d.Klobucharvoteraw == 0 ? 0 : d.Klobucharvoteraw + d.distributeper + ((d.Klobucharvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Sandersvote = d.Sandersvoteraw == 0 ? 0 : d.Sandersvoteraw + d.distributeper + ((d.Sandersvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Steyervote = d.Steyervoteraw == 0 ? 0 : d.Steyervoteraw + d.distributeper + ((d.Steyervoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Warrenvote = d.Warrenvoteraw == 0 ? 0 : d.Warrenvoteraw + d.distributeper + ((d.Warrenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Yangvote = d.Yangvoteraw == 0 ? 0 : d.Yangvoteraw + d.distributeper + ((d.Yangvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.sum = d.Bidenvote + d.Bloombergvote + d.Buttigiegvote + d.Klobucharvote + d.Sandersvote + d.Steyervote + d.Warrenvote + d.Yangvoteraw
    d.Bidenov15 = d.Bidenvote > 15 ? d.Bidenvote : 0
    d.Bloombergov15 = d.Bloombergvote > 15 ? d.Bloombergvote : 0
    d.Buttigiegov15 = d.Buttigiegvote > 15 ? d.Buttigiegvote : 0
    d.Klobucharov15 = d.Klobucharvote > 15 ? d.Klobucharvote : 0
    d.Sandersov15 = d.Sandersvote > 15 ? d.Sandersvote : 0
    d.Steyerov15 = d.Steyervote > 15 ? d.Steyervote : 0
    d.Warrenov15 = d.Warrenvote > 15 ? d.Warrenvote : 0
    d.Yangov15 = d.Yangvote > 15 ? d.Yangvote : 0
    d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
    d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Bidenvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloombergvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigiegvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobucharvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sandersvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyervote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warrenvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yangvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
    d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
    d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
    d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
    d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
    d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
    d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
    d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
    d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
    d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
    d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
    d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
    d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
    d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
    d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
    d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
    d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15
    return d;
  })

  var firstSectionResults = [{ Candidate: "Biden", Delegates: d3.sum(firstSection, d => d.Bidendelegates) },
  { Candidate: "Bloomberg", Delegates: d3.sum(firstSection, d => d.Bloombergdelegates) },
  { Candidate: "Buttigieg", Delegates: d3.sum(firstSection, d => d.Buttigiegdelegates) },
  { Candidate: "Klobuchar", Delegates: d3.sum(firstSection, d => d.Klobuchardelegates) },
  { Candidate: "Sanders", Delegates: d3.sum(firstSection, d => d.Sandersdelegates) },
  { Candidate: "Steyer", Delegates: d3.sum(firstSection, d => d.Steyerdelegates) },
  { Candidate: "Warren", Delegates: d3.sum(firstSection, d => d.Warrendelegates) },
  { Candidate: "Yang", Delegates: d3.sum(firstSection, d => d.Yangdelegates) },
  ]

  firstSectionResults.forEach(function (d) {
    d.dropOut = d.Delegates == 0 ? Math.random() < .4 ? 1 : 0 : 0;
    return d;
  })
  firstSectionResults[1].dropOut = 0
  //NV-Super Tuesday

  var secondSection = data.slice(2, 20)


  var secondSection = secondSection.map((d, i) => {
    d.Bidenstd = Math.pow(d.Bidenproj,.8)
    d.Bloombergstd = Math.pow(d.Bloombergproj,.8)
    d.Buttigiegstd = Math.pow(d.Buttigiegproj,.8)
    d.Klobucharstd = Math.pow(d.Klobucharproj,.8)
    d.Sandersstd = Math.pow(d.Sandersproj,.8)
    d.Steyerstd = Math.pow(d.Steyerproj,.8)
    d.Warrenstd = Math.pow(d.Warrenproj,.8)
    d.Yangstd = Math.pow(d.Yangproj,.8)
    d.Bidenvoteraw = firstSectionResults[0].dropOut == 1 ? 0 : jStat.normal.inv((Bidensimulation * 3 + Math.random()) / 4, d.Bidenproj, d.Bidenstd);
    d.Bloombergvoteraw = jStat.normal.inv((Bloombergsimulation * 3 + Math.random()) / 4, d.Bloombergproj, d.Bloombergstd);
    d.Buttigiegvoteraw = firstSectionResults[2].dropOut == 1 ? 0 : jStat.normal.inv((Buttigiegsimulation * 3 + Math.random()) / 4, d.Buttigiegproj, d.Buttigiegstd);
    d.Klobucharvoteraw = firstSectionResults[3].dropOut == 1 ? 0 : jStat.normal.inv((Klobucharsimulation * 3 + Math.random()) / 4, d.Klobucharproj, d.Klobucharstd);
    d.Sandersvoteraw = firstSectionResults[4].dropOut == 1 ? 0 : jStat.normal.inv((Sanderssimulation * 3 + Math.random()) / 4, d.Sandersproj, d.Sandersstd);
    d.Steyervoteraw = firstSectionResults[5].dropOut == 1 ? 0 : jStat.normal.inv((Steyersimulation * 3 + Math.random()) / 4, d.Steyerproj, d.Steyerstd);
    d.Warrenvoteraw = firstSectionResults[6].dropOut == 1 ? 0 : jStat.normal.inv((Warrensimulation * 3 + Math.random()) / 4, d.Warrenproj, d.Warrenstd);
    d.Yangvoteraw = firstSectionResults[7].dropOut == 1 ? 0 : jStat.normal.inv((Yangsimulation * 3 + Math.random()) / 4, d.Yangproj, d.Yangstd);
    d.Bidenvoteraw = d.Bidenvoteraw > 0 ? d.Bidenvoteraw : 0;
    d.Bloombergvoteraw = d.Bloombergvoteraw > 0 ? d.Bloombergvoteraw : 0;
    d.Buttigiegvoteraw = d.Buttigiegvoteraw > 0 ? d.Buttigiegvoteraw : 0;
    d.Klobucharvoteraw = d.Klobucharvoteraw > 0 ? d.Klobucharvoteraw : 0;
    d.Sandersvoteraw = d.Sandersvoteraw > 0 ? d.Sandersvoteraw : 0;
    d.Steyervoteraw = d.Steyervoteraw > 0 ? d.Steyervoteraw : 0;
    d.Warrenvoteraw = d.Warrenvoteraw > 0 ? d.Warrenvoteraw : 0;
    d.Yangvoteraw = d.Yangvoteraw > 0 ? d.Yangvoteraw : 0;
    d.sumvoteraw = d.Bidenvoteraw + d.Bloombergvoteraw + d.Buttigiegvoteraw + d.Klobucharvoteraw + d.Sandersvoteraw + d.Steyervoteraw + d.Warrenvoteraw + d.Yangvoteraw
    d.candsabove0 = (d.Bidenvoteraw > 0 ? 1 : 0) + (d.Bloombergvoteraw > 0 ? 1 : 0) + (d.Buttigiegvoteraw > 0 ? 1 : 0) + (d.Klobucharvoteraw > 0 ? 1 : 0) + (d.Sandersvoteraw > 0 ? 1 : 0) + (d.Steyervoteraw > 0 ? 1 : 0) + (d.Warrenvoteraw > 0 ? 1 : 0) + (d.Yangvoteraw > 0 ? 1 : 0)
    d.sumdistribute = (100 - d.sumvoteraw) / 2
    d.distributeper = d.sumdistribute / d.candsabove0
    d.Bidenvote = d.Bidenvoteraw == 0 ? 0 : d.Bidenvoteraw + d.distributeper + ((d.Bidenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Bloombergvote = d.Bloombergvoteraw == 0 ? 0 : d.Bloombergvoteraw + d.distributeper + ((d.Bloombergvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Buttigiegvote = d.Buttigiegvoteraw == 0 ? 0 : d.Buttigiegvoteraw + d.distributeper + ((d.Buttigiegvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Klobucharvote = d.Klobucharvoteraw == 0 ? 0 : d.Klobucharvoteraw + d.distributeper + ((d.Klobucharvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Sandersvote = d.Sandersvoteraw == 0 ? 0 : d.Sandersvoteraw + d.distributeper + ((d.Sandersvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Steyervote = d.Steyervoteraw == 0 ? 0 : d.Steyervoteraw + d.distributeper + ((d.Steyervoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Warrenvote = d.Warrenvoteraw == 0 ? 0 : d.Warrenvoteraw + d.distributeper + ((d.Warrenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Yangvote = d.Yangvoteraw == 0 ? 0 : d.Yangvoteraw + d.distributeper + ((d.Yangvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Bidenov15 = d.Bidenvote > 15 ? d.Bidenvote : 0
    d.Bloombergov15 = d.Bloombergvote > 15 ? d.Bloombergvote : 0
    d.Buttigiegov15 = d.Buttigiegvote > 15 ? d.Buttigiegvote : 0
    d.Klobucharov15 = d.Klobucharvote > 15 ? d.Klobucharvote : 0
    d.Sandersov15 = d.Sandersvote > 15 ? d.Sandersvote : 0
    d.Steyerov15 = d.Steyervote > 15 ? d.Steyervote : 0
    d.Warrenov15 = d.Warrenvote > 15 ? d.Warrenvote : 0
    d.Yangov15 = d.Yangvote > 15 ? d.Yangvote : 0
    d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
    d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Bidenvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloombergvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigiegvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobucharvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sandersvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyervote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warrenvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yangvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
    d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
    d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
    d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
    d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
    d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
    d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
    d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
    d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
    d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
    d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
    d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
    d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
    d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
    d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
    d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
    d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15

    return d;
  })

  var secondSectionResults = [{ Candidate: "Biden", Delegates: d3.sum(secondSection, d => d.Bidendelegates), dropOut: firstSectionResults[0] },
  { Candidate: "Bloomberg", Delegates: d3.sum(secondSection, d => d.Bloombergdelegates), dropOut: 0 },
  { Candidate: "Buttigieg", Delegates: d3.sum(secondSection, d => d.Buttigiegdelegates), dropOut: firstSectionResults[2] },
  { Candidate: "Klobuchar", Delegates: d3.sum(secondSection, d => d.Klobuchardelegates), dropOut: firstSectionResults[3] },
  { Candidate: "Sanders", Delegates: d3.sum(secondSection, d => d.Sandersdelegates), dropOut: firstSectionResults[4] },
  { Candidate: "Steyer", Delegates: d3.sum(secondSection, d => d.Steyerdelegates), dropOut: firstSectionResults[5] },
  { Candidate: "Warren", Delegates: d3.sum(secondSection, d => d.Warrendelegates), dropOut: firstSectionResults[6] },
  { Candidate: "Yang", Delegates: d3.sum(secondSection, d => d.Yangdelegates), dropOut: firstSectionResults[7] },
  ]

  secondSectionResults.forEach(function (d) {
    d.dropOut = d.dropOut == 1 ? 1 : d.Delegates == 0 ? 1 : d.Delegates < 100 ? Math.random() < .50 ? 1 : 0 : 0;
    return d;
  })
  secondSectionResults[1].dropOut = 0
  //mar. 10 & mar. 17

  var thirdSection = data.slice(20, 30)


  var thirdSection = thirdSection.map((d, i) => {
    d.Bidenstd = Math.pow(d.Bidenproj,.8)
    d.Bloombergstd = Math.pow(d.Bloombergproj,.8)
    d.Buttigiegstd = Math.pow(d.Buttigiegproj,.8)
    d.Klobucharstd = Math.pow(d.Klobucharproj,.8)
    d.Sandersstd = Math.pow(d.Sandersproj,.8)
    d.Steyerstd = Math.pow(d.Steyerproj,.8)
    d.Warrenstd = Math.pow(d.Warrenproj,.8)
    d.Yangstd = Math.pow(d.Yangproj,.8)
    d.Bidenvoteraw = secondSectionResults[0].dropOut == 1 ? 0 : jStat.normal.inv((Bidensimulation * 3 + Math.random()) / 4, d.Bidenproj, d.Bidenstd);
    d.Bloombergvoteraw = secondSectionResults[1].dropOut == 1 ? 0 :jStat.normal.inv((Bloombergsimulation * 3 + Math.random()) / 4, d.Bloombergproj, d.Bloombergstd);
    d.Buttigiegvoteraw = secondSectionResults[2].dropOut == 1 ? 0 : jStat.normal.inv((Buttigiegsimulation * 3 + Math.random()) / 4, d.Buttigiegproj, d.Buttigiegstd);
    d.Klobucharvoteraw = secondSectionResults[3].dropOut == 1 ? 0 : jStat.normal.inv((Klobucharsimulation * 3 + Math.random()) / 4, d.Klobucharproj, d.Klobucharstd);
    d.Sandersvoteraw = secondSectionResults[4].dropOut == 1 ? 0 : jStat.normal.inv((Sanderssimulation * 3 + Math.random()) / 4, d.Sandersproj, d.Sandersstd);
    d.Steyervoteraw = secondSectionResults[5].dropOut == 1 ? 0 : jStat.normal.inv((Steyersimulation * 3 + Math.random()) / 4, d.Steyerproj, d.Steyerstd);
    d.Warrenvoteraw = secondSectionResults[6].dropOut == 1 ? 0 : jStat.normal.inv((Warrensimulation * 3 + Math.random()) / 4, d.Warrenproj, d.Warrenstd);
    d.Yangvoteraw = secondSectionResults[7].dropOut == 1 ? 0 : jStat.normal.inv((Yangsimulation * 3 + Math.random()) / 4, d.Yangproj, d.Yangstd);
    d.Bidenvoteraw = d.Bidenvoteraw > 0 ? d.Bidenvoteraw : 0;
    d.Bloombergvoteraw = d.Bloombergvoteraw > 0 ? d.Bloombergvoteraw : 0;
    d.Buttigiegvoteraw = d.Buttigiegvoteraw > 0 ? d.Buttigiegvoteraw : 0;
    d.Klobucharvoteraw = d.Klobucharvoteraw > 0 ? d.Klobucharvoteraw : 0;
    d.Sandersvoteraw = d.Sandersvoteraw > 0 ? d.Sandersvoteraw : 0;
    d.Steyervoteraw = d.Steyervoteraw > 0 ? d.Steyervoteraw : 0;
    d.Warrenvoteraw = d.Warrenvoteraw > 0 ? d.Warrenvoteraw : 0;
    d.Yangvoteraw = d.Yangvoteraw > 0 ? d.Yangvoteraw : 0;
    d.sumvoteraw = d.Bidenvoteraw + d.Bloombergvoteraw + d.Buttigiegvoteraw + d.Klobucharvoteraw + d.Sandersvoteraw + d.Steyervoteraw + d.Warrenvoteraw + d.Yangvoteraw
    d.candsabove0 = (d.Bidenvoteraw > 0 ? 1 : 0) + (d.Bloombergvoteraw > 0 ? 1 : 0) + (d.Buttigiegvoteraw > 0 ? 1 : 0) + (d.Klobucharvoteraw > 0 ? 1 : 0) + (d.Sandersvoteraw > 0 ? 1 : 0) + (d.Steyervoteraw > 0 ? 1 : 0) + (d.Warrenvoteraw > 0 ? 1 : 0) + (d.Yangvoteraw > 0 ? 1 : 0)
    d.sumdistribute = (100 - d.sumvoteraw) / 2
    d.distributeper = d.sumdistribute / d.candsabove0
    d.Bidenvote = d.Bidenvoteraw == 0 ? 0 : d.Bidenvoteraw + d.distributeper + ((d.Bidenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Bloombergvote = d.Bloombergvoteraw == 0 ? 0 : d.Bloombergvoteraw + d.distributeper + ((d.Bloombergvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Buttigiegvote = d.Buttigiegvoteraw == 0 ? 0 : d.Buttigiegvoteraw + d.distributeper + ((d.Buttigiegvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Klobucharvote = d.Klobucharvoteraw == 0 ? 0 : d.Klobucharvoteraw + d.distributeper + ((d.Klobucharvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Sandersvote = d.Sandersvoteraw == 0 ? 0 : d.Sandersvoteraw + d.distributeper + ((d.Sandersvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Steyervote = d.Steyervoteraw == 0 ? 0 : d.Steyervoteraw + d.distributeper + ((d.Steyervoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Warrenvote = d.Warrenvoteraw == 0 ? 0 : d.Warrenvoteraw + d.distributeper + ((d.Warrenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Yangvote = d.Yangvoteraw == 0 ? 0 : d.Yangvoteraw + d.distributeper + ((d.Yangvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Bidenov15 = d.Bidenvote > 15 ? d.Bidenvote : 0
    d.Bloombergov15 = d.Bloombergvote > 15 ? d.Bloombergvote : 0
    d.Buttigiegov15 = d.Buttigiegvote > 15 ? d.Buttigiegvote : 0
    d.Klobucharov15 = d.Klobucharvote > 15 ? d.Klobucharvote : 0
    d.Sandersov15 = d.Sandersvote > 15 ? d.Sandersvote : 0
    d.Steyerov15 = d.Steyervote > 15 ? d.Steyervote : 0
    d.Warrenov15 = d.Warrenvote > 15 ? d.Warrenvote : 0
    d.Yangov15 = d.Yangvote > 15 ? d.Yangvote : 0
    d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
    d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Bidenvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloombergvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigiegvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobucharvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sandersvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyervote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warrenvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yangvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
    d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
    d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
    d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
    d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
    d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
    d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
    d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
    d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
    d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
    d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
    d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
    d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
    d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
    d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
    d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
    d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15

    return d;
  })

  var thirdSectionResults = [{ Candidate: "Biden", Delegates: d3.sum(thirdSection, d => d.Bidendelegates), dropOut: secondSectionResults[0] },
  { Candidate: "Bloomberg", Delegates: d3.sum(thirdSection, d => d.Bloombergdelegates), dropOut: 0 },
  { Candidate: "Buttigieg", Delegates: d3.sum(thirdSection, d => d.Buttigiegdelegates), dropOut: secondSectionResults[2] },
  { Candidate: "Klobuchar", Delegates: d3.sum(thirdSection, d => d.Klobuchardelegates), dropOut: secondSectionResults[3] },
  { Candidate: "Sanders", Delegates: d3.sum(thirdSection, d => d.Sandersdelegates), dropOut: secondSectionResults[4] },
  { Candidate: "Steyer", Delegates: d3.sum(thirdSection, d => d.Steyerdelegates), dropOut: secondSectionResults[5] },
  { Candidate: "Warren", Delegates: d3.sum(thirdSection, d => d.Warrendelegates), dropOut: secondSectionResults[6] },
  { Candidate: "Yang", Delegates: d3.sum(thirdSection, d => d.Yangdelegates), dropOut: secondSectionResults[7] },
  ]

  thirdSectionResults.forEach(function (d) {
    d.dropOut = d.dropOut == 1 ? 1 : d.Delegates == 0 ? 1 : d.Delegates < 300 ? Math.random() < 100 ? 1 : 0 : 0;
    return d;
  })
  thirdSectionResults[1].dropOut = 0
  //mar. 18 - Apr. 28

  var fourthSection = data.slice(30, 44)


  var fourthSection = fourthSection.map((d, i) => {
    d.Bidenstd = Math.pow(d.Bidenproj,.8)
    d.Bloombergstd = Math.pow(d.Bloombergproj,.8)
    d.Buttigiegstd = Math.pow(d.Buttigiegproj,.8)
    d.Klobucharstd = Math.pow(d.Klobucharproj,.8)
    d.Sandersstd = Math.pow(d.Sandersproj,.8)
    d.Steyerstd = Math.pow(d.Steyerproj,.8)
    d.Warrenstd = Math.pow(d.Warrenproj,.8)
    d.Yangstd = Math.pow(d.Yangproj,.8)
    d.Bidenvoteraw = thirdSectionResults[0].dropOut == 1 ? 0 : jStat.normal.inv((Bidensimulation * 3 + Math.random()) / 4, d.Bidenproj, d.Bidenstd);
    d.Bloombergvoteraw = thirdSectionResults[1].dropOut == 1 ? 0 : jStat.normal.inv((Bloombergsimulation * 3 + Math.random()) / 4, d.Bloombergproj, d.Bloombergstd);
    d.Buttigiegvoteraw = thirdSectionResults[2].dropOut == 1 ? 0 : jStat.normal.inv((Buttigiegsimulation * 3 + Math.random()) / 4, d.Buttigiegproj, d.Buttigiegstd);
    d.Klobucharvoteraw = thirdSectionResults[3].dropOut == 1 ? 0 : jStat.normal.inv((Klobucharsimulation * 3 + Math.random()) / 4, d.Klobucharproj, d.Klobucharstd);
    d.Sandersvoteraw = thirdSectionResults[4].dropOut == 1 ? 0 : jStat.normal.inv((Sanderssimulation * 3 + Math.random()) / 4, d.Sandersproj, d.Sandersstd);
    d.Steyervoteraw = thirdSectionResults[5].dropOut == 1 ? 0 : jStat.normal.inv((Steyersimulation * 3 + Math.random()) / 4, d.Steyerproj, d.Steyerstd);
    d.Warrenvoteraw = thirdSectionResults[6].dropOut == 1 ? 0 : jStat.normal.inv((Warrensimulation * 3 + Math.random()) / 4, d.Warrenproj, d.Warrenstd);
    d.Yangvoteraw = thirdSectionResults[7].dropOut == 1 ? 0 : jStat.normal.inv((Yangsimulation * 3 + Math.random()) / 4, d.Yangproj, d.Yangstd);
    d.Bidenvoteraw = d.Bidenvoteraw > 0 ? d.Bidenvoteraw : 0;
    d.Bloombergvoteraw = d.Bloombergvoteraw > 0 ? d.Bloombergvoteraw : 0;
    d.Buttigiegvoteraw = d.Buttigiegvoteraw > 0 ? d.Buttigiegvoteraw : 0;
    d.Klobucharvoteraw = d.Klobucharvoteraw > 0 ? d.Klobucharvoteraw : 0;
    d.Sandersvoteraw = d.Sandersvoteraw > 0 ? d.Sandersvoteraw : 0;
    d.Steyervoteraw = d.Steyervoteraw > 0 ? d.Steyervoteraw : 0;
    d.Warrenvoteraw = d.Warrenvoteraw > 0 ? d.Warrenvoteraw : 0;
    d.Yangvoteraw = d.Yangvoteraw > 0 ? d.Yangvoteraw : 0;
    d.sumvoteraw = d.Bidenvoteraw + d.Bloombergvoteraw + d.Buttigiegvoteraw + d.Klobucharvoteraw + d.Sandersvoteraw + d.Steyervoteraw + d.Warrenvoteraw + d.Yangvoteraw
    d.candsabove0 = (d.Bidenvoteraw > 0 ? 1 : 0) + (d.Bloombergvoteraw > 0 ? 1 : 0) + (d.Buttigiegvoteraw > 0 ? 1 : 0) + (d.Klobucharvoteraw > 0 ? 1 : 0) + (d.Sandersvoteraw > 0 ? 1 : 0) + (d.Steyervoteraw > 0 ? 1 : 0) + (d.Warrenvoteraw > 0 ? 1 : 0) + (d.Yangvoteraw > 0 ? 1 : 0)
    d.sumdistribute = (100 - d.sumvoteraw) / 2
    d.distributeper = d.sumdistribute / d.candsabove0
    d.Bidenvote = d.Bidenvoteraw == 0 ? 0 : d.Bidenvoteraw + d.distributeper + ((d.Bidenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Bloombergvote = d.Bloombergvoteraw == 0 ? 0 : d.Bloombergvoteraw + d.distributeper + ((d.Bloombergvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Buttigiegvote = d.Buttigiegvoteraw == 0 ? 0 : d.Buttigiegvoteraw + d.distributeper + ((d.Buttigiegvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Klobucharvote = d.Klobucharvoteraw == 0 ? 0 : d.Klobucharvoteraw + d.distributeper + ((d.Klobucharvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Sandersvote = d.Sandersvoteraw == 0 ? 0 : d.Sandersvoteraw + d.distributeper + ((d.Sandersvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Steyervote = d.Steyervoteraw == 0 ? 0 : d.Steyervoteraw + d.distributeper + ((d.Steyervoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Warrenvote = d.Warrenvoteraw == 0 ? 0 : d.Warrenvoteraw + d.distributeper + ((d.Warrenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Yangvote = d.Yangvoteraw == 0 ? 0 : d.Yangvoteraw + d.distributeper + ((d.Yangvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Bidenov15 = d.Bidenvote > 15 ? d.Bidenvote : 0
    d.Bloombergov15 = d.Bloombergvote > 15 ? d.Bloombergvote : 0
    d.Buttigiegov15 = d.Buttigiegvote > 15 ? d.Buttigiegvote : 0
    d.Klobucharov15 = d.Klobucharvote > 15 ? d.Klobucharvote : 0
    d.Sandersov15 = d.Sandersvote > 15 ? d.Sandersvote : 0
    d.Steyerov15 = d.Steyervote > 15 ? d.Steyervote : 0
    d.Warrenov15 = d.Warrenvote > 15 ? d.Warrenvote : 0
    d.Yangov15 = d.Yangvote > 15 ? d.Yangvote : 0
    d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
    d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Bidenvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloombergvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigiegvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobucharvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sandersvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyervote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warrenvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yangvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
    d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
    d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
    d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
    d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
    d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
    d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
    d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
    d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
    d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
    d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
    d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
    d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
    d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
    d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
    d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
    d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15

    return d;
  })

  var fourthSectionResults = [{ Candidate: "Biden", Delegates: d3.sum(fourthSection, d => d.Bidendelegates), dropOut: thirdSectionResults[0] },
  { Candidate: "Bloomberg", Delegates: d3.sum(fourthSection, d => d.Bloombergdelegates), dropOut: 0 },
  { Candidate: "Buttigieg", Delegates: d3.sum(fourthSection, d => d.Buttigiegdelegates), dropOut: thirdSectionResults[2] },
  { Candidate: "Klobuchar", Delegates: d3.sum(fourthSection, d => d.Klobuchardelegates), dropOut: thirdSectionResults[3] },
  { Candidate: "Sanders", Delegates: d3.sum(fourthSection, d => d.Sandersdelegates), dropOut: thirdSectionResults[4] },
  { Candidate: "Steyer", Delegates: d3.sum(fourthSection, d => d.Steyerdelegates), dropOut: thirdSectionResults[5] },
  { Candidate: "Warren", Delegates: d3.sum(fourthSection, d => d.Warrendelegates), dropOut: thirdSectionResults[6] },
  { Candidate: "Yang", Delegates: d3.sum(fourthSection, d => d.Yangdelegates), dropOut: thirdSectionResults[7] },
  ]

  fourthSectionResults.forEach(function (d) {
    d.dropOut = d.dropOut == 1 ? 1 : d.Delegates == 0 ? 1 : d.Delegates < 500 ? Math.random() < 1 ? 1 : 0 : 0;
    return d;
  })

  //final

  var finalSection = data.slice(44, 57)


  var finalSection = finalSection.map((d, i) => {
    d.Bidenstd = Math.pow(d.Bidenproj,.8)
    d.Bloombergstd = Math.pow(d.Bloombergproj,.8)
    d.Buttigiegstd = Math.pow(d.Buttigiegproj,.8)
    d.Klobucharstd = Math.pow(d.Klobucharproj,.8)
    d.Sandersstd = Math.pow(d.Sandersproj,.8)
    d.Steyerstd = Math.pow(d.Steyerproj,.8)
    d.Warrenstd = Math.pow(d.Warrenproj,.8)
    d.Yangstd = Math.pow(d.Yangproj,.8)
    d.Bidenvoteraw = fourthSectionResults[0].dropOut == 1 ? 0 : jStat.normal.inv((Bidensimulation * 3 + Math.random()) / 4, d.Bidenproj, d.Bidenstd);
    d.Bloombergvoteraw = fourthSectionResults[1].dropOut == 1 ? 0 : jStat.normal.inv((Bloombergsimulation * 3 + Math.random()) / 4, d.Bloombergproj, d.Bloombergstd);
    d.Buttigiegvoteraw = fourthSectionResults[2].dropOut == 1 ? 0 : jStat.normal.inv((Buttigiegsimulation * 3 + Math.random()) / 4, d.Buttigiegproj, d.Buttigiegstd);
    d.Klobucharvoteraw = fourthSectionResults[3].dropOut == 1 ? 0 : jStat.normal.inv((Klobucharsimulation * 3 + Math.random()) / 4, d.Klobucharproj, d.Klobucharstd);
    d.Sandersvoteraw = fourthSectionResults[4].dropOut == 1 ? 0 : jStat.normal.inv((Sanderssimulation * 3 + Math.random()) / 4, d.Sandersproj, d.Sandersstd);
    d.Steyervoteraw = fourthSectionResults[5].dropOut == 1 ? 0 : jStat.normal.inv((Steyersimulation * 3 + Math.random()) / 4, d.Steyerproj, d.Steyerstd);
    d.Warrenvoteraw = fourthSectionResults[6].dropOut == 1 ? 0 : jStat.normal.inv((Warrensimulation * 3 + Math.random()) / 4, d.Warrenproj, d.Warrenstd);
    d.Yangvoteraw = fourthSectionResults[7].dropOut == 1 ? 0 : jStat.normal.inv((Yangsimulation * 3 + Math.random()) / 4, d.Yangproj, d.Yangstd);
    d.Bidenvoteraw = d.Bidenvoteraw > 0 ? d.Bidenvoteraw : 0;
    d.Bloombergvoteraw = d.Bloombergvoteraw > 0 ? d.Bloombergvoteraw : 0;
    d.Buttigiegvoteraw = d.Buttigiegvoteraw > 0 ? d.Buttigiegvoteraw : 0;
    d.Klobucharvoteraw = d.Klobucharvoteraw > 0 ? d.Klobucharvoteraw : 0;
    d.Sandersvoteraw = d.Sandersvoteraw > 0 ? d.Sandersvoteraw : 0;
    d.Steyervoteraw = d.Steyervoteraw > 0 ? d.Steyervoteraw : 0;
    d.Warrenvoteraw = d.Warrenvoteraw > 0 ? d.Warrenvoteraw : 0;
    d.Yangvoteraw = d.Yangvoteraw > 0 ? d.Yangvoteraw : 0;
    d.sumvoteraw = d.Bidenvoteraw + d.Bloombergvoteraw + d.Buttigiegvoteraw + d.Klobucharvoteraw + d.Sandersvoteraw + d.Steyervoteraw + d.Warrenvoteraw + d.Yangvoteraw
    d.candsabove0 = (d.Bidenvoteraw > 0 ? 1 : 0) + (d.Bloombergvoteraw > 0 ? 1 : 0) + (d.Buttigiegvoteraw > 0 ? 1 : 0) + (d.Klobucharvoteraw > 0 ? 1 : 0) + (d.Sandersvoteraw > 0 ? 1 : 0) + (d.Steyervoteraw > 0 ? 1 : 0) + (d.Warrenvoteraw > 0 ? 1 : 0) + (d.Yangvoteraw > 0 ? 1 : 0)
    d.sumdistribute = (100 - d.sumvoteraw) / 2
    d.distributeper = d.sumdistribute / d.candsabove0
    d.Bidenvote = d.Bidenvoteraw == 0 ? 0 : d.Bidenvoteraw + d.distributeper + ((d.Bidenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Bloombergvote = d.Bloombergvoteraw == 0 ? 0 : d.Bloombergvoteraw + d.distributeper + ((d.Bloombergvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Buttigiegvote = d.Buttigiegvoteraw == 0 ? 0 : d.Buttigiegvoteraw + d.distributeper + ((d.Buttigiegvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Klobucharvote = d.Klobucharvoteraw == 0 ? 0 : d.Klobucharvoteraw + d.distributeper + ((d.Klobucharvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Sandersvote = d.Sandersvoteraw == 0 ? 0 : d.Sandersvoteraw + d.distributeper + ((d.Sandersvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Steyervote = d.Steyervoteraw == 0 ? 0 : d.Steyervoteraw + d.distributeper + ((d.Steyervoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Warrenvote = d.Warrenvoteraw == 0 ? 0 : d.Warrenvoteraw + d.distributeper + ((d.Warrenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Yangvote = d.Yangvoteraw == 0 ? 0 : d.Yangvoteraw + d.distributeper + ((d.Yangvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
    d.Bidenov15 = d.Bidenvote > 15 ? d.Bidenvote : 0
    d.Bloombergov15 = d.Bloombergvote > 15 ? d.Bloombergvote : 0
    d.Buttigiegov15 = d.Buttigiegvote > 15 ? d.Buttigiegvote : 0
    d.Klobucharov15 = d.Klobucharvote > 15 ? d.Klobucharvote : 0
    d.Sandersov15 = d.Sandersvote > 15 ? d.Sandersvote : 0
    d.Steyerov15 = d.Steyervote > 15 ? d.Steyervote : 0
    d.Warrenov15 = d.Warrenvote > 15 ? d.Warrenvote : 0
    d.Yangov15 = d.Yangvote > 15 ? d.Yangvote : 0
    d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
    d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Bidenvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloombergvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigiegvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobucharvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sandersvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyervote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warrenvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yangvote / 100, 4) - 0.0006) * d.delegates) : 0;
    d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
    d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
    d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
    d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
    d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
    d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
    d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
    d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
    d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
    d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
    d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
    d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
    d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
    d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
    d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
    d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
    d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15

    return d;
  })

  var finalSectionResults = [{ Candidate: "Biden", Delegates: d3.sum(finalSection, d => d.Bidendelegates), dropOut: fourthSectionResults[0] },
  { Candidate: "Bloomberg", Delegates: d3.sum(finalSection, d => d.Bloombergdelegates), dropOut: 0 },
  { Candidate: "Buttigieg", Delegates: d3.sum(finalSection, d => d.Buttigiegdelegates), dropOut: fourthSectionResults[2] },
  { Candidate: "Klobuchar", Delegates: d3.sum(finalSection, d => d.Klobuchardelegates), dropOut: fourthSectionResults[3] },
  { Candidate: "Sanders", Delegates: d3.sum(finalSection, d => d.Sandersdelegates), dropOut: fourthSectionResults[4] },
  { Candidate: "Steyer", Delegates: d3.sum(finalSection, d => d.Steyerdelegates), dropOut: fourthSectionResults[5] },
  { Candidate: "Warren", Delegates: d3.sum(finalSection, d => d.Warrendelegates), dropOut: fourthSectionResults[6] },
  { Candidate: "Yang", Delegates: d3.sum(finalSection, d => d.Yangdelegates), dropOut: fourthSectionResults[7] },
  ]

  finalSectionResults.forEach(function (d) {
    d.dropOut = d.dropOut == 1 ? 1 : d.Delegates == 0 ? 1 : d.Delegates < 0 ? Math.random() < 50 ? 1 : 0 : 0;
    return d;
  })



  console.log(firstSection)
  console.log(secondSection)
  console.log(thirdSection)
  console.log(fourthSection)
  console.log(finalSection)
  console.log(firstSectionResults)
  console.log(secondSectionResults)
  console.log(thirdSectionResults)
  console.log(fourthSectionResults)
  console.log(finalSectionResults)


  var rawsimulation = firstSection.concat(secondSection)
  var rawsimulation = rawsimulation.concat(thirdSection)
  var rawsimulation = rawsimulation.concat(fourthSection)
  var rawsimulation = rawsimulation.concat(finalSection)

  var rawsimulation = rawsimulation.map((d, i) => {
    d.winner = Math.max(d.Bidenvote,d.Bloombergvote,d.Buttigiegvote,d.Klobucharvote,d.Sandersvote,d.Steyervote,d.Warrenvote,d.Yangvote)
    d.Bidenwin = d.winner == d.Bidenvote?1:0
    d.Bloombergwin = d.winner == d.Bloombergvote?1:0
    d.Buttigiegwin = d.winner == d.Buttigiegvote?1:0
    d.Klobucharwin = d.winner == d.Klobucharvote?1:0
    d.Sanderswin = d.winner == d.Sandersvote?1:0
    d.Steyerwin = d.winner == d.Steyervote?1:0
    d.Warrenwin = d.winner == d.Warrenvote?1:0
    d.Yangwin = d.winner == d.Yangvote?1:0
    d.winner = d.Bidenwin ==1?"Biden":d.Bloombergwin ==1?"Bloomberg":d.Buttigiegwin ==1?"Buttigieg":d.Klobucharwin ==1?"Klobuchar":d.Sanderswin ==1?"Sanders":d.Steyerwin ==1?"Steyer":d.Warenwin ==1?"Warren":"Yang"
    return d;
  })


  var simulation = rawsimulation.map((d, i) => {
    return {
      state: d.state,
      date: d.date,
      delegates: +d.delegates,
      winner: d.winner,
      Bidenvote: +d.Bidenvote,
      Bloombergvote: +d.Bloombergvote,
      Buttigiegvote: +d.Buttigiegvote,
      Klobucharvote: +d.Klobucharvote,
      Sandersvote: +d.Sandersvote,
      Steyervote: +d.Steyervote,
      Warrenvote: +d.Warrenvote,
      Yangvote: +d.Yangvote,
      Bidendelegates: +d.Bidendelegates,
      Bloombergdelegates: +d.Bloombergdelegates,
      Buttigiegdelegates: +d.Buttigiegdelegates,
      Klobuchardelegates: +d.Klobuchardelegates,
      Sandersdelegates: +d.Sandersdelegates,
      Steyerdelegates: +d.Steyerdelegates,
      Warrendelegates: +d.Warrendelegates,
      Yangdelegates: +d.Yangdelegates,
      Bidenwin: +d.Bidenwin,
      Bloombergwin: +d.Bloombergwin,
      Buttigiegwin: +d.Buttigiegwin,
      Klobucharwin: +d.Klobucharwin,
      Sanderswin: +d.Sanderswin,
      Steyerwin: +d.Steyerwin,
      Warrenwin: +d.Warrenwin,
      Yangwin: +d.Yangwin,
    }
  })
  console.log(rawsimulation)
  console.log(simulation)
  //Final Results



  var BidenDel = d3.sum(simulation, d => d.Bidendelegates)
  BloombergDel = d3.sum(simulation, d => d.Bloombergdelegates)
  ButtigiegDel = d3.sum(simulation, d => d.Buttigiegdelegates)
  KlobucharDel = d3.sum(simulation, d => d.Klobuchardelegates)
  SandersDel = d3.sum(simulation, d => d.Sandersdelegates)
  SteyerDel = d3.sum(simulation, d => d.Steyerdelegates)
  WarrenDel = d3.sum(simulation, d => d.Warrendelegates)
  YangDel = d3.sum(rawsimulation, d => d.Yangdelegates)



  var finalDelegates = [{ Candidate: "Biden", Delegates: BidenDel },
  { Candidate: "Bloomberg", Delegates: BloombergDel },
  { Candidate: "Buttigieg", Delegates: ButtigiegDel },
  { Candidate: "Klobuchar", Delegates: KlobucharDel },
  { Candidate: "Sanders", Delegates: SandersDel },
  { Candidate: "Steyer", Delegates: SteyerDel },
  { Candidate: "Warren", Delegates: WarrenDel },
  { Candidate: "Yang", Delegates: YangDel },
  ]

  console.log(finalDelegates)



});