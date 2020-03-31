d3.csv("https://raw.githubusercontent.com/seanelevan/pluralvote/master/web/article/2020-forecast/statebystateprob.csv?token=AIYCOI3LWILZQWFAUIU33X26QKW26", pluralvote => {
    pluralvote.shift()
    var pluralvote = pluralvote.map((d, i) => {
        return {
            state: d.stateNames,
            win: +d.statebystateprob
        }
    })
    pluralvote.sort(function(a, b){
        if(a.state < b.state) { return -1; }
        if(a.state > b.state) { return 1; }
        return 0;
    })
    var cds = [pluralvote.splice(20,2),pluralvote.splice(28,3)].flat()
    pluralvote.push(cds)
    var pluralvote = pluralvote.flat()
    console.log(pluralvote)


})