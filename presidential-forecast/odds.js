var event_odds = [
    { event: "flipping a coin", odds: 50 },
    { event: "getting a one pair", odds: 43.8 },
    { event: "NBA player makes a three", odds: 36 },
    { event: "MLB batter getting on base", odds: 31.8 },
    { event: "the dealer busts in blackjack", odds: 28.3 },
    { event: "getting a two pair", odds: 23.5 },
    { event: "mlb batter striking out", odds: 20 },
    { event: "rolling a six on a die", odds: 16.666 },
    { event: "pga player makes a bogey", odds: 13 },
    { event: "picking a random digit", odds: 10 },
    { event: "picking an ace", odds: 7.69 },
    { event: "getting a blackjack", odds: 4.8 },
    { event: "getting a full house", odds: 2.8 },
    { event: "getting a four of a kind", odds: 0.168 },
    { event: "getting a royal flush", odds: 0 },
  ]
  
  var events = event_odds.map((d, i) => {
    return d.event
  })
  
  var odds = event_odds.map((d, i) => {
    return d.odds
  })
  var odds_scale = d3.scaleLinear()
    .domain(odds)
    .range([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])