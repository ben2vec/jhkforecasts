










var formatValue = d3.format(".2");

Bidensimulation = Math.random()
Bloombergsimulation = Math.random()
Buttigiegsimulation = Math.random()
Klobucharsimulation = Math.random()
Sanderssimulation = Math.random()
Steyersimulation = Math.random()
Warrensimulation = Math.random()
Yangsimulation = Math.random()


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


  data.forEach(function (d) {
    d.Bidenstd = d.Bidenproj > 25 ? 15 : Math.sqrt(d.Bidenproj + .01) * 3;
    d.Bloombergstd = d.Bloombergproj > 25 ? 15 : Math.sqrt(d.Bloombergproj + .01) * 3;
    d.Buttigiegstd = d.Buttigiegproj > 25 ? 15 : Math.sqrt(d.Buttigiegproj + .01) * 3;
    d.Klobucharstd = d.Klobucharproj > 25 ? 15 : Math.sqrt(d.Klobucharproj + .01) * 3;
    d.Sandersstd = d.Sandersproj > 25 ? 15 : Math.sqrt(d.Sandersproj + .01) * 3;
    d.Steyerstd = d.Steyerproj > 25 ? 15 : Math.sqrt(d.Steyerproj + .01) * 3;
    d.Warrenstd = d.Warrenproj > 25 ? 15 : Math.sqrt(d.Warrenproj + .01) * 3;
    d.Yangstd = d.Yangproj > 25 ? 15 : Math.sqrt(d.Yangproj + .01) * 3;
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
    d.Bidenvote = d.Bidenvoteraw / ((d.sumvoteraw / 95))
    d.Bloombergvote = d.Bloombergvoteraw / ((d.sumvoteraw / 95))
    d.Buttigiegvote = d.Buttigiegvoteraw / ((d.sumvoteraw / 95))
    d.Klobucharvote = d.Klobucharvoteraw / ((d.sumvoteraw / 95))
    d.Sandersvote = d.Sandersvoteraw / ((d.sumvoteraw / 95))
    d.Steyervote = d.Steyervoteraw / ((d.sumvoteraw / 95))
    d.Warrenvote = d.Warrenvoteraw / ((d.sumvoteraw / 95))
    d.Yangvote = d.Yangvoteraw / ((d.sumvoteraw / 95))
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
    d.Bidendelegateover15 = Math.round((d.Bidenov15/d.sumover15) * d.over15delegates)
    d.Bloombergdelegateover15 = Math.round((d.Bloombergov15/d.sumover15) * d.over15delegates)
    return d;
  })
  console.log(data[0])
  console.log(data[0].Bidendelegateun15)



});