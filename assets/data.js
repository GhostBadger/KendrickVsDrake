/* =====================================================================
   Kendrick vs. Drake, Clipped — site data
   Everything the pages show lives here: references, timelines, songs,
   legal events and creator videos. Edit text here, not in app.js.
   Citation helper: c("key1","key2") -> "(Author, 2024; Author, 2025)"
   ===================================================================== */
const c = (...keys) => "(" + keys.map(k => `<a class="cite" data-k="${k}"></a>`).join("; ") + ")";

/* ---------------------------------------------------------------------
   REFERENCES (APA 7). Fields:
   a = author as it appears in the reference list
   n = name used for in-text citations (defaults to a without trailing ".")
   y = year (or "n.d."), md = ", Month Day" part of the date (optional)
   t = title, s = site/periodical, kind = web | periodical | journal | video | ai
   cat = news | research | academic | video | ai
   Letters (2024a, 2024b) are added automatically.
   --------------------------------------------------------------------- */
const REFS = {
  /* ---- news, analysis and explainers ---- */
  adn2024:{a:"Anchorage Daily News",y:"2024",md:", November 26",t:"Drake claims Spotify and Universal schemed to boost Lamar’s summer hit ‘Not Like Us’",kind:"web",cat:"news",url:"https://adn.com/nation-world/2024/11/26/drake-claims-spotify-and-universal-schemed-to-boost-lamars-summer-hit-not-like-us"},
  americansongwriter2024:{a:"American Songwriter",y:"2024",t:"The meaning behind “Not Like Us” by Kendrick Lamar and why it’s perhaps the knockout blow against Drake",kind:"web",cat:"news",url:"https://americansongwriter.com/the-meaning-behind-not-like-us-by-kendrick-lamar-and-why-its-perhaps-the-knockout-blow-against-drake"},
  ap2025:{a:"Associated Press",y:"2025",md:", October 9",t:"Drake’s defamation suit against label over Kendrick Lamar’s “Not Like Us” tossed by judge",s:"PBS News",kind:"web",cat:"news",url:"https://www.pbs.org/newshour/nation/drakes-defamation-suit-against-label-over-kendrick-lamars-not-like-us-tossed-by-judge"},
  avclub2024:{a:"The A.V. Club",sortKey:"AV Club",y:"2024",t:"The Drake-Kendrick Lamar beef proved trolling isn’t a winning strategy against real hip-hop",kind:"web",cat:"news",url:"https://www.avclub.com/drake-kendrick-lamar-trolling-hiphop-battle"},
  avclub2025:{a:"The A.V. Club",sortKey:"AV Club",y:"2025",md:", February",t:"Kendrick Lamar set a Super Bowl viewership record as big as the Eiffel Tower",kind:"web",cat:"news",url:"https://www.avclub.com/kendrick-lamar-viewership-record"},
  bet2024:{a:"BET",y:"2024",md:", June",t:"ICYMI: Here’s how Kendrick Lamar’s iconic Juneteenth pop-up concert went",kind:"web",cat:"news",url:"https://www.bet.com/article/73pelb/icymi-here-s-how-kendrick-lamar-s-iconic-juneteenth-pop-up-concert-went"},
  billboard2024:{a:"Billboard Canada",y:"2024",md:", May",t:"Drake dissects Kendrick Lamar &amp; clears the air with “The Heart Part 6”: Listen",kind:"web",cat:"news",url:"https://ca.billboard.com/music/rb-hip-hop/drake-dissects-kendrick-lamar-clears-the-air-with-the-heart-part-6-listen"},
  billboard2025:{a:"Billboard Canada",y:"2025",md:", February 11",t:"Kendrick Lamar’s 2025 Super Bowl halftime show is now the most-watched of all time",kind:"web",cat:"news",url:"https://ca.billboard.com/music/rb-hip-hop/kendrick-lamar-2025-super-bowl-halftime-show-most-watched-all-time-1235899552"},
  bradley2024:{a:"Bradley, L., &amp; Frank, A.",n:"Bradley &amp; Frank",y:"2024",md:", May 10",t:"Drake and Kendrick Lamar’s beef has dragged us all to meme hell",s:"The Daily Beast",kind:"periodical",cat:"news",url:"https://thedailybeast.com/drake-and-kendrick-lamars-beef-has-dragged-us-all-to-meme-hell"},
  carry2025:{a:"Carry, O.",n:"Carry",y:"2025",md:", February 12",t:"What’s the “Say Drake” meme? Kendrick Lamar’s smile at the Super Bowl halftime show explained",s:"Know Your Meme",kind:"web",cat:"news",url:"https://trending.knowyourmeme.com/editorials/guides/whats-the-say-drake-i-heard-you-like-em-young-meme-kendrick-lamars-smile-at-the-super-bowl-halftime-show-explained"},
  cbc2024a:{a:"CBC",y:"2024",md:", April 24",t:"Drake receives cease-and-desist letter from Tupac Shakur’s estate over AI diss track",kind:"web",cat:"news",url:"https://www.cbc.ca/1.7183724"},
  cbc2024b:{a:"CBC",y:"2024",t:"Why is everyone arguing about Drake and Kendrick Lamar?",kind:"web",cat:"news",url:"https://amp.cbc.ca/lite/story/1.7192419"},
  courthouse2025:{a:"Courthouse News Service",y:"2025",md:", October",t:"Judge drops Drake’s defamation suit over Kendrick Lamar’s “Not Like Us” diss track",kind:"web",cat:"news",url:"https://www.courthousenews.com/judge-drops-drakes-defamation-suit-over-kendrick-lamars-not-like-us-diss-track/"},
  dailydot2025:{a:"The Daily Dot",sortKey:"Daily Dot",y:"2025",md:", February",t:"Flared jeans, Serena’s crip walk, and that grin: The 27 funniest Kendrick Lamar halftime show memes",kind:"web",cat:"news",url:"https://dailydot.com/memes/super-bowl-halftime-show-memes/"},
  dalugdug2026:{a:"Dalugdug, M.",n:"Dalugdug",y:"2026",md:", September 23",t:"Drake appeal against UMG over Kendrick Lamar’s ‘Not Like Us’ set for December 4 hearing",s:"Music Business Worldwide",kind:"periodical",cat:"news",url:"https://www.musicbusinessworldwide.com/drake-appeal-against-umg-over-kendrick-lamars-not-like-us-set-for-december-4-hearing/"},
  davis2024:{a:"Davis, D.-M., &amp; Silberling, A.",n:"Davis &amp; Silberling",y:"2024",md:", May 6",t:"The Kendrick-Drake feud shows how technology is changing rap battles",s:"TechCrunch (republished by Yahoo Finance)",kind:"periodical",cat:"news",url:"https://ca.finance.yahoo.com/news/kendrick-drake-feud-shows-technology-225045006.html"},
  dexerto2024:{a:"Dexerto",y:"2024",md:", May",t:"What does ‘BBL Drizzy’ mean? TikTok trend explained",kind:"web",cat:"news",url:"https://www.dexerto.com/tiktok/what-does-bbl-drizzy-mean-tiktok-trend-explained-2709759/"},
  fader2025:{a:"The FADER",sortKey:"FADER",y:"2025",md:", January 15",t:"Drake is suing Universal for defamation over “Not Like Us”",kind:"web",cat:"news",url:"https://www.thefader.com/2025/01/15/drake-drops-umg-spotify-legal-petition"},
  fader2026:{a:"The FADER",sortKey:"FADER",y:"2026",md:", May 15",t:"Drake surprise drops three albums: Iceman, Habibti, and Maid of Honor",kind:"web",cat:"news",url:"https://www.thefader.com/2026/05/15/drake-iceman-habibti-maid-of-honor-features"},
  fox32_2024:{a:"FOX 32 Chicago",y:"2024",md:", November 22",t:"Kendrick Lamar drops ‘GNX,’ new surprise album",kind:"web",cat:"news",url:"https://www.fox32chicago.com/news/gnx-kendrick-lamar-surprise-album"},
  fox4_2024:{a:"FOX 4 News",y:"2024",md:", May",t:"Kendrick Lamar accuses Drake of having ‘secret daughter’ in ‘Meet the Grahams’ diss track",kind:"web",cat:"news",url:"https://www.fox4news.com/news/kendrick-lamar-drake-secret-daughter-meet-the-grahams"},
  hnhh2024:{a:"HotNewHipHop",y:"2024",md:", May",t:"Drake “The Heart Part 6”: What is Kendrick Lamar’s “Mother I Sober” actually about?",kind:"web",cat:"news",url:"https://www.hotnewhiphop.com/797733-kendrick-lamar-mother-i-sober-drake-the-heart-part-6-explained-hip-hop-news"},
  hotpress2024:{a:"Hot Press",y:"2024",md:", July 5",t:"Kendrick Lamar releases video for ‘Not Like Us’",kind:"web",cat:"news",url:"https://www.hotpress.com/music/kendrick-lamar-release-video-for-not-like-us-23036328"},
  hypebeast2024:{a:"Hypebeast",y:"2024",md:", May",t:"Kendrick Lamar’s “Not Like Us” debuts at No. 1",kind:"web",cat:"news",url:"https://hypebeast.com/2024/5/kendrick-lamar-not-like-us-no-1-debut-billboard-hot-100"},
  insurancejournal2025:{a:"Insurance Journal",y:"2025",md:", March 7",t:"iHeartMedia reveals no payments made to Drake in ‘Not Like Us’ settlement",kind:"web",cat:"news",url:"https://insurancejournal.com/news/southcentral/2025/03/07/814687.htm"},
  katersky2025:{a:"Katersky, A.",n:"Katersky",y:"2025",md:", October 10",t:"Drake’s defamation case against record label UMG dismissed by federal judge",s:"ABC7 Los Angeles",kind:"web",cat:"news",url:"https://abc7.com/post/drakes-defamation-case-record-label-umg-dismissed-federal-judge-stemming-rap-battle-kendrick-lamar/17973242/"},
  kym2025:{a:"Know Your Meme",y:"2025",t:"Kendrick Lamar vs. Drake feud",kind:"web",cat:"news",url:"https://knowyourmeme.com/memes/events/kendrick-lamar-vs-drake-feud"},
  kymdaughter:{a:"Know Your Meme",y:"n.d.",t:"Drake’s secret daughter rumor",kind:"web",cat:"news",retrieved:"November 22, 2026",url:"https://knowyourmeme.com/memes/events/drakes-secret-daughter-rumor"},
  ktvu2024:{a:"KTVU FOX 2",y:"2024",md:", May",t:"Drake vs. Kendrick Lamar: Timeline of their feud",kind:"web",cat:"news",url:"https://www.ktvu.com/news/drake-kendrick-lamar-feud-timeline"},
  landrum2024:{a:"Landrum, J., Jr.",n:"Landrum",y:"2024",md:", November 22",t:"Kendrick Lamar surprises with new album ‘GNX’",s:"ABC News; Associated Press",kind:"web",cat:"news",url:"https://abcnews.go.com/Entertainment/wireStory/kendrick-lamar-surprises-new-album-gnx-116140665"},
  mbw2025a:{a:"Music Business Worldwide",y:"2025",md:", February 27",t:"Drake settles legal dispute with iHeartMedia over Kendrick Lamar’s ‘Not Like Us’",kind:"web",cat:"news",url:"https://www.musicbusinessworldwide.com/drake-reaches-settlement-with-iheartmedia-in-legal-dispute-over-kendrick-lamars-not-like-us"},
  mbw2025b:{a:"Music Business Worldwide",y:"2025",md:", March 17",t:"UMG asks court to dismiss Drake’s ‘Not Like Us’ lawsuit: ‘He has sued his own record label in a misguided attempt to salve his wounds’",kind:"web",cat:"news",url:"https://www.musicbusinessworldwide.com/umg-asks-court-to-dismiss-drakes-not-like-us-lawsuit-he-has-sued-his-own-record-label-in-a-misguided-attempt-to-salve-his-wounds"},
  mbw2026:{a:"Music Business Worldwide",y:"2026",md:", January",t:"Drake appeals dismissal of ‘Not Like Us’ case against UMG, says court created a ‘dangerous’ rule for rap diss tracks",kind:"web",cat:"news",url:"https://www.musicbusinessworldwide.com/drake-appeals-dismissal-of-not-like-us-case-against-umg-says-court-created-a-dangerous-rule-for-rap-diss-tracks/"},
  mbw2026reply:{a:"Music Business Worldwide",y:"2026",md:", April",t:"Drake pushes back on UMG at appeals court, says judge improperly dismissed ‘Not Like Us’ case",kind:"web",cat:"news",url:"https://www.musicbusinessworldwide.com/drake-pushes-back-on-umg-at-appeals-court-says-judge-improperly-dismissed-not-like-us-case/"},
  mercante2024:{a:"Mercante, A.",n:"Mercante",y:"2024",md:", May 6",t:"The Kendrick/Drake beef is made for the internet",s:"Kotaku",kind:"periodical",cat:"news",url:"https://kotaku.com/kendrick-drake-beef-rap-battle-memes-internet-reactions-1851458972"},
  npr2024a:{a:"NPR",y:"2024",md:", November 26",t:"Drake accuses Universal Music Group and Spotify of unfairly promoting Kendrick Lamar’s ‘Not Like Us’",kind:"web",cat:"news",url:"https://www.npr.org/2024/11/26/nx-s1-5206303/drake-kendrick-lamar-umg-spotify"},
  npr2024b:{a:"NPR",y:"2024",md:", May 8",t:"Taking the toll of Drake and Kendrick Lamar’s vicious, gripping psychological warfare",kind:"web",cat:"news",url:"https://www.npr.org/2024/05/08/1249906234/kendrick-lamar-drake-beef-fallout"},
  npr2024c:{a:"NPR",y:"2024",md:", April 30",t:"On ‘Euphoria,’ Kendrick Lamar is Drake’s biggest hater — and proud of it",kind:"web",cat:"news",url:"https://www.npr.org/2024/04/30/1248232222/kendrick-lamar-euphoria-drake-rap-beef"},
  npr2025:{a:"NPR",y:"2025",md:", January 15",t:"New Drake lawsuit claims his label pushed ‘Not Like Us’ diss to defame him",kind:"web",cat:"news",url:"https://www.npr.org/2025/01/15/g-s1-42924/drake-umg-defamation-lawsuit-not-like-us"},
  ocho2026:{a:"Ocho, A.",n:"Ocho",y:"2026",md:", May",t:"Here are the first week numbers for Drake’s ‘Iceman,’ ‘Maid of Honour,’ and ‘Habibti’",s:"Complex",kind:"periodical",cat:"news",url:"https://www.complex.com/music/a/alex-ocho/drake-iceman-maid-honour-habibti-first-week-sales"},
  phillips2024:{a:"Phillips, D.",n:"Phillips",y:"2024",md:", May",t:"Drake “Family Matters”: Unpacking the bars",s:"HotNewHipHop",kind:"periodical",cat:"news",url:"https://www.hotnewhiphop.com/800264-drake-family-matters-kendrick-lamar-diss-lyrics"},
  rollingstone2024:{a:"Rolling Stone",y:"2024",md:", April",t:"Why is everyone beefing with Drake?",kind:"web",cat:"news",url:"https://www.rollingstone.com/music/music-features/drake-beef-future-kendrick-lamar-rick-ross-weeknd-1235006253/"},
  rollingstone2025:{a:"Rolling Stone",y:"2025",md:", October",t:"Drake launches appeal, hopes to revive defamation lawsuit against UMG",kind:"web",cat:"news",url:"https://www.rollingstone.com/music/music-news/drake-appeal-not-like-us-umg-lawsuit-1235456199/"},
  rollingstone2026:{a:"Rolling Stone",y:"2026",md:", March",t:"Drake’s label fires back at rapper in appeals court: ‘Astoundingly hypocritical’",kind:"web",cat:"news",url:"https://www.rollingstone.com/music/music-news/drake-kendrick-lamar-not-like-us-umg-defamation-appeal-1235530267/"},
  root2024a:{a:"The Root",sortKey:"Root",y:"2024",md:", May",t:"The funniest and wildest social media reactions from the Kendrick Lamar-Drake beef",kind:"web",cat:"news",url:"https://www.theroot.com/the-funniest-and-wildest-social-media-posts-from-the-ke-1851467137"},
  root2024b:{a:"The Root",sortKey:"Root",y:"2024",t:"Kendrick Lamar’s ‘Not Like Us’ is deeper than just a diss",kind:"web",cat:"news",url:"https://www.theroot.com/kendrick-lamars-not-like-us-is-deeper-than-just-a-diss-1851561380"},
  roytburg2024:{a:"Roytburg, E.",n:"Roytburg",y:"2024",md:", June 6",t:"AI-generated ‘BBL Drizzy’ started as a Drake joke—but music creators are now terrified it spells the beginning of the end",s:"Fortune",kind:"periodical",cat:"news",url:"https://fortune.com/2024/06/06/metro-boomin-bbl-drizzy-drake-kendrick-ai-beats-pay/"},
  songfacts:{a:"Songfacts",y:"n.d.",t:"Push Ups (Drop &amp; Give Me Fifty) by Drake",kind:"web",cat:"news",retrieved:"November 22, 2026",url:"https://www.songfacts.com/facts/drake/push-ups-drop-give-me-fifty"},
  stanton2025:{a:"Stanton, R.",n:"Stanton",y:"2025",md:", January 20",t:"Streamers including Kai Cenat named in Drake’s UMG lawsuit for their reaction videos instantly respond with reaction videos",s:"PC Gamer",kind:"periodical",cat:"news",url:"https://www.pcgamer.com/games/streamers-including-kai-cenat-named-in-drakes-umg-lawsuit-for-their-reaction-videos-instantly-respond-with-reaction-videos-the-biggest-ls-come-from-not-knowing-how-to-take-an-l"},
  stereogum2018:{a:"Stereogum",y:"2018",md:", June 2",t:"Drake has met his alleged son multiple times: Report",kind:"web",cat:"news",url:"https://stereogum.com/1999423/drake-has-met-his-alleged-son-multiple-times-report/news"},
  stereogumLeak:{a:"Stereogum",y:"2024",md:", April",t:"Drake &amp; Rick Ross leak diss tracks as rap-feud landscape heats up",kind:"web",cat:"news",url:"https://stereogum.com/2259331/drake-rick-ross-leak-diss-tracks-as-rap-feud-landscape-heats-up/music"},
  stereogumHP6:{a:"Stereogum",y:"2024",md:", May 5",t:"Drake denies pedophilia allegations, claims his camp fed Kendrick Lamar false information on new diss track “The Heart Part 6”",kind:"web",cat:"news",url:"https://stereogum.com/2262354/drake-denies-pedophilia-allegations-claims-his-camp-fed-kendrick-lamar-false-information-on-new-diss-track-the-heart-part-6/music"},
  stereogumFM:{a:"Stereogum",y:"2024",md:", May 3",t:"Drake unveils latest Kendrick Lamar diss track “Family Matters”",kind:"web",cat:"news",url:"https://stereogum.com/2262209/drake-unveils-latest-kendrick-lamar-diss-track-family-matters/music"},
  stereogum2024:{a:"Stereogum",y:"2024",md:", May 13",t:"Kendrick Lamar’s Drake diss “Not Like Us” debuts at #1",kind:"web",cat:"news",url:"https://stereogum.com/2263317/kendrick-lamars-drake-diss-not-like-us-debuts-at-1/news"},
  thegrio2024:{a:"theGrio",y:"2024",md:", September 20",t:"The complete history of the Kendrick Lamar-Drake feud",kind:"web",cat:"news",url:"https://thegrio.com/2024/09/20/kendrick-lamar-vs-drake-complete-history"},
  thornton2026:{a:"Thornton, C.",n:"Thornton",y:"2026",md:", April 6",t:"2 groups of legal scholars side with judge’s ruling in Drake’s defamation lawsuit appeal",s:"Black Enterprise",kind:"periodical",cat:"news",url:"https://www.blackenterprise.com/scholars-agree-against-drake-defamation-suit/"},
  trapp2024:{a:"Trapp, M.",n:"Trapp",y:"2024",md:", August 21",t:"Kendrick Lamar’s “Not Like Us” plays during Gavin Newsom’s DNC speech",s:"REVOLT",kind:"periodical",cat:"news",url:"https://www.revolt.tv/article/kendrick-lamar-not-like-us-plays-during-dnc-speech"},
  uproxx2024a:{a:"Uproxx",y:"2024",md:", May",t:"What exactly does “BBL Drizzy” mean, and why is this song everywhere?",kind:"web",cat:"news",url:"https://uproxx.com/music/bbl-drizzy-explained-meaning-metro-boomin-drake"},
  uproxx2024b:{a:"Uproxx",y:"2024",md:", April",t:"Who did Drake diss in his response to Kendrick Lamar (and others)?",kind:"web",cat:"news",url:"https://uproxx.com/music/who-did-drake-diss-on-kendrick-lamar/"},
  usatoday2024:{a:"USA Today",y:"2024",md:", April 30",t:"Kendrick Lamar drops brutal Drake diss track ‘Euphoria’ amid feud: Listen",s:"Yahoo News Canada",kind:"web",cat:"news",url:"https://ca.news.yahoo.com/kendrick-lamar-drops-brutal-drake-171731001.html"},
  weiss2025:{a:"Weiss, D. C.",n:"Weiss",y:"2025",md:", October 14",t:"Judge tosses Drake’s suit over Kendrick Lamar’s rap song calling him ‘certified pedophile’",s:"ABA Journal",kind:"periodical",cat:"news",url:"https://www.abajournal.com/news/article/judge-tosses-drakes-suit-over-kendrick-lamars-rap-song-calling-him-a-certified-pedophile"},
  welch2025:{a:"Welch, A.",n:"Welch",y:"2025",md:", May 8",t:"UMG moves to dismiss Drake’s Kendrick Lamar lawsuit, says rapper is trying to ‘save face’ after ‘Not Like Us’",s:"TheWrap",kind:"periodical",cat:"news",url:"https://www.thewrap.com/umg-moves-dismiss-drake-kendrick-lamar-not-like-us-lawsuit"},
  xxl2024:{a:"XXL",y:"2024",md:", June",t:"AI company behind Metro Boomin’s ‘BBL Drizzy’ Drake diss sued by major record labels and RIAA",kind:"web",cat:"news",url:"https://www.xxlmag.com/udio-ai-sued-metro-boomin-bbl-drizzy-drake-diss-riaa/"},
  yahoo2024:{a:"Yahoo Entertainment",y:"2024",md:", May",t:"Did Kendrick Lamar mix up Haley Joel Osment and Joel Osteen in the lyrics of his new Drake diss track?",kind:"web",cat:"news",url:"https://ca.news.yahoo.com/did-kendrick-lamar-mix-haley-183000279.html"},

  /* ---- research, industry data and records ---- */
  cirisano2024:{a:"Cirisano, T.",n:"Cirisano",y:"2024",md:", May 9",t:"Kendrick vs. Drake is a rare ‘mainstream’ moment — and streaming is on the sidelines",s:"MIDiA Research",kind:"web",cat:"research",url:"https://midiaresearch.com/blog/kendrick-vs-drake-is-a-rare-mainstream-moment-and-streaming-is-on-the-sidelines"},
  guinness2025:{a:"Guinness World Records",y:"2025",t:"Largest TV audience for a Super Bowl half-time performance",kind:"web",cat:"research",url:"https://www.guinnessworldrecords.com/world-records/101375-largest-tv-audience-for-a-super-bowl-half-time-performance"},
  matsa2026:{a:"Matsa, K. E.",n:"Matsa",y:"2026",md:", October 19",t:"1 in 5 Americans regularly get news on TikTok",s:"Pew Research Center",kind:"web",cat:"research",url:"https://www.pewresearch.org/short-reads/2026/10/19/1-in-5-americans-regularly-get-news-on-tiktok/"},
  pew2025:{a:"Pew Research Center",y:"2025",md:", January 17",t:"A closer look at Americans’ experiences with news on TikTok",kind:"web",cat:"research",url:"https://www.pewresearch.org/short-reads/2025/01/17/a-closer-look-at-americans-experiences-with-news-on-tiktok/"},
  tiktok2024:{a:"TikTok",y:"2024",md:", August 19",t:"TikTok’s US and global Songs of the Summer 2024 revealed",s:"TikTok Newsroom",kind:"web",cat:"research",url:"https://newsroom.tiktok.com/en-us/tiktok-songs-of-the-summer"},
  tubefilter2024:{a:"Tubefilter",y:"2024",md:", December",t:"YouTube trending topics 2024: MrBeast is Not Like Us",kind:"web",cat:"research",url:"https://newsletter.tubefilter.com/p/these-are-youtube-s-top-trends-of-2024-efb6"},

  /* ---- peer-reviewed ---- */
  marwick2011:{a:"Marwick, A. E., &amp; boyd, d.",n:"Marwick &amp; boyd",y:"2011",t:"I tweet honestly, I tweet passionately: Twitter users, context collapse, and the imagined audience",journal:"New Media &amp; Society",vol:"13",issue:"1",pages:"114–133",kind:"journal",cat:"academic",url:"https://doi.org/10.1177/1461444810365313"},
  zulli2022:{a:"Zulli, D., &amp; Zulli, D. J.",n:"Zulli &amp; Zulli",y:"2022",t:"Extending the Internet meme: Conceptualizing technological mimesis and imitation publics on the TikTok platform",journal:"New Media &amp; Society",vol:"24",issue:"8",pages:"1872–1890",kind:"journal",cat:"academic",url:"https://doi.org/10.1177/1461444820983603"},

  /* ---- videos (creator content) ---- */
  vKai:{a:"Kai Cenat Live",y:"2024",md:", May",t:"Kai Cenat reacts to Drake - FAMILY MATTERS",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=poB1u5p7t2A"},
  vGabs:{a:"GabsMusicTV",y:"2024",md:", May",t:"Streamers react to: ‘Family Matters’ by Drake (Kendrick diss) • ft. Kai Cenat, Fantano &amp; more!",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=eihg-YPMWU0"},
  vFantano:{a:"ELITE",y:"2024",md:", May",t:"Anthony Fantano reacts to “meet the grahams” by Kendrick Lamar",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=qEvk9LlnTUs"},
  vRDC:{a:"StreamerWorld",y:"2024",md:", May",t:"RDCWorld1 all Kendrick Lamar vs Drake beef skits in chronological order",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=v-RJnOMcQxU"},
  vWillonius:{a:"King Willonius",y:"2024",md:", May",t:"King Willonius - BBL Drizzy (original) [Official audio]",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=1uW_AUwEv-0"},
  vTracklib:{a:"TRACKLIB",y:"2024",md:", May 8",t:"Sample breakdown: Metro Boomin - BBL Drizzy",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=VGGMQChuQHg"},
  vNFL:{a:"NFL",y:"2025",md:", February",t:"Kendrick Lamar’s Apple Music Super Bowl halftime show",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=KDorKy-13ak"},
  vGNX:{a:"Printer.",n:"Printer",y:"2024",md:", November 22",t:"Fantano FULL REACTION to GNX - Kendrick Lamar | ALBUM | [theneedledrop]",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=cFCLqrCIDBk"},
  vVill:{a:"THE VILL",y:"2025",md:", January",t:"Drake snitches on Kai Cenat &amp; YouTubers in federal documents for reacting to ‘Not Like Us’",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=dIJSC6yPr2g"},
  vABC7:{a:"ABC7",y:"2025",md:", October",t:"Drake’s ‘Not Like Us’ defamation case dismissed by federal judge",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=KUPG_8tGPdk"},
  vMcCune:{a:"McCune Law Group",y:"2025",md:", October",t:"Drake’s defamation lawsuit dismissed — here’s why (w/ attorney Joe Richardson)",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=foAqkthqbZE"},
  vDeema:{a:"Deema’s Class",y:"2025",md:", December",t:"Results of the Drake vs. UMG lawsuit &amp; the floodgates argument",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=xDCzl8fydv4"},
  /* ---- the "BBL Drizzy" open verse (Story case study + Creator watch) ---- */
  coleman2024:{a:"Coleman, C. V., II",n:"Coleman",y:"2024",md:", May 7",t:"Metro Boomin ups ante on BBL Drizzy beat giveaway, offers $10,000 to winner",s:"XXL",kind:"periodical",cat:"news",url:"https://www.xxlmag.com/metro-boomin-bbl-drizzy-beat-giveaway/"},
  cline2024:{a:"Cline, G.",n:"Cline",y:"2024",md:", May 9",t:"20 of the best entries for Metro Boomin’s ‘BBL Drizzy’ beat giveaway",s:"XXL",kind:"periodical",cat:"news",url:"https://www.xxlmag.com/metro-boomin-bbl-drizzy-beat-giveaway-entries/"},
  saponara2024:{a:"Saponara, M.",n:"Saponara",y:"2024",md:", May 6",t:"Metro Boomin responds to Drake’s disses & hosts ‘BBL Drizzy’ beat giveaway",s:"Billboard Canada",kind:"periodical",cat:"news",url:"https://ca.billboard.com/music/rb-hip-hop/metro-boomin-responds-to-drakes-disses-hosts-bbl-drizzy-beat-giveaway"},
  zeff2024:{a:"Zeff, M.",n:"Zeff",y:"2024",md:", May",t:"The saga of ‘BBL Drizzy’",s:"Gizmodo",kind:"periodical",cat:"news",url:"https://gizmodo.com/saga-bbl-drizzy-drake-kendrick-lamar-metro-boomin-1851470820"},
  complexRemix:{a:"Complex",y:"2024",md:", May",t:"Metro Boomin’s “BBL Drizzy” Drake diss is getting remixed by everyone: Merengue, Jersey club, and more",kind:"web",cat:"news",url:"https://www.complex.com/music/a/backwoodsaltar/metro-boomin-bbl-drizzy-drake-diss-remixes"},
  onyewuchi2024:{a:"Onyewuchi, C.",n:"Onyewuchi",y:"2024",md:", May",t:"Metro Boomin’s “BBL Drizzy”: The 7 funniest remixes",s:"HotNewHipHop",kind:"periodical",cat:"news",url:"https://www.hotnewhiphop.com/801721-metro-boomin-bbl-drizzy-funny-remix"},
  cowen2024:{a:"Cowen, T. W.",n:"Cowen",y:"2024",md:", May",t:"Of course Metro Boomin’s “BBL Drizzy” is Dr. Miami’s ‘new favorite song’",s:"Complex",kind:"periodical",cat:"news",url:"https://www.complex.com/music/a/tracewilliamcowen/dr-miami-metro-boomin-bbl-drizzy"},
  rapup2024:{a:"Trapp, M.",n:"Trapp",y:"2024",md:", May 24",t:"Drake raps over Metro Boomin’s “BBL Drizzy” in Sexyy Red collaboration “U My Everything”",s:"Rap-Up",kind:"periodical",cat:"news",url:"https://rap-up.com/2024/05/24/drake-raps-over-metro-boomins-bbl-drizzy-in-sexyy-red-song"},
  robinson2024:{a:"Robinson, K.",n:"Robinson",y:"2024",md:", May 15",t:"Metro Boomin’s ‘BBL Drizzy’ is more than a joke – it could signal the future of sampling",s:"Billboard",kind:"periodical",cat:"news",url:"https://www.billboard.com/business/tech/metro-boomin-bbl-drizzy-future-ai-sampling-1235682587/"},
  power1051a:{a:"Power 105.1",y:"2024",md:", May 6",t:"Metro Boomin mocks Drake with ‘BBL Drizzy’ diss beat, Drake responds",kind:"web",cat:"news",url:"https://power1051.iheart.com/content/2024-05-06-metro-boomin-mocks-drake-with-bbl-drizzy-diss-beat-drake-responds"},
  power1051b:{a:"Power 105.1",y:"2024",md:", May 7",t:"Metro Boomin adds cash prize to ‘BBL Drizzy’ challenge amid controversy",kind:"web",cat:"news",url:"https://power1051.iheart.com/content/2024-05-07-metro-boomin-adds-cash-prize-to-bbl-drizzy-challenge-amid-controversy"},
  higgins:{a:"Higgins, D.",n:"Higgins",y:"n.d.",t:"Hard to cheer for the homeboy in current rap battle",s:"NextMag",kind:"web",cat:"news",retrieved:"November 23, 2026",url:"https://nextmag.ca/hard-to-cheer-for-the-homeboy-in-current-rap-battle/"},
  lawrence2024:{a:"Lawrence, A.",n:"Lawrence",y:"2024",md:", May 10",t:"‘I bet Drake heard it and laughed’: BBL Drizzy is the real winner of the Drake-Kendrick feud",s:"The Guardian (Australia print edition, via PressReader)",kind:"periodical",cat:"news",url:"https://www.pressreader.com/australia/the-guardian-australia/20240510/282050512155391"},
  kymBBL:{a:"Know Your Meme",y:"n.d.",t:"BBL Drizzy",kind:"web",cat:"news",retrieved:"November 23, 2026",url:"https://knowyourmeme.com/memes/bbl-drizzy"},
  vMetroBeat:{a:"Metro Boomin",y:"2024",md:", May 5",t:"BBL DRIZZY BPM 150.mp3",kind:"audio",cat:"video",url:"https://soundcloud.com/metroboomin/bbl-drizzy-bpm-150-mp3"},
  vYuno:{a:"Yuno Miles",y:"2024",md:", May",t:"Yuno Miles - Drake BBL Freestyle (Metro Boomin) #bbldrizzybeatgiveaway",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=CwQWrbkBmmM"},
  tCharlie:{a:"Curtis-Beard, C. [@charliecurtisb]",n:"Curtis-Beard",y:"2024",md:", May 5",t:"BBL Drizzy?!? Another Drake diss?!",kind:"tiktok",cat:"video",url:"https://www.tiktok.com/@charliecurtisb/video/7365662009024679210"},
  tJustin:{a:"Oh That’s Justin! [@oh_thats_justin]",n:"Oh That’s Justin!",y:"2024",md:", May",t:"[Reaction to a Japanese-language “BBL Drizzy” diss]",kind:"tiktok",cat:"video",url:"https://www.tiktok.com/@oh_thats_justin/video/7365684093368929579"},
  tDuolingo:{a:"Duolingo English Test [@duolingoenglishtest]",n:"Duolingo English Test",y:"2024",md:", May",t:"[Duolingo owl mascot in a “BBL Drizzy” trend video]",kind:"tiktok",cat:"video",url:"https://www.tiktok.com/@duolingoenglishtest/video/7365866029420973355"},
  /* ---- J. Cole: the one who walked away (Story case study + Creator watch) ---- */
  uproxxDrill:{a:"Uproxx",y:"2024",md:", April 12",t:"Did J. Cole remove ‘7 Minute Drill’ from streaming services?",kind:"web",cat:"news",url:"https://uproxx.com/music/did-j-cole-remove-7-minute-drill-from-streaming-services"},
  usatodayCole:{a:"USA Today",y:"2024",md:", April 8",t:"J. Cole apologizes to Kendrick Lamar for ‘lame’ diss ‘7 Minute Drill’: ‘I was conflicted’",kind:"web",cat:"news",url:"https://ca.news.yahoo.com/j-cole-drops-surprise-album-125713275.html"},
  billboardCole:{a:"Billboard Canada",y:"2024",md:", April 8",t:"J. Cole regrets his Kendrick Lamar diss & calls it ‘the lamest s–t’ during Dreamville Fest: Watch",kind:"web",cat:"news",url:"https://ca.billboard.com/music/rb-hip-hop/j-cole-regrets-kendrick-lamar-diss-7-minute-drill-1235651302"},
  stereogumCole:{a:"Stereogum",y:"2024",md:", April 8",t:"J. Cole apologizes for dissing Kendrick Lamar: “That was the lamest, goofiest sh*t”",kind:"web",cat:"news",url:"https://stereogum.com/2258467/j-cole-apologizes-for-dissing-kendrick-lamar-that-was-the-lamest-goofiest-shit/news"},
  xxlRemoved:{a:"XXL",y:"2024",md:", April 12",t:"J. Cole’s Kendrick Lamar diss ‘7 Minute Drill’ removed from streaming services",kind:"web",cat:"news",url:"https://www.xxlmag.com/j-cole-kendrick-lamar-diss-removed-streaming-services/"},
  horvath2024:{a:"Horvath, Z.",n:"Horvath",y:"2024",md:", May",t:"ScHoolboy Q allegedly warned J Cole to stop beefing further with Kendrick Lamar before the apology",s:"HotNewHipHop",kind:"periodical",cat:"news",url:"https://hotnewhiphop.com/798290-schoolboy-q-j-cole-back-out-of-kendrick-beef-hip-hop-news"},
  rapupCole:{a:"Rap-Up",y:"2024",md:", May 4",t:"The internet jokingly praises J. Cole for bowing out of rap beef",kind:"web",cat:"news",url:"https://rap-up.com/article/2024/05/04/the-internet-jokingly-praises-j-cole-for-bowing-out-of-rap-beef"},
  kymCole:{a:"Know Your Meme",y:"n.d.",t:"J. Cole during Drake vs. Kendrick feud",kind:"web",cat:"news",retrieved:"November 23, 2026",url:"https://knowyourmeme.com/memes/j-cole-during-drake-vs-kendrick-feud"},
  elibert2024:{a:"Elibert, M.",n:"Elibert",y:"2024",md:", May",t:"J. Cole’s decision to bow out of beef is looking real good right now, fans point out amid intense Drake and Kendrick back and forth",s:"Complex",kind:"periodical",cat:"news",url:"https://www.complex.com/music/a/markelibert/j-cole-meme-drake-and-kendrick-beef"},
  onyewuchiCole:{a:"Onyewuchi, C.",n:"Onyewuchi",y:"2024",t:"The best J. Cole memes throughout Drake & Kendrick Lamar’s beef",s:"HotNewHipHop",kind:"periodical",cat:"news",url:"https://www.hotnewhiphop.com/803111-j-cole-memes-kendrick-drake-beef"},
  uproxxBeach:{a:"Uproxx",y:"2024",md:", May",t:"J. Cole appears to be living his best life after exiting the Kendrick Lamar beef, as he was just spotted chilling at the beach",kind:"web",cat:"news",url:"https://uproxx.com/music/j-cole-beach-kendrick-lamar-beef"},
  sportskeedaPopOut:{a:"Sportskeeda",y:"2024",md:", June",t:"“J Cole said BULLET DODGED”: Fans imagine Big 3 rapper’s reaction as Kendrick Lamar plays Drake diss tracks at Pop Out show",kind:"web",cat:"news",url:"https://www.sportskeeda.com/us/music/news-j-cole-said-bullet-dodged-fans-imagine-big-3-rapper-s-reaction-kendrick-lamar-plays-drake-diss-tracks-pop-out-show"},
  sportskeedaOschino:{a:"Sportskeeda",y:"2024",t:"“He’s probably raised different”: Oschino says he disapproved of J. Cole tapping out from Kendrick Lamar x Drake beef",kind:"web",cat:"news",url:"https://www.sportskeeda.com/us/music/news-he-s-probably-raised-different-oschino-says-disapproved-j-cole-tapping-kendrick-lamar-x-drake-beef"},
  jackson2024:{a:"Jackson, P.",n:"Jackson",y:"2024",md:", May 7",t:"Dear J. Cole, I owe you an apology. My bad, bro",s:"theGrio",kind:"periodical",cat:"news",url:"https://thegrio.com/2024/05/07/dear-j-cole-i-owe-you-an-apology-my-bad-bro"},
  hypebeastPA:{a:"Hypebeast",y:"2024",md:", October",t:"J. Cole addresses his exit from Drake vs. Kendrick Lamar beef in new track “Port Antonio”",kind:"web",cat:"news",url:"https://hypebeast.com/2024/10/j-cole-port-antonio-single-stream"},
  iolPA:{a:"IOL",y:"2024",md:", October 10",t:"J. Cole finally weighs in on Drake and Kendrick Lamar’s rap beef in new track",kind:"web",cat:"news",url:"https://iol.co.za/entertainment/music/international/2024-10-10-j-cole-finally-weighs-in-on-drake-and-kendrick-lamars-rap-beef-in-new-track/"},
  fitzgerald2026:{a:"Fitzgerald, T.",n:"Fitzgerald",y:"2026",md:", March 20",t:"J. Cole says he has genuine love for Drake and Kendrick Lamar, addresses Kendrick apology in rare interview",s:"XXL",kind:"periodical",cat:"news",url:"https://www.xxlmag.com/j-cole-drake-kendrick-lamar-geniune-love-apology-interview/"},
  vPortAntonio:{a:"J. Cole - Topic",y:"2024",md:", October",t:"Port Antonio",kind:"video",cat:"music",url:"https://www.youtube.com/watch?v=s_QGwQheU2s"},
  vFrontStoop:{a:"The FrontStoop",sortKey:"FrontStoop",y:"2024",md:", April",t:"J. Cole apologizes or Kendrick Lamar diss at Dreamville Festival | OG Talk",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=hOmx8boJ4E8"},
  tBeach:{a:"Lale [@2kold.fr]",n:"Lale",y:"2024",md:", May 8",t:"[A fan meets J. Cole at the beach]",kind:"tiktok",cat:"video",url:"https://www.tiktok.com/@2kold.fr/video/7366500969762426158"},
  /* ---- official song uploads (the players on the Song timeline) ---- */
  sFps:{a:"DrakeVEVO",y:"2023",md:", October",t:"Drake - First Person Shooter (Audio) ft. J. Cole",kind:"video",cat:"music",url:"https://www.youtube.com/watch?v=sRs2o36a1Us"},
  sLikeThat:{a:"FutureVEVO",y:"2024",md:", March",t:"Future, Metro Boomin, Kendrick Lamar - Like That (Official Audio)",kind:"video",cat:"music",url:"https://www.youtube.com/watch?v=N9bKBAA22Go"},
  sPushUps:{a:"Drake - Topic",y:"2024",md:", April",t:"Push Ups",kind:"video",cat:"music",url:"https://www.youtube.com/watch?v=HKH9p19PRLA"},
  sEuphoria:{a:"Kendrick Lamar - Topic",y:"2024",t:"euphoria",kind:"video",cat:"music",url:"https://www.youtube.com/watch?v=fAqa1ozCuj8"},
  sFamily:{a:"Drake",y:"2024",md:", May",t:"DRAKE - FAMILY MATTERS",kind:"video",cat:"music",url:"https://www.youtube.com/watch?v=ZkXG3ZrXlbc"},
  sGrahams:{a:"Kendrick Lamar - Topic",y:"2024",md:", May",t:"meet the grahams",kind:"video",cat:"music",url:"https://www.youtube.com/watch?v=J_tchksaJCM"},
  sNotLikeUs:{a:"Kendrick Lamar",y:"2024",md:", May 4",t:"Not Like Us",kind:"video",cat:"music",url:"https://www.youtube.com/watch?v=T6eK-2OQtew"},
  sHP6:{a:"Drake",y:"2024",md:", May",t:"THE HEART PART 6 - DRAKE",kind:"video",cat:"music",url:"https://www.youtube.com/watch?v=HJeY-FXidDQ"},
  /* ---- breakdown videos (one per song; commentators' own channels, checked Nov 23, 2026) ---- */
  bdLikeThat:{a:"Markman, R.",n:"Markman",y:"2024",md:", March 22",t:"The Kendrick Lamar vs. Drake &amp; J. Cole + “Like That” lyric breakdown",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=-4QMAsYBGcY"},
  bdPushUps:{a:"Pearl Fountain",y:"2024",md:", April 13",t:"Drake’s “Push Ups” breakdown: Every Kendrick diss explained",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=3VGZC2-5pgU"},
  bdTaylorMade:{a:"What’s The Dirt?",sortKey:"Whats The Dirt",y:"2024",md:", April 22",t:"Drakes “Taylor Made Freestyle” diss actually explained",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=-qQ9q82tObE"},
  bdEuphoria:{a:"Pearl Fountain",y:"2024",md:", May 1",t:"Kendrick Lamar’s “Euphoria” breakdown: Every Drake diss explained",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=y4aWSTEBRSw"},
  bdSix16:{a:"Pearl Fountain",y:"2024",md:", May 4",t:"Kendrick Lamar’s “6:16 in LA” breakdown: Every Drake diss explained",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=I35DRDAET7s"},
  bdGrahams:{a:"Pearl Fountain",y:"2024",md:", May 4",t:"Kendrick Lamar’s “Meet the Grahams” breakdown: Every Drake diss explained",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=P83__W_Bmp8"},
  bdHP6:{a:"Pearl Fountain",y:"2024",md:", May 6",t:"Drake’s “The Heart Part 6” breakdown: Every Kendrick diss explained",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=WQqqBQSRVpw"},
  bdNotLikeUs:{a:"Pearl Fountain",y:"2024",md:", May 7",t:"Every shot Kendrick took at Drake on “Not Like Us” explained",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=3asDDQ35Wyw"},
  bdFamily:{a:"Diverse Mentality",y:"2024",md:", May 24",t:"Drake’s ‘Family Matters’ - Bar for bar breakdown",kind:"video",cat:"video",url:"https://www.youtube.com/watch?v=SCDbXvbZM7Q"},
  /* ---- cover-art analysis (Song timeline, "Cover art, decoded") ---- */
  igSix16:{a:"Lamar, K. [@kendricklamar]",n:"Lamar",y:"2024",md:", May 3",t:"6:16 in LA",kind:"insta",cat:"music",url:"https://www.instagram.com/reel/C6gdClArPXc/"},
  kaplan2024:{a:"Kaplan, I.",n:"Kaplan",y:"2024",md:", May 3",t:"Kendrick Lamar shares second Drake diss track in one week with Jack Antonoff-produced ‘6:16 in LA’",s:"People (republished by Yahoo News)",kind:"periodical",cat:"news",url:"https://sg.news.yahoo.com/kendrick-lamar-shares-second-drake-192500096.html"},
  cowen2024b:{a:"Cowen, T. W.",n:"Cowen",y:"2024",md:", May 3",t:"Kendrick Lamar drops second Drake diss “6:16 in LA”: ‘Can’t Toosie Slide up outta this one’",s:"Complex",kind:"periodical",cat:"news",url:"https://www.complex.com/music/a/tracewilliamcowen/kendrick-lamar-drake-diss-616-in-la"},
  williams2024:{a:"Williams, A.",n:"Williams",y:"2024",md:", May 3",t:"What do the gloves on Kendrick Lamar’s “6:16 in LA” artwork mean?",s:"Uproxx",kind:"periodical",cat:"news",url:"https://uproxx.com/music/kendrick-lamars-616-in-la-gloves-explained"},
  centeno2024:{a:"Centeno, T. M.",n:"Centeno",y:"2024",md:", May 4",t:"Kendrick Lamar claims Drake has a second child on ‘Meet the Grahams’",s:"iHeartRadio",kind:"periodical",cat:"news",url:"https://www.iheart.com/content/2024-05-04-kendrick-lamar-claims-drake-has-a-second-child-on-meet-the-grahams/"},
  nevares2024:{a:"Bras Nevares, G.",n:"Bras Nevares",y:"2024",md:", May 13",t:"What’s going on with Kendrick Lamar, Drake &amp; the “Meet the Grahams” cover art?",s:"HotNewHipHop",kind:"periodical",cat:"news",url:"https://www.hotnewhiphop.com/801323-meet-grahams-cover-explained-ebonyprince-kendrick-lamar-drake-beef-hip-hop-news"},
  coleHnhh:{a:"Cole, A.",n:"Cole",y:"2024",md:", May 13",t:"Drake vs. Kendrick Lamar: DJ Akademiks alleges Drake lied about Dave Free &amp; Whitney Alford affair",s:"HotNewHipHop",kind:"periodical",cat:"news",url:"https://www.hotnewhiphop.com/801108-drake-kendrick-lamar-dj-akademiks-lied-dave-free-whitney-alford-hip-hop-news"},
  deville2024:{a:"DeVille, C.",n:"DeVille",y:"2024",md:", May 3",t:"Drake unveils latest Kendrick Lamar diss track “Family Matters”",s:"Stereogum",kind:"periodical",cat:"news",url:"https://stereogum.com/2262209/drake-unveils-latest-kendrick-lamar-diss-track-family-matters/music"},
  songfactsFM:{a:"Songfacts",y:"n.d.",t:"Family Matters by Drake",kind:"web",cat:"news",retrieved:"November 23, 2026",url:"https://www.songfacts.com/facts/drake/family-matters"},
  sportskeedaEggs:{a:"Sportskeeda",y:"n.d.",t:"Kendrick Lamar vs Drake rap beef: Exploring all visual easter eggs so far",kind:"web",cat:"news",retrieved:"November 23, 2026",url:"https://sportskeeda.com/us/music/kendrick-lamar-vs-drake-rap-beef-exploring-visual-easter-eggs-far"},
  hellerbach2024:{a:"Hellerbach, M.",n:"Hellerbach",y:"2024",md:", July 5",t:"Decoding Kendrick Lamar’s “Not Like Us” video",s:"Complex",kind:"periodical",cat:"news",url:"https://www.complex.com/music/a/complex/kendrick-lamar-not-like-us-video-decoding-hidden-meanings"},
  /* ---- Genius lyrics pages (links sent by George; the lyrics are not reproduced on this site) ---- */
  gNotLikeUs:{a:"Genius",y:"n.d.",t:"Kendrick Lamar – Not Like Us lyrics",kind:"web",cat:"music",retrieved:"November 23, 2026",url:"https://genius.com/Kendrick-lamar-not-like-us-lyrics"},
  /* ---- AI tool (APA 7 format for generative AI; prompts and responses in appendix.html) ---- */
  spFps:{a:"Drake",y:"2023",t:"First person shooter",desc:"Song featuring J. Cole",album:"For all the dogs",label:"OVO; Republic",kind:"song",cat:"music",url:"https://open.spotify.com/track/7aqfrAY2p9BUSiupwk3svU"},
  spLikeThat:{a:"Future, Metro Boomin, &amp; Lamar, K.",n:"Future et al.",y:"2024",t:"Like that",album:"We don’t trust you",label:"Freebandz; Boominati; Epic; Republic",kind:"song",cat:"music",url:"https://open.spotify.com/track/2tudvzsrR56uom6smgOcSf"},
  spPushUps:{a:"Drake",y:"2024",t:"Push ups",label:"OVO; Republic",kind:"song",cat:"music",url:"https://open.spotify.com/track/3eh51r6rFWAlGQRlHx9QnQ"},
  spEuphoria:{a:"Lamar, K.",n:"Lamar",y:"2024",t:"Euphoria",label:"Interscope",kind:"song",cat:"music",url:"https://open.spotify.com/track/77DRzu7ERs0TX3roZcre7Q"},
  spFamily:{a:"Drake",y:"2024",t:"Family matters",label:"OVO; Republic",kind:"song",cat:"music",url:"https://open.spotify.com/track/1wFFFzJ5EsKbBWZriAcubN"},
  spGrahams:{a:"Lamar, K.",n:"Lamar",y:"2024",t:"Meet the Grahams",label:"Interscope",kind:"song",cat:"music",url:"https://open.spotify.com/track/4S8PxReB1UiDR2F5x1lyIR"},
  spNotLikeUs:{a:"Lamar, K.",n:"Lamar",y:"2024",t:"Not like us",label:"Interscope",kind:"song",cat:"music",url:"https://open.spotify.com/track/6AI3ezQ4o3HUoP6Dhudph3"},
  rossignol2024:{a:"Rossignol, D.",n:"Rossignol",y:"2024",md:", April 19",t:"Drake officially releases ‘Push Ups’ and the cover art is a brutal Kendrick Lamar diss",s:"Uproxx",kind:"periodical",cat:"news",url:"https://uproxx.com/music/drake-push-ups-kendrick-lamar-diss-cover-art"},
  fitzgerald2024:{a:"Fitzgerald, T.",n:"Fitzgerald",y:"2024",md:", May 6",t:"All the visual Easter eggs in Drake and Kendrick Lamar’s lyrical battle",s:"XXL",kind:"periodical",cat:"news",url:"https://www.xxlmag.com/drake-kendrick-lamar-easter-eggs-lyrical-battle/"},
  deville2023:{a:"DeVille, C.",n:"DeVille",y:"2023",md:", October 6",t:"Stream Drake’s new album <i>For All the Dogs</i>",s:"Stereogum",kind:"periodical",cat:"news",url:"https://stereogum.com/2234099/stream-drakes-new-album-for-all-the-dogs/music"},
  blake2024:{a:"Blake, C.",n:"Blake",y:"2024",md:", May 5",t:"Kendrick Lamar changes “Meet the Grahams” cover art for streaming release, fans debate why",s:"HotNewHipHop",kind:"periodical",cat:"news",url:"https://www.hotnewhiphop.com/797589-kendrick-lamar-changes-meet-the-grahams-cover-art-streaming-fans-debate-hip-hop-news"},
  anthropic2026:{a:"Anthropic",y:"2026",t:"Claude",ver:"Opus 5.5 version",desc:"Large language model",kind:"ai",cat:"ai",url:"https://claude.ai"}
};

/* ---------------------------------------------------------------------
   STORY TIMELINE (Story view)
   --------------------------------------------------------------------- */
const PHASES = {1:"Phase 1 · The spark",2:"Phase 2 · The 16 days",3:"Phase 3 · The victory lap",4:"Phase 4 · The courtroom and the comeback"};
const SIDE_LABEL = {drake:"Drake",kendrick:"Kendrick",platform:"Platforms & media",court:"Courts",other:"Context"};

const EVENTS = [
  {id:"fps",p:1,side:"drake",date:"Oct 2023",title:"“First Person Shooter” names a “big three”",
   what:`On Drake’s album <i>For All the Dogs</i>, J. Cole raps that fans argue over whether he, Drake or Kendrick is the best, casting the three as rap’s big three ${c("ktvu2024")}.`,
   sf:`A ranking line is built for argument. It hands fans a ready-made question (who is number one?) to fight about in comments and stitches.`},
  {id:"like-that",p:1,side:"kendrick",date:"Mar 22, 2024",title:"“Like That”: Kendrick rejects the big three",
   what:`Kendrick’s guest verse on Future and Metro Boomin’s “Like That” dismisses the big-three idea and claims the top spot for himself ${c("ktvu2024")}. The song debuted at No. 1 on the Billboard Hot 100 ${c("stereogum2024")}.`,
   sf:`Fans treated the verse as a puzzle, decoding lines and building theories in posts and reaction videos ${c("cirisano2024")}. The feud was something to take part in before Drake had said a word.`},
  {id:"cole",p:1,side:"other",date:"Apr 7, 2024",title:"J. Cole steps out",
   what:`J. Cole released a response, “7 Minute Drill,” then apologized on stage at his Dreamville Festival two days later, called it a misstep and pulled the song ${c("cbc2024b","xxlRemoved")}.`,
   sf:`With Cole gone, the story shrank to two people. Two sides make “pick a team” content easy, since every meme can show which side you are on ${c("mercante2024")}. <a href="#cole">Read the J. Cole case study</a>.`},
  {id:"push-ups",p:1,side:"drake",date:"Apr 13 & 19, 2024",title:"“Push Ups” leaks, then drops",
   what:`Drake’s first reply leaked online on April 13 and was officially released on April 19 ${c("thegrio2024")}. Its title mocked Kendrick for posting push-up videos on Instagram ${c("cbc2024b")}.`,
   sf:`The song answered a social-media habit, Kendrick’s workout clips. Much of the feud was built from things fans had already seen on their feeds.`},
  {id:"taylor-made",p:2,side:"drake",sfFlag:1,date:"Apr 19–26, 2024",title:"“Taylor Made Freestyle” and the AI Tupac",
   what:`Drake posted “Taylor Made Freestyle” to Instagram using AI-generated voices imitating Tupac Shakur and Snoop Dogg. Tupac’s estate sent a cease-and-desist letter, and by April 26 the song was gone from Drake’s social accounts ${c("cbc2024a")}.`,
   sf:`The track lived only on social media, not on streaming services ${c("cirisano2024")}, and it pulled AI voice-cloning into the centre of the feud ${c("davis2024")}.`},
  {id:"euphoria",p:2,side:"kendrick",date:"Apr 30, 2024",title:"“Euphoria”",
   what:`Kendrick’s six-minute reply goes after Drake’s skill, appearance, identity, parenting and use of AI ${c("ktvu2024")}.`,
   sf:`A long, reference-heavy song creates demand for explainers, and creators and lyric sites raced to break it down ${c("cirisano2024")}.`},
  {id:"six16",p:2,side:"kendrick",sfFlag:1,date:"May 3, 2024",title:"“6:16 in LA” (Instagram only)",
   what:`Kendrick released “6:16 in LA” only on Instagram ${c("thegrio2024")}. It hinted that someone inside Drake’s OVO camp was feeding him information ${c("root2024a")}.`,
   sf:`The song’s first home was a social feed, not Spotify ${c("cirisano2024")}. The “mole” hint instantly became its own genre of memes and fan theories ${c("root2024a")}.`},
  {id:"family-matters",p:2,side:"drake",sfFlag:1,date:"May 3, 2024 (night)",title:"“Family Matters,” with a music video",
   what:`Drake released a nearly eight-minute track and video accusing Kendrick of abuse and infidelity ${c("ktvu2024")}. It debuted at No. 7 on the Hot 100 ${c("hypebeast2024")}.`,
   sf:`It dropped on a Friday night, when streamers on Twitch, YouTube and Kick were live and competing to react first ${c("davis2024")}.`},
  {id:"grahams",p:2,side:"kendrick",sfFlag:1,date:"May 3–4, 2024",title:"“Meet the Grahams,” about 20 minutes later",
   what:`Roughly twenty minutes after “Family Matters,” Kendrick answered with “Meet the Grahams,” which addresses Drake’s family and claims he has a secret daughter ${c("thegrio2024")}.`,
   sf:`Reply time was now measured in minutes. In Drake’s 2015 feud with Meek Mill, two answer songs came over four days ${c("davis2024")}. Speed like this rewards whoever is already on the feed.`},
  {id:"not-like-us",p:2,side:"kendrick",sfFlag:1,date:"May 4, 2024",title:"“Not Like Us”",
   what:`Over a Mustard-produced West Coast party beat, Kendrick casts Drake as a cultural outsider and accuses him of preying on minors ${c("ap2025")}. The cover art used an aerial photo of Drake’s Toronto home marked with sex-offender map icons ${c("fader2025")}.`,
   sf:`This was the first song in the feud shaped like a short-form sound: a chantable hook, a producer tag fans could shout, a dance beat and lines that work without context. See “participability” in the analysis.`},
  {id:"heart-part-6",p:2,side:"drake",sfFlag:1,date:"May 5, 2024",title:"“The Heart Part 6”",
   what:`Drake denied the accusations and claimed his team had fed Kendrick false information about a secret daughter ${c("billboard2024")}.`,
   sf:`By then the secret-daughter claim was already a meme on X, Reddit and TikTok ${c("kymdaughter")}. A correction inside a song could not catch a joke that had already spread.`},
  {id:"bbl-drizzy",p:2,side:"platform",sfFlag:1,date:"May 5, 2024",title:"Metro Boomin’s “BBL Drizzy” beat",
   what:`Producer Metro Boomin released a free beat sampling “BBL Drizzy,” a parody song that comedian King Willonius made with the AI music tool Udio, and promised a free beat for the best verse over it, raising the prize to $10,000 the next day ${c("roytburg2024","coleman2024")}.`,
   sf:`Thousands of people answered with their own disses, remixes and dances on TikTok, Instagram, X and YouTube ${c("power1051a","dexerto2024")}. Major labels later sued the company behind Udio ${c("xxl2024")}. <a href="#openverse">Read the open-verse case study</a>.`},
  {id:"shooting",p:2,side:"other",date:"May 7, 2024",title:"Shooting outside Drake’s Toronto home",
   what:`A security guard was shot outside Drake’s Toronto mansion. At the time, police did not say the feud was connected ${c("ktvu2024")}.`,
   sf:`Social media filled the gap with competing theories about who was responsible ${c("kym2025")}. Online speculation and a real injury collided.`},
  {id:"number-one",p:3,side:"kendrick",date:"May 13, 2024",title:"No. 1 on the Hot 100",
   what:`“Not Like Us” debuted at No. 1 with 70.9 million U.S. streams in its first tracking week, even though it came out near the end of that week ${c("hypebeast2024")}.`,
   sf:`Chart success fed back into the feed. “Kendrick won” became a claim with numbers fans could screenshot.`},
  {id:"pop-out",p:3,side:"kendrick",sfFlag:1,date:"Jun 19, 2024",title:"The Pop Out: five times in a row",
   what:`At his Juneteenth concert at the Kia Forum in Inglewood, Kendrick performed “Not Like Us” five times in a row. The show was livestreamed on Amazon Music’s Twitch channel ${c("bet2024")}.`,
   sf:`A livestream with five restarts is a clip factory. Each run-through gave viewers another crowd moment to cut and post.`},
  {id:"music-video",p:3,side:"kendrick",date:"Jul 4, 2024",title:"The music video",
   what:`Released on U.S. Independence Day, the video passed 12 million YouTube views within about 12 hours ${c("hotpress2024")}.`,
   sf:`Its cameos and symbols gave explainer creators fresh material to decode, frame by frame.`},
  {id:"dnc",p:3,side:"platform",sfFlag:1,date:"Aug 20, 2024",title:"From diss track to all-purpose anthem",
   what:`During the Democratic National Convention’s roll call, the DJ played “Not Like Us” for California. The song had already been reworked at the BET Awards and danced to by Serena Williams at the ESPYs ${c("trapp2024")}.`,
   sf:`The song had escaped the feud. Clips now set it under politics, sports and award shows, which is context collapse in action ${c("marwick2011")}.`},
  {id:"gnx",p:3,side:"kendrick",date:"Nov 22, 2024",title:"Surprise album: <i>GNX</i>",
   what:`Kendrick dropped his sixth album, <i>GNX</i>, with no advance singles ${c("landrum2024")}.`,
   sf:`No traditional rollout was needed. The feud had already done the promotion.`},
  {id:"petitions",p:3,side:"court",sfFlag:1,date:"Nov 25, 2024",title:"Drake says the virality was bought",
   what:`Drake filed legal petitions claiming UMG used bots and paid influencers and radio stations to push “Not Like Us,” and charged Spotify a lower licensing fee in exchange for promoting it. UMG called the claims offensive and untrue ${c("npr2024a")}.`,
   sf:`This challenged the “people’s verdict” head-on. If clips and streams could be bought, the internet had not judged the feud on its own.`},
  {id:"lawsuit",p:3,side:"court",sfFlag:1,date:"Jan 15, 2025",title:"Drake sues his own label",
   what:`Drake dropped the petitions and sued UMG, not Kendrick, for defamation and harassment ${c("fader2025")}. The complaint cited the cover art, attempted break-ins at his home, the shooting and online harassment ${c("npr2025")}.`,
   sf:`It also named popular reaction videos, including a Kai Cenat video with more than 9 million views, as proof that UMG let creators repost the song freely ${c("stanton2025")}. Reaction clips had become courtroom exhibits.`},
  {id:"grammys",p:3,side:"kendrick",date:"Feb 2, 2025",title:"Five Grammys",
   what:`“Not Like Us” won five Grammys, including Record of the Year and Song of the Year ${c("katersky2025")}.`,
   sf:`Traditional gatekeepers now agreed with the verdict the feed had reached months earlier.`},
  {id:"super-bowl",p:3,side:"kendrick",sfFlag:1,date:"Feb 9, 2025",title:"Super Bowl LIX halftime show",
   what:`Kendrick’s halftime show drew 133.5 million viewers, the largest halftime audience on record ${c("guinness2025")}. The stadium sang the “A minor” line ${c("avclub2025")}, and Serena Williams, who had been linked to Drake, crip-walked during “Not Like Us” ${c("dailydot2025")}.`,
   sf:`His grin on the “Say Drake” line went viral on TikTok right after the show, then became green-screen and CapCut templates ${c("carry2025")}.`},
  {id:"dismissal",p:4,side:"court",sfFlag:1,date:"Oct 9, 2025",title:"Judge dismisses the lawsuit",
   what:`Judge Jeannette Vargas ruled the lyrics were nonactionable opinion, pointing to “the broader context of a heated rap battle” ${c("ap2025")}. She also rejected the bot and payola claims, criticizing their reliance on online comments and unverified reports ${c("courthouse2025")}.`,
   sf:`The court refused to treat social-media speculation as evidence, and treated the famously public battle as the context a reasonable listener would understand.`},
  {id:"appeal",p:4,side:"court",date:"Jan 21, 2026",title:"Drake appeals",
   what:`Drake’s 117-page brief to the Second Circuit argues the ruling creates a “dangerous categorical rule” that diss tracks can never be defamatory ${c("mbw2026")}.`,
   sf:`His lawyers say the judge was wrong to read the song only inside the whole battle ${c("mbw2026")}. Many people met it as a chant, not as a battle.`},
  {id:"pushback",p:4,side:"court",date:"Mar–Apr 2026",title:"UMG and legal scholars push back",
   what:`UMG called the appeal “astoundingly hypocritical” ${c("rollingstone2026")}. Two groups of legal scholars filed briefs supporting the dismissal ${c("thornton2026")}.`,sf:""},
  {id:"iceman",p:4,side:"drake",sfFlag:1,date:"May 15, 2026",title:"Drake’s comeback: <i>Iceman</i>",
   what:`After previewing it in a YouTube livestream series, Drake released three albums at once ${c("fader2026")}. <i>Iceman</i> debuted at No. 1 with 463,000 units, and the three albums took the top three spots, a first ${c("ocho2026")}.`,
   sf:`Even the comeback was staged as livestream “episodes,” the same format that had clipped his losses.`},
  {id:"hearing",p:4,side:"court",upcoming:true,date:"Dec 4, 2026",title:"Appeal hearing",
   what:`A three-judge panel of the Second Circuit is scheduled to hear oral arguments. A ruling will follow at an unannounced date ${c("dalugdug2026")}.`,sf:""}
];

/* ---------------------------------------------------------------------
   SONG TIMELINE (Songs view)
   Lyrics are NOT reproduced (copyright). Each song is broken into parts
   and described in my own words. "back" lists BACKSTORY ids it points to.
   --------------------------------------------------------------------- */
const BACKSTORY = [
  {id:"take-care",d:"2011-11-15",date:"2011",title:"Kendrick features on Drake’s <i>Take Care</i>",
   text:`Back when they were collaborators, Kendrick appeared on “Buried Alive Interlude” on Drake’s 2011 album <i>Take Care</i> ${c("phillips2024")}.`},
  {id:"control",d:"2013-08-13",date:"Aug 2013",title:"Kendrick’s “Control” verse",
   text:`On Big Sean’s “Control,” Kendrick named Drake and other peers as rivals he wanted to beat, the first public crack in their friendship ${c("usatoday2024")}.`},
  {id:"atlanta",d:"2013-09-01",date:"2013 →",title:"Drake’s Atlanta connection",
   text:`Drake has long called Atlanta a second home, including on the Migos “Versace” remix, and has worked with many of its biggest rappers ${c("root2024b")}.`},
  {id:"bad-blood",d:"2015-05-17",date:"2015",title:"Kendrick’s pop features",
   text:`Kendrick guested on Taylor Swift’s “Bad Blood” remix and later on a Maroon 5 single, features Drake would mock as label-driven ${c("songfacts")}.`},
  {id:"meek",d:"2015-07-22",date:"Jul 2015",title:"Meek Mill’s ghostwriting accusation",
   text:`Meek Mill accused Drake of using ghostwriters. Drake answered with two songs in four days and won largely through memes ${c("davis2024","avclub2024")}.`},
  {id:"adonis",d:"2018-05-29",date:"May 2018",title:"Pusha T reveals Drake’s son",
   text:`Pusha T’s diss “The Story of Adidon” revealed that Drake had a son, Adonis, whom he had not talked about publicly ${c("stereogum2018","fox4_2024")}.`},
  {id:"hbo-euphoria",d:"2019-06-16",date:"2019 →",title:"HBO’s <i>Euphoria</i>",
   text:`Drake is an executive producer of HBO’s teen drama <i>Euphoria</i> ${c("npr2024c")}.`},
  {id:"clb",d:"2021-09-03",date:"Sep 2021",title:"Drake’s <i>Certified Lover Boy</i>",
   text:`Drake’s 2021 album title would later be twisted into one of the feud’s harshest accusations ${c("americansongwriter2024")}.`},
  {id:"mr-morale",d:"2022-05-13",date:"May 2022",title:"Kendrick’s <i>Mr. Morale &amp; The Big Steppers</i>",
   text:`A confessional album in which Kendrick discussed infidelity, therapy and family trauma, and which included “The Heart Part 5.” Drake later mined it for ammunition ${c("phillips2024","hnhh2024")}.`},
  {id:"fps-bs",d:"2023-10-06",date:"Oct 2023",title:"“First Person Shooter”",
   text:`J. Cole names himself, Drake and Kendrick as rap’s big three ${c("ktvu2024")}.`},
  {id:"wdty",d:"2024-03-22",date:"Mar–Apr 2024",title:"Rap’s “Avengers” turn on Drake",
   text:`Future and Metro Boomin’s two albums featured Kendrick, Rick Ross, The Weeknd and A$AP Rocky, several taking shots at Drake ${c("rollingstone2024","stereogumLeak")}.`},
  {id:"cole-bs",d:"2024-04-07",date:"Apr 7, 2024",title:"J. Cole apologizes",
   text:`Cole withdrew from the fight on stage at Dreamville Festival ${c("cbc2024b")}.`},
  {id:"ross",d:"2024-04-15",date:"Apr 15, 2024",title:"Rick Ross coins “BBL Drizzy”",
   text:`While promoting his own diss, Rick Ross mocked Drake online with the “BBL Drizzy” nickname, which inspired King Willonius’s AI song ${c("uproxx2024a")}.`},
  {id:"swift-week",d:"2024-04-19",date:"Apr 19, 2024",title:"Taylor Swift’s album week",
   text:`Drake’s “Taylor Made” taunt landed the week Taylor Swift released a new album, joking that Kendrick needed her approval to reply ${c("songfacts")}.`},
  {id:"estate",d:"2024-04-24",date:"Apr 24, 2024",title:"Tupac’s estate objects to AI voice",
   text:`The estate’s cease-and-desist letter forced “Taylor Made Freestyle” offline ${c("cbc2024a")}.`}
];

const SONGS = [
  {id:"fps",breakdown:{yt:"-4QMAsYBGcY",ref:"bdLikeThat",start:35,lead:`Want the background explained? This video starts at 0:35, where it gets to this song’s “big three” idea.`,note:`No breakdown video of this song alone was found. This one is about “Like That,” and it starts at the chapter where Markman explains the “big three” idea from this song.`},cover:{sp:"7aqfrAY2p9BUSiupwk3svU",ref:"spFps",note:`The cover of <i>For All the Dogs</i>, the album this song is on. It was drawn by Drake’s son, Adonis ${c("deville2023")}.`},play:{yt:"sRs2o36a1Us",ref:"sFps"},artist:"drake",by:"Drake feat. J. Cole",title:"First Person Shooter",d:"2023-10-06",date:"Oct 2023",home:"Album track (streaming)",prologue:true,
   answers:[],answeredBy:["likethat"],
   parts:[
    {label:"J. Cole’s verse",text:`Cole asks who the best rapper alive is, naming himself, Drake and Kendrick, and settles on the three of them as a [[bs:fps-bs|“big three”]] ${c("ktvu2024")}.`,back:["fps-bs"]},
    {label:"Why it mattered",text:`Coverage later described the line as the accidental spark. It turned [[bs:control|a decade of quiet rivalry]] into a public ranking that invited a reply ${c("ktvu2024","thegrio2024")}.`,back:["control"]}
   ]},
  {id:"likethat",breakdown:{yt:"-4QMAsYBGcY",ref:"bdLikeThat",note:`Posted the day the song came out.`},cover:{sp:"2tudvzsrR56uom6smgOcSf",ref:"spLikeThat",note:`The cover of <i>We Don’t Trust You</i>, Future and Metro Boomin’s album, where Kendrick’s verse first appeared.`},play:{yt:"N9bKBAA22Go",ref:"sLikeThat"},artist:"kendrick",by:"Future, Metro Boomin &amp; Kendrick Lamar",title:"Like That",d:"2024-03-22",date:"Mar 22, 2024",home:"Album track (streaming)",
   answers:["fps"],answeredBy:["pushups","taylormade"],
   parts:[
    {label:"Kendrick’s verse",text:`Kendrick rejects [[song:fps|the big-three idea]] outright and claims the top spot for himself alone ${c("ktvu2024")}.`,back:["fps-bs","control"]},
    {label:"Who else was on it",text:`The album it came from was part of [[bs:wdty|a wider turn against Drake]] by Future, Metro Boomin and their collaborators ${c("rollingstone2024")}.`,back:["wdty"]},
    {label:"Result",text:`The song debuted at No. 1 on the Billboard Hot 100 ${c("stereogum2024")}.`,back:[]}
   ]},
  {id:"pushups",breakdown:{yt:"3VGZC2-5pgU",ref:"bdPushUps",note:`Made from the version that leaked on April 13, before the official release on April 19.`},cover:{sp:"3eh51r6rFWAlGQRlHx9QnQ",ref:"spPushUps",note:`A sneaker’s size tag for a size 7 shoe: a jab at Kendrick’s height ${c("rossignol2024","fitzgerald2024")}.`},play:{yt:"HKH9p19PRLA",ref:"sPushUps"},artist:"drake",by:"Drake",title:"Push Ups",d:"2024-04-19",date:"Apr 13 leak · Apr 19 release",home:"Leaked online, then streaming",
   answers:["likethat"],answeredBy:["euphoria"],
   parts:[
    {label:"Title and hook",text:`The title mocks Kendrick’s Instagram workout clips ${c("cbc2024b")}, and the hook claims Kendrick had to hand half his earnings to his old label, Top Dawg Entertainment ${c("uproxx2024b")}.`,back:[]},
    {label:"The pop features",text:`Drake says Kendrick was sent to write verses for [[bs:bad-blood|Maroon 5 and Taylor Swift’s fans]], casting his pop features as label orders ${c("songfacts")}.`,back:["bad-blood"]},
    {label:"Everyone else",text:`Drake also hits Future, Metro Boomin, The Weeknd and Rick Ross for [[bs:wdty|joining the pile-on]] ${c("stereogumLeak")}.`,back:["wdty"]}
   ]},
  {id:"taylormade",breakdown:{yt:"-qQ9q82tObE",ref:"bdTaylorMade",note:`Posted while the song was still on Instagram. The first few minutes look back at “Push Ups.”`},nocover:`No official cover. The song was only ever posted on social media.`,noplay:`There is no official version to play. Drake posted it only on social media and took it down within a week after Tupac’s estate objected ${c("cbc2024a")}.`,artist:"drake",by:"Drake",title:"Taylor Made Freestyle",d:"2024-04-19",date:"Apr 19, 2024",home:"Instagram only, removed Apr 26",
   answers:["likethat"],answeredBy:["euphoria"],
   parts:[
    {label:"The AI guests",text:`Drake used [[bs:estate|AI-generated imitations of Tupac Shakur and Snoop Dogg]], two of Kendrick’s West Coast heroes, to goad him into replying ${c("cbc2024b")}.`,back:["estate"]},
    {label:"The Swift taunt",text:`Drake jokes that Kendrick can’t reply until [[bs:swift-week|Taylor Swift finishes her album rollout]] ${c("songfacts")}.`,back:["swift-week","bad-blood"]},
    {label:"Afterlife",text:`[[lg:lg-estate|Tupac’s estate threatened legal action]] and the song came down within a week ${c("cbc2024a")}.`,back:["estate"]}
   ]},
  {id:"euphoria",breakdown:{yt:"y4aWSTEBRSw",ref:"bdEuphoria",note:`Posted the day after the song came out.`},cover:{sp:"77DRzu7ERs0TX3roZcre7Q",ref:"spEuphoria",note:`A screenshot of a dictionary’s definition of “euphoria.” XXL read it as a jab at Drake, an executive producer of HBO’s <i>Euphoria</i> ${c("fitzgerald2024")}.`},play:{yt:"fAqa1ozCuj8",ref:"sEuphoria"},artist:"kendrick",by:"Kendrick Lamar",title:"Euphoria",d:"2024-04-30",date:"Apr 30, 2024",home:"Streaming and YouTube",
   answers:["pushups","taylormade"],answeredBy:["familymatters"],
   parts:[
    {label:"The title",text:`It nods to [[bs:hbo-euphoria|HBO’s <i>Euphoria</i>]], which Drake executive-produces ${c("npr2024c")}.`,back:["hbo-euphoria"]},
    {label:"Slow opening",text:`Kendrick casts Drake as a manipulator inventing family stories because he had heard [[bs:mr-morale|Kendrick’s confessional album]] ${c("hnhh2024")}.`,back:["mr-morale"]},
    {label:"AI and ghostwriters",text:`He mocks [[song:taylormade|the AI Tupac verse]] and revives [[bs:meek|the old claim that Drake relies on other writers]] ${c("yahoo2024","npr2024c")}.`,back:["estate","meek"]},
    {label:"Identity and fatherhood",text:`He questions Drake’s authenticity, racial identity and [[bs:adonis|parenting]] ${c("ktvu2024")}.`,back:["adonis"]}
   ]},
  {id:"six16",breakdown:{yt:"I35DRDAET7s",ref:"bdSix16",note:`Posted the night after the Instagram release.`},nocover:`No single cover. The song was released only as an Instagram Reel, and the Reel’s image, a black Maybach glove, works as its cover.`,noplay:`There is no official upload to play here. Kendrick released it only as an Instagram post, not on YouTube or streaming services ${c("cirisano2024")}. Kendrick’s original post plays in the cover analysis below.`,artist:"kendrick",by:"Kendrick Lamar",title:"6:16 in LA",d:"2024-05-03",date:"May 3, 2024",home:"Instagram only",
   answers:["pushups"],answeredBy:["familymatters"],
   parts:[
    {label:"The title",text:`A timestamp title, borrowing the format of Drake’s own series of timestamped songs ${c("stereogumHP6")}.`,back:[]},
    {label:"The mole",text:`Kendrick hints that people inside Drake’s OVO camp are [[song:hp6|feeding him information]], which set off a wave of fan theories ${c("root2024a")}.`,back:[]},
    {label:"Where it lived",text:`It appeared on Instagram rather than streaming services ${c("cirisano2024")}.`,back:[]}
   ]},
  {id:"familymatters",breakdown:{yt:"SCDbXvbZM7Q",ref:"bdFamily",note:`About 47 minutes long. It was first streamed live three weeks after the song came out.`},cover:{sp:"1wFFFzJ5EsKbBWZriAcubN",ref:"spFamily",note:`The single’s cover.`},play:{yt:"ZkXG3ZrXlbc",ref:"sFamily"},artist:"drake",by:"Drake",title:"Family Matters",d:"2024-05-03",date:"May 3, 2024",home:"Music video and streaming",
   answers:["euphoria","six16"],answeredBy:["grahams","notlikeus"],
   parts:[
    {label:"The teaser",text:`Before release, Drake posted a parody of [[bs:take-care|“Buried Alive Interlude,” the <i>Take Care</i> song Kendrick had been featured on]] ${c("phillips2024")}.`,back:["take-care"]},
    {label:"Kendrick’s relationship",text:`Drake accuses Kendrick of abusing and cheating on his fiancée, leaning on [[bs:mr-morale|what Kendrick had admitted on <i>Mr. Morale</i>]] ${c("phillips2024","stereogumFM")}.`,back:["mr-morale"]},
    {label:"Paternity claim",text:`He suggests one of Kendrick’s children may have been fathered by Kendrick’s business partner, Dave Free ${c("stereogumFM")}.`,back:[]},
    {label:"Turning “Euphoria” around",text:`He answers [[song:euphoria|Kendrick’s questions about his identity]] by pointing at Kendrick’s own family, and takes shots at [[bs:wdty|Metro Boomin, A$AP Rocky and Rick Ross]] ${c("stereogumFM","phillips2024")}.`,back:["wdty"]}
   ]},
  {id:"grahams",breakdown:{yt:"P83__W_Bmp8",ref:"bdGrahams",note:`Also explains the original YouTube cover art.`},cover:{sp:"4S8PxReB1UiDR2F5x1lyIR",ref:"spGrahams",note:`On streaming services the cover is plain black. The original YouTube version showed a pile of items that allegedly exposed Drake, including prescription pills and an Ozempic box with his name on it ${c("fitzgerald2024")}. Kendrick removed that art for the streaming release ${c("blake2024")}.`},play:{yt:"J_tchksaJCM",ref:"sGrahams"},artist:"kendrick",by:"Kendrick Lamar",title:"Meet the Grahams",d:"2024-05-04",date:"May 3–4, 2024",home:"YouTube",
   answers:["familymatters"],answeredBy:["hp6"],
   parts:[
    {label:"A letter to the family",text:`Written as open letters to [[bs:adonis|Drake’s son]], his parents, an alleged daughter and finally Drake himself ${c("fox4_2024")}.`,back:["adonis"]},
    {label:"A second hidden child",text:`Kendrick claims Drake has a secret daughter, echoing [[bs:adonis|how Pusha T exposed Drake’s son in 2018]] ${c("fox4_2024")}.`,back:["adonis"]},
    {label:"Widening the accusations",text:`He calls Drake a deadbeat father and alleges sexual misconduct around Drake’s circle ${c("thegrio2024")}.`,back:[]}
   ]},
  {id:"notlikeus",breakdown:{yt:"3asDDQ35Wyw",ref:"bdNotLikeUs",note:`Posted three days after the song came out.`},cover:{sp:"6AI3ezQ4o3HUoP6Dhudph3",ref:"spNotLikeUs",note:`An aerial photo of Drake’s Toronto home marked with sex-offender map icons. Drake’s lawsuit later pointed to it as a safety threat ${c("fader2025")}.`},genius:"gNotLikeUs",play:{yt:"T6eK-2OQtew",ref:"sNotLikeUs"},artist:"kendrick",by:"Kendrick Lamar",title:"Not Like Us",d:"2024-05-04",date:"May 4, 2024",home:"YouTube and streaming",
   answers:["familymatters"],answeredBy:["hp6"],
   parts:[
    {label:"The sound",text:`A Mustard-produced West Coast party beat with a call-and-response hook, the opposite of the long, dense tracks before it ${c("ap2025","bet2024")}.`,back:[]},
    {label:"The accusation",text:`Kendrick accuses Drake and members of his OVO circle of preying on minors, twisting [[bs:clb|the title of Drake’s 2021 album]] to do it ${c("americansongwriter2024")}.`,back:["clb"]},
    {label:"The Atlanta verse",text:`He says Drake [[bs:atlanta|borrowed credibility from Atlanta rappers]] and calls him a colonizer of the culture ${c("ap2025","root2024b")}.`,back:["atlanta"]},
    {label:"The cover art",text:`An aerial photo of Drake’s Toronto home dotted with sex-offender map icons, later cited in [[lg:lg-lawsuit|Drake’s lawsuit]] ${c("fader2025")}.`,back:[]},
    {label:"The “A minor” line",text:`A short pun that became the song’s most-shouted moment, later sung by [[ev:super-bowl|a whole Super Bowl stadium]] ${c("avclub2025")}.`,back:[]}
   ]},
  {id:"hp6",breakdown:{yt:"WQqqBQSRVpw",ref:"bdHP6",note:`Posted early the morning after the song came out.`},nocover:`Not on Spotify. The song came out as a YouTube link, so the official upload below is the only version.`,play:{yt:"HJeY-FXidDQ",ref:"sHP6"},artist:"drake",by:"Drake",title:"The Heart Part 6",d:"2024-05-05",date:"May 5, 2024",home:"YouTube link",
   answers:["grahams","notlikeus"],answeredBy:[],
   parts:[
    {label:"The title and cover",text:`The title borrows [[bs:mr-morale|Kendrick’s own “The Heart” series]], and the cover shows an Instagram comment by Dave Free ${c("billboard2024","stereogumHP6")}.`,back:["mr-morale"]},
    {label:"The denial",text:`Drake denies [[song:notlikeus|the pedophilia accusations]] ${c("stereogumHP6")}.`,back:[]},
    {label:"The bait claim",text:`He says his team planted [[song:grahams|the secret-daughter story]] so Kendrick would use it ${c("billboard2024")}.`,back:[]},
    {label:"Back to <i>Mr. Morale</i>",text:`He returns to [[bs:mr-morale|Kendrick’s album, especially “Mother I Sober,”]] to repeat his claims about Kendrick’s family ${c("hnhh2024")}.`,back:["mr-morale"]}
   ]}
];

/* Time between each release and the next one (same order as SONGS).
   Dates from theGrio (2024) and KTVU (2024); "~20 min" from theGrio. */
const DROP_GAPS = ["5½ months","4 weeks","same day","11 days","3 days","same day","~20 min","same day","1 day"];

/* ---------------------------------------------------------------------
   LEGAL & REAL-WORLD TIMELINE (Legal view)
   lane: real | court | industry
   --------------------------------------------------------------------- */
const LEGAL = [
  {id:"lg-estate",d:"2024-04-24",date:"Apr 24–26, 2024",lane:"industry",exit:"First lawyer involved",title:"Tupac’s estate sends a cease-and-desist",
   text:`A lawyer for Tupac Shakur’s estate demanded Drake remove the AI-voiced “Taylor Made Freestyle.” It was gone from his accounts two days later ${c("cbc2024a")}.`},
  {id:"lg-shooting",d:"2024-05-07",date:"May 7, 2024",lane:"real",exit:"First real-world violence",title:"Security guard shot outside Drake’s home",
   text:`A guard was shot outside Drake’s Toronto mansion. Police did not say the feud was connected ${c("ktvu2024")}.`},
  {id:"lg-breakins",d:"2024-05-09",date:"Spring 2024",lane:"real",title:"More attempted break-ins",
   text:`Drake’s later lawsuit counts three attempted home invasions at his Toronto residence that spring ${c("npr2025")}.`},
  {id:"lg-harassment",d:"2024-06-15",date:"2024",lane:"real",title:"Harassment, flyers and a child pulled from school",
   text:`The lawsuit also describes months of online hate, a flyer posted near his home calling him a predator, and his decision to take his son out of school for safety. These are claims in a complaint, not court findings ${c("npr2025")}.`},
  {id:"lg-udio",d:"2024-06-24",date:"Jun 2024",lane:"industry",title:"Labels sue the AI tool behind “BBL Drizzy”",
   text:`Major record labels and the RIAA sued Udio, the AI music company whose tool made the original “BBL Drizzy” ${c("xxl2024")}.`},
  {id:"lg-dnc",d:"2024-08-20",date:"Aug 20, 2024",lane:"industry",title:"The song enters politics",
   text:`“Not Like Us” played during California’s turn at the Democratic National Convention roll call ${c("trapp2024")}.`},
  {id:"lg-petitions",d:"2024-11-25",date:"Nov 25, 2024",lane:"court",title:"Petitions in New York and Texas",
   text:`Drake filed pre-action petitions accusing UMG, Spotify and iHeartMedia of bots and pay-to-play schemes to boost “Not Like Us” ${c("npr2024a","adn2024")}.`},
  {id:"lg-lawsuit",d:"2025-01-15",date:"Jan 14–15, 2025",lane:"court",title:"Federal defamation lawsuit",
   text:`Drake dropped the New York petition and sued UMG, not Kendrick, in federal court for defamation and harassment ${c("fader2025","npr2025")}.`},
  {id:"lg-streamers",d:"2025-01-20",date:"Jan 2025",lane:"court",title:"Reaction videos named as evidence",
   text:`The complaint pointed to reaction videos by Kai Cenat and other creators as proof the song was spread unusually freely, and the creators answered with more reaction videos ${c("stanton2025")}.`},
  {id:"lg-iheart",d:"2025-02-27",date:"Feb 27, 2025",lane:"court",title:"iHeartMedia dropped from Texas petition",
   text:`Drake and iHeartMedia reached what both called an amicable resolution ${c("mbw2025a")}. iHeartMedia said no payments were made by either side ${c("insurancejournal2025")}.`},
  {id:"lg-mtd",d:"2025-03-17",date:"Mar 17, 2025",lane:"court",title:"UMG asks the court to dismiss",
   text:`UMG called the lawsuit an attempt to salve the wounds of a lost rap battle and asked for dismissal ${c("mbw2025b")}.`},
  {id:"lg-amended",d:"2025-05-07",date:"Apr–May 2025",lane:"court",title:"Super Bowl added to the complaint",
   text:`Drake amended his complaint to add the Super Bowl halftime performance, and UMG moved to dismiss again ${c("welch2025")}. His suit treated the halftime show as part of what he called UMG’s campaign for the song ${c("weiss2025")}.`},
  {id:"lg-dismissed",d:"2025-10-09",date:"Oct 9, 2025",lane:"court",title:"Lawsuit dismissed",
   text:`Judge Vargas ruled the lyrics were opinion in the context of a rap battle ${c("ap2025")}, and criticized the bot claims’ reliance on online comments ${c("courthouse2025")}.`},
  {id:"lg-notice",d:"2025-10-29",date:"Oct 29, 2025",lane:"court",title:"Notice of appeal",
   text:`Drake formally started his appeal to the Second Circuit ${c("rollingstone2025")}.`},
  {id:"lg-brief",d:"2026-01-21",date:"Jan 21, 2026",lane:"court",title:"Drake’s opening brief",
   text:`His 117-page brief argues the ruling makes diss tracks immune from defamation law ${c("mbw2026")}.`},
  {id:"lg-umgbrief",d:"2026-03-27",date:"Mar 2026",lane:"court",title:"UMG’s response",
   text:`UMG’s brief calls the appeal “astoundingly hypocritical” ${c("rollingstone2026")}.`},
  {id:"lg-amicus",d:"2026-04-03",date:"Apr 3, 2026",lane:"court",title:"Legal scholars weigh in",
   text:`Two groups of scholars filed friend-of-the-court briefs supporting the dismissal on free-speech grounds ${c("thornton2026")}.`},
  {id:"lg-reply",d:"2026-04-17",date:"Apr 17, 2026",lane:"court",title:"Drake’s reply brief",
   text:`Drake’s team argued the judge improperly drew inferences against him at the dismissal stage ${c("mbw2026reply")}.`},
  {id:"lg-hearing",d:"2026-12-04",date:"Dec 4, 2026",lane:"court",upcoming:true,title:"Oral argument (upcoming)",
   text:`A three-judge panel will hear both sides; a ruling follows at an unannounced date ${c("dalugdug2026")}.`}
];

/* ---------------------------------------------------------------------
   CREATOR WATCH (Creators view)
   To add a TikTok: {platform:"tiktok", id:"<video id>", url:"<full link>",
   title:"...", by:"@handle", date:"Mon YYYY", type:"TikTok", why:"..."}
   (TikToks also need an entry in REFS if you want them in the references.)
   --------------------------------------------------------------------- */
const CREATOR_PHASES = [
  {id:"cw-live",nav:"Watching live",title:"The 16 days: watching it live",when:"April – May 2024",
   videos:[
    {platform:"youtube",id:"poB1u5p7t2A",ref:"vKai",type:"Livestream clip",why:"A streamer hearing a diss for the first time, live, with his chat."},
    {platform:"youtube",id:"eihg-YPMWU0",ref:"vGabs",type:"Reaction compilation",why:"Several streamers’ reactions to one song cut into a single video."},
    {platform:"youtube",id:"qEvk9LlnTUs",ref:"vFantano",type:"Critic’s livestream clip",why:"A music critic reacting to a reply that arrived within the hour."}
   ],
   summary:`In the first days, most people didn’t meet these songs on their own. They met them through someone else’s face. Kai Cenat reacted to “Family Matters” live in front of his chat, and channels like GabsMusicTV cut several streamers’ reactions into one video, so a single song produced dozens of “first listens.” Fantano’s reaction to “Meet the Grahams” shows how fast it moved: a critic reviewing a reply that dropped before people had finished reacting to the song it answered. What stands out to me is that the reaction became the news. People wanted to know what was said, and also how Kai took it.`},
  {id:"cw-memes",nav:"Memes & skits",title:"Memes, skits and an AI hit",when:"May 2024",
   videos:[
    {platform:"youtube",id:"v-RJnOMcQxU",ref:"vRDC",type:"Skit compilation",why:"RDCWorld1’s comedy skits acting out each round, stitched in order."},
    {platform:"youtube",id:"1uW_AUwEv-0",ref:"vWillonius",type:"AI-made original",why:"The comedian’s AI-generated parody song that Metro Boomin sampled."},
    {platform:"youtube",id:"VGGMQChuQHg",ref:"vTracklib",type:"Explainer",why:"A sample-breakdown channel explaining that the “vintage” sample was AI."}
   ],
   summary:`Once the songs were out, creators started retelling the feud as comedy. RDCWorld1’s skits turned each diss into a scene, and a fan channel compiled them in order, which is basically a timeline told through jokes. “BBL Drizzy” shows the other side: a comedian made a fake 1970s soul song with AI, a famous producer sampled it, and thousands of people rapped or danced over it. TRACKLIB’s breakdown did the kind of checking a journalist would do and showed that the “old” sample was brand new and machine-made. For me, this phase is where the feud stopped being about who was right and became something anyone could join.`},
  {id:"cw-openverse",nav:"Open verse",title:"The open verse: fans write the disses",when:"May 2024",
   videos:[
    {platform:"soundcloud",id:"1814779140",ref:"vMetroBeat",type:"The beat itself",why:"Metro Boomin’s free upload that started the contest."},
    {platform:"youtube",id:"CwQWrbkBmmM",ref:"vYuno",type:"Contest entry",why:"One of the most-watched freestyles over the beat, from the rapper’s own channel."},
    {platform:"tiktok",id:"7365662009024679210",ref:"tCharlie",url:"https://www.tiktok.com/@charliecurtisb/video/7365662009024679210",type:"Comedy skit",why:"Posted the day the beat dropped; millions of views within a day."},
    {platform:"tiktok",id:"7365684093368929579",ref:"tJustin",url:"https://www.tiktok.com/@oh_thats_justin/video/7365684093368929579",type:"Reaction to a non-English entry",why:"A creator reviewing a diss performed in Japanese."},
    {platform:"tiktok",id:"7365866029420973355",ref:"tDuolingo",url:"https://www.tiktok.com/@duolingoenglishtest/video/7365866029420973355",type:"Brand joins in",why:"Even the Duolingo owl showed up."}
   ],
   summary:`This is the phase where the audience stopped watching the feud and started writing it. Metro Boomin posted a free beat with a prize, and within days people were rapping, singing and dancing over it in different genres and languages. Yuno Miles’s freestyle trended on YouTube, a comedian’s skit about the beat got millions of views in a day ${c("kymBBL")}, one creator built a whole series out of entries in other languages, and even the Duolingo owl joined in. What stands out to me is that the joke kept going after the actual battle had ended. A template can outlive the event it came from.`},
  {id:"cw-cole",nav:"J. Cole",title:"The one who walked away: J. Cole",when:"April – October 2024",
   videos:[
    {platform:"youtube",id:"hOmx8boJ4E8",ref:"vFrontStoop",type:"Commentary",why:"A talk show reacting to the apology the week it happened."},
    {platform:"tiktok",id:"7366500969762426158",ref:"tBeach",url:"https://www.tiktok.com/@2kold.fr/video/7366500969762426158",type:"Fan video",why:"A chance meeting at the beach that people treated as proof of the memes."},
    {platform:"youtube",id:"s_QGwQheU2s",ref:"vPortAntonio",type:"Official audio",why:"Cole’s own explanation, six months later."}
   ],
   summary:`Cole is the only person in this feud whose most famous moment is walking away. The apology happened on a festival stage, but most people saw it through phone clips and through commentary shows like The FrontStoop’s, where the first reaction was disappointment. A month later, the same exit had become a meme, and a stranger’s beach video of Cole was treated as proof that he was at peace ${c("uproxxBeach")}. “Port Antonio” was his own answer, released straight to Instagram and YouTube. What I notice is that Cole barely had to post anything for his story to keep going. Other people’s clips did that for him.`},
  {id:"cw-lap",nav:"Victory lap",title:"The victory lap",when:"November 2024 – February 2025",
   videos:[
    {platform:"youtube",id:"cFCLqrCIDBk",ref:"vGNX",type:"Livestream re-upload",why:"A critic’s first listen to the surprise album the feud set up."},
    {platform:"youtube",id:"KDorKy-13ak",ref:"vNFL",type:"Official broadcast",why:"The NFL’s own upload of the halftime show that closed with “Not Like Us.”"}
   ],
   summary:`By this point, creators weren’t deciding who won anymore. They were celebrating a result everyone already accepted. The GNX reaction stream treats Kendrick as the champion arriving with new music, and the NFL’s official upload of the halftime show is a big institution putting out the same moment fans had been chanting for months. Within hours, that broadcast was cut back into short clips and memes, like Kendrick’s grin on the “Say Drake” line ${c("carry2025")}. The loop came full circle: the feed’s verdict went mainstream, and the mainstream moment went straight back to the feed.`},
  {id:"cw-court",nav:"Courtroom",title:"The courtroom: creators become legal explainers",when:"January 2025 – now",
   videos:[
    {platform:"youtube",id:"dIJSC6yPr2g",ref:"vVill",type:"Commentary",why:"Covers streamers being named in Drake’s federal complaint."},
    {platform:"youtube",id:"KUPG_8tGPdk",ref:"vABC7",type:"TV news",why:"A local TV station’s report on the dismissal, for comparison."},
    {platform:"youtube",id:"foAqkthqbZE",ref:"vMcCune",type:"Lawyer’s Short",why:"An attorney explaining the ruling in a vertical, short-form video."},
    {platform:"youtube",id:"xDCzl8fydv4",ref:"vDeema",type:"Educational explainer",why:"A longer breakdown of the “floodgates” argument behind the ruling."}
   ],
   summary:`When the fight moved to court, the content changed shape. Commentary channels covered the moment reaction streamers found out their videos were evidence in a federal lawsuit. Then the explainers arrived: a TV station giving the basic facts, a law firm using a vertical Short to explain “opinion versus fact,” and a longer video walking through why judges worry about opening the floodgates. This is the phase where short-form was most useful to me as a viewer, because court documents are long and these creators translated them. It’s also the least viral phase, which says a lot about what the algorithm rewards.`}
];

/* ---------------------------------------------------------------------
   Analysis widgets
   --------------------------------------------------------------------- */
const LOOP = [
  {t:"Song drops on a feed", short:["Drops on","a feed"], ex:`“6:16 in LA” and “Taylor Made Freestyle” appeared on Instagram first ${c("cirisano2024")}, and in the final exchanges songs went out as YouTube links or straight to social media ${c("npr2024b")}.`},
  {t:"Streamers react live", short:["Live","reaction"], ex:`Streamers on Twitch, YouTube and Kick competed to react first ${c("davis2024")}. One Kai Cenat reaction passed 9 million views ${c("stanton2025")}.`},
  {t:"Clips and remixes spread", short:["Clip &","remix"], ex:`Metro Boomin’s “BBL Drizzy” beat contest became a TikTok dance and cover trend ${c("roytburg2024","dexerto2024")}.`},
  {t:"The scoreboard moves", short:["Scoreboard","moves"], ex:`“Not Like Us” debuted at No. 1 with 70.9 million U.S. streams ${c("hypebeast2024")} and became YouTube’s top trending song of 2024 ${c("tubefilter2024")}.`},
  {t:"Press reports the verdict", short:["Press reports","the verdict"], ex:`Outlets ran round-ups of the funniest social media reactions as news in their own right ${c("root2024a","dailydot2025")}.`},
  {t:"Artists answer the feed", short:["Artists answer","the feed"], ex:`Critics said Drake’s replies seemed aimed at fans’ real-time posts, calling him “chronically online” ${c("davis2024")}. “The Heart Part 6” answered the secret-daughter rumour after it had become a meme ${c("billboard2024","kymdaughter")}.`}
];

const PSONGS = [
  ["Not Like Us","kendrick",[5,5,5,4]],
  ["BBL Drizzy (beat)","platform",[4,5,4,4]],
  ["Euphoria","kendrick",[2,2,4,2]],
  ["Push Ups","drake",[2,2,4,2]],
  ["Family Matters","drake",[2,2,3,1]],
  ["Meet the Grahams","kendrick",[1,1,3,1]],
  ["Taylor Made Freestyle","drake",[1,1,2,1]],
  ["The Heart Part 6","drake",[1,1,2,1]]
];

/* ---------------------------------------------------------------------
   REFERENCE SUMMARIES (annotated bibliography on references.html)
   One or two sentences in my own words on what each source says.
   --------------------------------------------------------------------- */
const REF_SUMMARIES = {
  adn2024:`News report on Drake’s two pre-action petitions, one in New York and one in Bexar County, Texas, accusing UMG, Spotify and iHeartMedia of using bots and pay-to-play deals to boost “Not Like Us.” It also notes Drake still had more monthly listeners than Lamar.`,
  americansongwriter2024:`A song explainer that walks through what “Not Like Us” means, including how Lamar twists the title of Drake’s album <i>Certified Lover Boy</i>, and argues the track was the knockout blow of the feud.`,
  ap2025:`AP’s report on Judge Jeannette Vargas dismissing Drake’s lawsuit against UMG. She ruled that, in the context of a heated rap battle, a reasonable listener would hear the pedophilia accusation as opinion, not as a statement of fact.`,
  avclub2024:`An opinion piece arguing that Drake’s habit of trolling and leaning on an online echo chamber, which helped him against Meek Mill in 2015, did not work against Kendrick’s songwriting.`,
  avclub2025:`A short news item on the Super Bowl LIX halftime show breaking the viewership record with 133.5 million viewers, noting that the stadium crowd shouted the “A minor” line.`,
  bet2024:`A recap of Kendrick’s Juneteenth “Pop Out” concert at the Kia Forum, livestreamed on Amazon Music’s Twitch channel, where he brought out West Coast artists and performed “Not Like Us” five times.`,
  billboard2024:`Billboard’s report on “The Heart Part 6,” in which Drake denies Kendrick’s accusations and claims his team fed Kendrick false information about a secret daughter. It describes the cover art, an Instagram comment by Dave Free.`,
  billboard2025:`Billboard’s report that Kendrick’s halftime show drew 133.5 million viewers, edging out Michael Jackson’s 1993 record, as announced by Roc Nation, Apple Music and the NFL.`,
  bradley2024:`A Daily Beast critique arguing that the meme-heavy online reaction turned serious accusations about real people, including abuse and pedophilia, into entertainment, and that the jokes mainly benefit the people profiting from the feud.`,
  carry2025:`A Know Your Meme explainer on how Kendrick’s grin during the “Say Drake” line at the Super Bowl went viral on TikTok right after the show and spread as green-screen and CapCut templates.`,
  cbc2024a:`CBC Music’s report on the Tupac Shakur estate sending Drake a cease-and-desist over the AI-generated Tupac voice in “Taylor Made Freestyle,” and the song disappearing from his social accounts by April 26.`,
  cbc2024b:`A CBC explainer for general readers covering the beef’s background: a decade of veiled insults, J. Cole’s “big three” line and later apology, the “Push Ups” leak and Drake’s use of AI voices.`,
  courthouse2025:`Courthouse News coverage of the 38-page dismissal ruling, including the judge’s finding that Drake’s claim that UMG artificially boosted the song relied on online comments and unverified reporting.`,
  dailydot2025:`A round-up of the most-shared memes from Kendrick’s halftime show, including Serena Williams’ crip walk and Kendrick’s grin. It is an example of the press reporting memes as news.`,
  dalugdug2026:`Music Business Worldwide’s report that the Second Circuit set December 4, 2026 for oral arguments in Drake’s appeal before a three-judge panel, with a ruling to follow on an unannounced date.`,
  davis2024:`A TechCrunch analysis of how the internet changed rap battles: replies within minutes instead of days, streamers racing to react first, AI vocals and “BBL Drizzy,” fan campaigns, and critics calling Drake “chronically online.”`,
  dexerto2024:`An explainer on the “BBL Drizzy” TikTok trend: what the phrase means, Metro Boomin’s beat contest, and how people who don’t rap joined in with dances and remakes.`,
  fader2025:`The FADER’s report that Drake withdrew his petition and sued UMG for defamation and harassment. It highlights the “Not Like Us” cover art, an image of his Toronto home marked with sex-offender icons, as a safety threat cited in the complaint.`,
  fader2026:`The FADER’s report on Drake surprise-releasing three albums, <i>Iceman</i>, <i>Habibti</i> and <i>Maid of Honor</i>, after previewing them in a YouTube livestream series.`,
  fox32_2024:`A news report on Kendrick’s surprise album <i>GNX</i>. It notes that the opening track addresses Lil Wayne being passed over for the Super Bowl, and recalls Kendrick’s Pulitzer Prize for <i>DAMN.</i>`,
  fox4_2024:`A report on “Meet the Grahams” accusing Drake of having a secret daughter, written as letters to Drake’s family. It draws the parallel to Pusha T revealing Drake’s son in 2018.`,
  hnhh2024:`A HotNewHipHop analysis of how Drake used Kendrick’s song “Mother I Sober” in “The Heart Part 6.” It argues Drake misread the song and that Kendrick’s confessional album had already blunted attacks on his character.`,
  hotpress2024:`A short report on the “Not Like Us” music video premiering on July 4, 2024 and passing 12 million YouTube views in about 12 hours.`,
  hypebeast2024:`A chart report: “Not Like Us” debuted at No. 1 on the Billboard Hot 100 with 70.9 million U.S. streams in its first tracking week, while Drake’s “Family Matters” debuted at No. 7.`,
  insurancejournal2025:`A report that iHeartMedia said it settled with Drake only after showing it did nothing wrong, that no money changed hands, and that Drake cannot refile against the company.`,
  katersky2025:`ABC News’ report on the dismissal. It lists the five Grammys “Not Like Us” won and summarizes the judge’s reasoning that listeners don’t treat a diss track as fact-checked reporting.`,
  kym2025:`Know Your Meme’s running entry on the feud. It logs each diss track with early view counts, the memes and skits each one produced, and the fan theories after the shooting at Drake’s home.`,
  kymdaughter:`Know Your Meme’s entry on the “secret daughter” rumour: how it spread as memes on X, Reddit and TikTok after “Meet the Grahams,” and Drake’s later claim that it was planted. It notes the photos used in the rumour are unverified.`,
  ktvu2024:`A syndicated FOX timeline of the feud from “First Person Shooter” to “Not Like Us.” It warns that diss tracks include exaggerations and notes that police had not linked the shooting at Drake’s home to the feud.`,
  landrum2024:`AP’s report on <i>GNX</i>, released without warning on November 22, 2024, covering its producers and guests (including Jack Antonoff, Mustard and SZA) months after the Drake battle.`,
  mbw2025a:`A report that Drake and iHeartMedia reached what both sides called an amicable resolution, removing iHeart from the Texas petition while the petition against UMG stayed active.`,
  mbw2025b:`A report on UMG’s March 17, 2025 motion to dismiss. It called Drake’s lawsuit meritless and said he had sued his own label to soothe the sting of losing a rap battle.`,
  mbw2026:`A report on Drake’s 117-page appeal brief, which argues the lower court created a “dangerous categorical rule” for diss tracks and was wrong to judge the song only within the whole battle. The brief also revives his deceptive-practices claim.`,
  mbw2026reply:`A report on Drake’s April 17, 2026 reply brief, which argues the judge dismissed the case too early. It also summarizes UMG’s position that Drake started the battle himself.`,
  mercante2024:`A Kotaku essay arguing the beef was made for internet culture. Memes signal which side you are on, and Drake courted online fans and Kick streamers, yet the internet mostly sided with Kendrick.`,
  npr2024a:`NPR’s report on Drake’s petition alleging UMG used bots, paid influencers and radio stations, and gave Spotify a 30% lower licensing fee in exchange for promoting “Not Like Us.” It includes UMG’s denial.`,
  npr2024b:`An NPR critic’s essay on the feud as psychological warfare that fed on distorted narratives. It notes the final songs spread as YouTube links and social posts, and argues Drake misjudged what kind of battle Kendrick was fighting.`,
  npr2024c:`NPR’s review of “Euphoria,” calling it raw and emotional. It notes the title points to Drake’s role on HBO’s <i>Euphoria</i> and contrasts Kendrick’s real voice with Drake’s use of AI.`,
  npr2025:`NPR’s report on Drake’s 2025 federal lawsuit. The complaint describes three attempted home invasions including the guard’s shooting, the cover art, online hate and a flyer calling him a predator, and claims the song invites vigilante justice.`,
  ocho2026:`Complex’s chart report on <i>Iceman</i> debuting at No. 1 with 463,000 units, and on Drake becoming the first artist to hold the top three Billboard 200 spots at once.`,
  phillips2024:`A HotNewHipHop breakdown of “Family Matters”: the “Buried Alive Interlude” teaser, the video’s crushed van from Kendrick’s <i>good kid, m.A.A.d city</i> cover, the accusations about Kendrick’s relationship and Dave Free, and the shots at Metro Boomin, The Weeknd, Rick Ross and A$AP Rocky.`,
  rollingstone2024:`A Rolling Stone explainer on why so many artists, including Future, Metro Boomin, Rick Ross and The Weeknd, turned on Drake in spring 2024, with the history behind each rift.`,
  rollingstone2025:`Rolling Stone’s report on Drake filing his notice of appeal after the October 2025 dismissal. It recaps his claims and the judge’s reasoning, including her reference to “Taylor Made Freestyle.”`,
  rollingstone2026:`Rolling Stone’s report on UMG’s 83-page appeals brief, which calls Drake’s appeal hypocritical and argues the lyrics are classic opinion that Drake himself provoked.`,
  root2024a:`The Root’s round-up of the funniest social media reactions to the beef, including memes about the OVO “mole” hinted at in “6:16 in LA.” It suggests social media was the beef’s biggest winner.`,
  root2024b:`An essay arguing “Not Like Us” is more than a diss. It explains the Atlanta verse and Drake’s long relationship with Atlanta artists.`,
  roytburg2024:`A Fortune feature on how comedian King Willonius made “BBL Drizzy” with the AI tool Udio, how Metro Boomin’s sample and $10,000 contest made it a hit, and why musicians worry about AI. It notes Willonius was paid when Drake later sampled it.`,
  songfacts:`A Songfacts entry explaining “Push Ups”: the claim that Kendrick gave half his earnings to Top Dawg Entertainment, the jabs at his Taylor Swift and Maroon 5 features, and how “Taylor Made Freestyle” followed the same day.`,
  stanton2025:`A PC Gamer report that Drake’s lawsuit cited streamers’ reaction videos, including a Kai Cenat video with over 9 million views, as evidence UMG let the song spread freely, and how those streamers responded with more reactions.`,
  stereogum2018:`A 2018 report, written after Pusha T’s “The Story of Adidon,” on reports that Drake had met his alleged son Adonis several times before publicly acknowledging him.`,
  stereogumLeak:`A Stereogum report on the leaked “Push Ups” and Rick Ross’s quick response, listing Drake’s shots at Future, Metro Boomin and The Weeknd.`,
  stereogumHP6:`A Stereogum report on “The Heart Part 6”: Drake denies the pedophilia allegations and says his camp fed Kendrick false information. It also notes Kendrick had borrowed Drake’s timestamp-title format for “6:16 in LA.”`,
  stereogumFM:`A Stereogum report on “Family Matters”: Drake’s claims about Kendrick’s relationship, the Dave Free paternity claim, and his reply to Kendrick questioning his Blackness.`,
  stereogum2024:`Stereogum’s chart news that “Not Like Us” debuted at No. 1 on the Hot 100. It notes that “Like That” had also debuted at No. 1 earlier in 2024.`,
  thegrio2024:`theGrio’s full history of the feud, from early collaborations to 2024, with every diss track and its release date. It includes that “Meet the Grahams” dropped about 20 minutes after “Family Matters.”`,
  thornton2026:`A report on two groups of legal scholars filing friend-of-the-court briefs that support the dismissal, arguing “Not Like Us” is protected opinion and that Drake’s case threatens free speech.`,
  trapp2024:`A REVOLT report on “Not Like Us” playing during California’s turn at the 2024 Democratic National Convention roll call, plus its other surprise appearances at the BET Awards and the ESPYs.`,
  uproxx2024a:`An explainer on where “BBL Drizzy” came from: Rick Ross’s April 2024 jab, King Willonius’s AI song, and Metro Boomin crediting Willonius after sampling it.`,
  uproxx2024b:`A breakdown of everyone Drake targets in “Push Ups,” including Kendrick, The Weeknd, Future, Rick Ross and Metro Boomin, with the context behind each line.`,
  usatoday2024:`USA Today’s report on “Euphoria,” with background going back to Kendrick’s 2013 “Control” verse and J. Cole’s “big three” line.`,
  weiss2025:`The ABA Journal’s summary of the dismissal for a legal audience. The judge found the lyrics were hyperbolic opinion, and the article summarizes Drake’s claim that UMG ran a profit-driven campaign that included the Super Bowl.`,
  welch2025:`TheWrap’s report on UMG moving to dismiss Drake’s amended complaint, which had added Kendrick’s Super Bowl halftime performance to the case.`,
  xxl2024:`An XXL report that major record labels and the RIAA sued Udio, the AI music company whose tool created the original “BBL Drizzy,” for copyright infringement.`,
  yahoo2024:`A report on fans picking apart the lyrics of “Euphoria,” including a line about AI and the ghostwriting accusations that have followed Drake for years.`,
  cirisano2024:`MIDiA Research analysis arguing the feud was a rare mainstream moment that played out on social platforms, not streaming services. Diss tracks hit Instagram first, creators used the songs in monetized videos, and Genius led on lyric annotation.`,
  guinness2025:`The Guinness World Records entry certifying Kendrick’s Super Bowl LIX show, at 133.5 million viewers, as the largest TV audience for a halftime performance.`,
  matsa2026:`A Pew Research Center short read (August 2026 survey) finding that 20% of U.S. adults regularly get news on TikTok, up from 3% in 2020, including 39% of adults under 30.`,
  pew2025:`A Pew Research Center analysis showing about half of TikTok users regularly get news there, and that they are as likely to get it from influencers or celebrities as from journalists.`,
  tiktok2024:`TikTok’s announcement of its 2024 Songs of the Summer. “Not Like Us” appears in the U.S. top 10.`,
  tubefilter2024:`A Tubefilter newsletter on YouTube’s 2024 year-end lists, reporting “Not Like Us” as the platform’s top trending song and Kendrick among the top search topics.`,
  marwick2011:`A peer-reviewed study of how Twitter users imagine who is reading them. It introduces “context collapse”: when many audiences are flattened into one, people lose control over how their words are understood.`,
  zulli2022:`A peer-reviewed article arguing that TikTok’s design (sounds, templates, editing tools and creation norms) encourages users to imitate and remix content, creating “imitation publics” connected through copying.`,
  vKai:`Kai Cenat’s livestream reaction to “Family Matters,” uploaded to his clips channel. It shows how many fans first experienced the song.`,
  vGabs:`A compilation that cuts several streamers’ live reactions to “Family Matters,” including Kai Cenat and Anthony Fantano, into one video.`,
  vFantano:`A clip of music critic Anthony Fantano (theneedledrop) reacting live to “Meet the Grahams” soon after its release.`,
  vRDC:`A fan-made compilation of RDCWorld1’s comedy skits about each round of the beef, arranged in chronological order.`,
  vWillonius:`King Willonius’s original AI-generated parody song “BBL Drizzy,” posted on his own channel, which Metro Boomin later sampled.`,
  vTracklib:`TRACKLIB’s sample breakdown of Metro Boomin’s “BBL Drizzy” beat, explaining that the vintage-sounding soul sample was made with AI weeks earlier.`,
  vNFL:`The NFL’s official upload of Kendrick’s Apple Music Super Bowl LIX halftime show, which ended with “Not Like Us.”`,
  vGNX:`A re-upload of Anthony Fantano’s full livestream reaction to <i>GNX</i> on its release day.`,
  vVill:`A commentary video on Drake’s lawsuit naming Kai Cenat and other YouTubers’ reaction videos in federal court documents.`,
  vABC7:`A local TV news segment from ABC7 reporting that a federal judge dismissed Drake’s defamation case.`,
  vMcCune:`A short vertical video from McCune Law Group in which attorney Joe Richardson explains why the defamation case was dismissed.`,
  coleman2024:`XXL’s report that Metro Boomin raised the stakes of his “BBL Drizzy” contest a day after launching it: $10,000 and a beat for the winner, and a beat for the runner-up.`,
  cline2024:`An XXL roundup of 20 standout fan entries to Metro Boomin’s contest, published four days after the beat came out. It notes there was no deadline and that many fans were recording their own disses.`,
  saponara2024:`Billboard’s report on Metro Boomin answering Drake’s shots on X, posting the “BBL Drizzy” beat and inviting fans to rap over it for a free beat. It also notes Drake’s mocking reply on Instagram.`,
  zeff2024:`A Gizmodo roundup of the strangest “BBL Drizzy” versions online, from guitar and Bollywood takes to rapped verses. It reports the beat topped SoundCloud’s New and Hot chart with about 3.3 million plays.`,
  complexRemix:`Complex’s list of viral “BBL Drizzy” remixes from TikTok, including merengue, Jersey club, a stadium-rock guitar solo and a version that reimagines the beat in different regional 1990s rap styles.`,
  onyewuchi2024:`A HotNewHipHop list of the seven funniest “BBL Drizzy” remixes, noting that entries came from around the world and that the beat reached 3.3 million SoundCloud streams within a week.`,
  cowen2024:`A Complex news item on celebrity plastic surgeon “Dr. Miami” posting a TikTok of the “BBL Drizzy” beat playing in his office, an example of public figures joining the trend.`,
  rapup2024:`Rap-Up’s report that Drake rapped over Metro Boomin’s “BBL Drizzy” beat on Sexyy Red’s song “U My Everything,” released May 24, 2024, turning the joke back on itself.`,
  robinson2024:`A Billboard analysis of “BBL Drizzy” as the first major hip-hop beat built on an AI-generated sample, and what it could mean for how producers find and clear samples in future.`,
  power1051a:`A Power 105.1 news post on Metro Boomin’s diss beat and Drake’s reply. It reports that the contest inspired thousands of aspiring artists to record verses aimed at Drake.`,
  power1051b:`A Power 105.1 news post on Metro Boomin adding a $10,000 prize, noting that submissions were arriving from around the world.`,
  higgins:`A Canadian opinion column arguing that record labels and Metro Boomin were among the feud’s real winners, as thousands of independent rappers, singers and reggaeton artists recorded Drake disses over his beat.`,
  lawrence2024:`A Guardian feature built around comedian King Willonius, who made the original “BBL Drizzy” with AI. It argues the song became a way for anyone to join in on dissing Drake.`,
  kymBBL:`Know Your Meme’s entry on “BBL Drizzy”: Metro Boomin’s contest posts, 1.5 million SoundCloud plays in 24 hours, the AI origin of the sample, and examples of viral entries on TikTok and YouTube.`,
  vMetroBeat:`Metro Boomin’s own SoundCloud upload of the “BBL Drizzy” beat, posted free for anyone to rap over as part of his contest.`,
  vYuno:`Rapper Yuno Miles’s contest entry on his own YouTube channel, one of the most-viewed freestyles over the beat.`,
  tCharlie:`A TikTok comedy skit by Charlie Curtis-Beard reacting to yet another Drake diss, posted the day the beat dropped. Know Your Meme reports it reached 3.2 million views in 21 hours.`,
  tJustin:`A TikTok in which creator Oh That’s Justin! reacts to a “BBL Drizzy” diss performed in Japanese, part of a series reviewing entries in other languages.`,
  tDuolingo:`A TikTok from the Duolingo English Test account in which the brand’s owl mascot joins the “BBL Drizzy” trend.`,
  uproxxDrill:`An Uproxx explainer confirming that by April 12, 2024 “7 Minute Drill” could no longer be played on Apple Music or Spotify and was gone from Cole’s YouTube page, keeping the promise he made at Dreamville.`,
  usatodayCole:`USA Today’s report on Cole’s Dreamville apology, seen by most people through attendees’ videos. It describes him calling the diss a mistake and respectfully bowing out of the feud.`,
  billboardCole:`Billboard’s report on the apology during Cole’s headlining Dreamville set two days after the song came out, including his plan to remove it from streaming.`,
  stereogumCole:`Stereogum’s report on the apology, noting that the day after the apology “7 Minute Drill” was No. 2 on Apple Music’s streaming chart, behind only “Like That.”`,
  xxlRemoved:`XXL’s report that “7 Minute Drill” became unplayable on Apple Music, Spotify and YouTube on April 12, 2024, five days after Cole’s apology.`,
  horvath2024:`A HotNewHipHop report on an unconfirmed claim, spread on social media, that Kendrick’s TDE labelmate ScHoolboy Q warned Cole to back off. It also notes how harshly people first criticized Cole for leaving.`,
  rapupCole:`Rap-Up’s roundup of social media posts joking that Cole was the smartest person in the feud, published the weekend Drake and Kendrick released their harshest songs.`,
  kymCole:`Know Your Meme’s entry on the “J. Cole living his best life” meme: when it started (May 1, 2024), when it went viral (May 4), how the format works, and how many views and likes the biggest posts got.`,
  elibert2024:`A Complex roundup of fans saying Cole’s exit looked wise after Drake and Kendrick traded their most serious accusations, along with jokes about Cole living a quiet life.`,
  onyewuchiCole:`A HotNewHipHop list of the best J. Cole memes from the feud. It argues the memes shifted from mocking Cole to praising his decision.`,
  uproxxBeach:`An Uproxx news item on a fan’s video of meeting Cole at the beach, which people treated as proof the memes were true. It notes that Kendrick left Cole alone and focused on Drake.`,
  sportskeedaPopOut:`A Sportskeeda roundup of fan posts during Kendrick’s Pop Out concert on June 19, 2024, joking that Cole had dodged a bullet by leaving the feud early.`,
  sportskeedaOschino:`A Sportskeeda report on rapper Oschino saying in an October 2024 interview that he disapproved of Cole backing out, an example of the criticism that never fully went away.`,
  jackson2024:`A theGrio opinion column in which the writer apologizes to Cole for doubting him, arguing that Cole’s exit now looks wise given how damaging the Drake–Kendrick fight had become.`,
  hypebeastPA:`Hypebeast’s report on “Port Antonio,” in which Cole explains that he bowed out because he did not want to be responsible for a fight that could turn violent for money, and ends with a shout-out to Drake.`,
  iolPA:`A news report on Cole releasing “Port Antonio” without warning on October 9, 2024, six months after his apology, to explain why he stepped away.`,
  fitzgerald2026:`XXL’s report on a 2026 Apple Music interview in which Cole says he loves both Drake and Kendrick and explains that, shortly before his Dreamville set, he realized the diss did not reflect how he felt about Kendrick.`,
  vPortAntonio:`The official audio of J. Cole’s “Port Antonio,” published by his label’s distributor on YouTube.`,
  vFrontStoop:`A commentary episode from The FrontStoop’s “OG Talk” series reacting to Cole’s Dreamville apology the week it happened.`,
  tBeach:`A fan’s TikTok of running into J. Cole at the beach in May 2024, which many viewers treated as proof of the “living his best life” memes.`,
  sFps:`Drake’s official audio upload of “First Person Shooter” with J. Cole on his VEVO channel. It is the player for this song on the Song timeline.`,
  sLikeThat:`The official audio of “Like That” on Future’s VEVO channel, the song with Kendrick’s verse rejecting the “big three.”`,
  sPushUps:`The official audio of Drake’s “Push Ups,” auto-published to YouTube by his label’s distributor (a “Topic” channel).`,
  sEuphoria:`The official audio of Kendrick’s “euphoria,” auto-published to YouTube by his label’s distributor (a “Topic” channel).`,
  sFamily:`The official music video for “Family Matters,” posted on Drake’s own YouTube channel.`,
  sGrahams:`The official audio of Kendrick’s “meet the grahams,” auto-published to YouTube by his label’s distributor (a “Topic” channel).`,
  sNotLikeUs:`The official audio of “Not Like Us” on Kendrick Lamar’s own YouTube channel.`,
  sHP6:`Drake’s own YouTube upload of “The Heart Part 6.” The song was never released to streaming services, so this upload is its official home.`,
  gNotLikeUs:`Genius’s page for “Not Like Us,” with the full lyrics and line-by-line annotations written by users. The song’s “Read the lyrics on Genius” button links here.`,
  spFps:`“First Person Shooter” on Spotify, from Drake’s album <i>For All the Dogs</i>. Its player shows the album cover on the Song timeline.`,
  spLikeThat:`“Like That” on Spotify, from Future and Metro Boomin’s album <i>We Don’t Trust You</i>, where Kendrick’s verse first appeared. Its player shows the album cover on the Song timeline.`,
  spPushUps:`Drake’s “Push Ups” single on Spotify. Its player shows the single’s cover on the Song timeline.`,
  spEuphoria:`Kendrick Lamar’s “euphoria” single on Spotify. Its player shows the single’s cover on the Song timeline.`,
  spFamily:`Drake’s “Family Matters” single on Spotify. Its player shows the single’s cover on the Song timeline.`,
  spGrahams:`Kendrick Lamar’s “meet the grahams” single on Spotify, where the cover is plain black. Its player appears on the Song timeline.`,
  spNotLikeUs:`Kendrick Lamar’s “Not Like Us” single on Spotify. Its player shows the single’s cover on the Song timeline.`,
  rossignol2024:`Uproxx news on Drake’s official release of “Push Ups.” It explains that the cover is a size tag for a size 7 shoe, mocking Kendrick’s height.`,
  fitzgerald2024:`An XXL gallery of hidden jokes in the feud’s visuals: the shoe-size tag on “Push Ups,” the dictionary definition on “euphoria” (read as a nod to Drake producing HBO’s <i>Euphoria</i>), and the items on the original “meet the grahams” cover.`,
  deville2023:`Stereogum’s release-day post for Drake’s <i>For All the Dogs</i>, noting that the cover was drawn by his son, Adonis.`,
  blake2024:`HotNewHipHop on Kendrick removing the original “meet the grahams” cover art for the streaming release, and fans’ theories about why.`,
  bdLikeThat:`Hip-hop journalist Rob Markman’s release-day video on “Like That”: the background to the “big three” idea, the subliminal shots that came before, and a walk through Kendrick’s verse. It is the breakdown video for “Like That” and, from the “big three” chapter, for “First Person Shooter.”`,
  bdPushUps:`Pearl Fountain’s line-by-line explainer of Drake’s first Kendrick diss, made from the version that leaked on April 13, before the official release. It is the breakdown video for “Push Ups” on the Song timeline.`,
  bdTaylorMade:`What’s The Dirt?’s explainer of “Taylor Made Freestyle,” posted while the song was still online. It covers the AI Tupac and Snoop Dogg verses and the Taylor Swift jab. It is the breakdown video for that song on the Song timeline.`,
  bdEuphoria:`Pearl Fountain’s line-by-line explainer of “Euphoria,” posted the day after the song came out. It is the breakdown video for that song on the Song timeline.`,
  bdSix16:`Pearl Fountain’s explainer of “6:16 in LA,” including the claim of a “mole” in Drake’s camp and the Al Green sample. It is the breakdown video for that song on the Song timeline.`,
  bdGrahams:`Pearl Fountain’s explainer of “Meet the Grahams,” covering the original YouTube cover art and each “letter” to a member of Drake’s family. It is the breakdown video for that song on the Song timeline.`,
  bdHP6:`Pearl Fountain’s explainer of “The Heart Part 6,” posted early the morning after the song came out. It is the breakdown video for that song on the Song timeline.`,
  bdNotLikeUs:`Pearl Fountain’s line-by-line explainer of “Not Like Us,” posted three days after the song came out. It is the breakdown video for that song on the Song timeline.`,
  bdFamily:`A long bar-for-bar breakdown of “Family Matters” by the Diverse Mentality channel, first streamed three weeks after the song came out. It is the breakdown video for that song on the Song timeline.`,
  igSix16:`Kendrick’s original Instagram Reel for “6:16 in LA,” the only official home of the song. Its image, a black Maybach glove, served as the song’s cover. It is embedded in “Cover art, decoded” on the Song timeline.`,
  kaplan2024:`People’s release-day report on “6:16 in LA,” describing the Reel’s single black Maybach glove and its caption, and reading the glove as a nod to Rick Ross’s Maybach Music Group.`,
  cowen2024b:`Complex’s release-day post on “6:16 in LA,” which reads the glove image as a sign that “the gloves are off.”`,
  williams2024:`Uproxx on the “6:16 in LA” artwork: a driving glove with the Maybach Music Group logo, which it ties to Rick Ross, a former Drake collaborator who had turned against him.`,
  centeno2024:`iHeartRadio’s report on “Meet the Grahams,” noting that its cover looked like a wider version of the “6:16 in LA” glove photo and listing the prescriptions in Drake’s name and the jewelry receipt it showed.`,
  nevares2024:`HotNewHipHop on the claims around the original “Meet the Grahams” cover: the items shown, DJ Akademiks’s suggestion they were stolen, and the X account EbonyPrince2k24’s claims about where they came from. It stresses that none of the claims were verified.`,
  coleHnhh:`HotNewHipHop on DJ Akademiks saying that Drake’s claim about Dave Free and Whitney Alford was completely false, a claim the article notes Drake repeated on the cover of “The Heart Part 6.”`,
  deville2024:`Stereogum’s release-night post on “Family Matters,” noting that the video’s first section shows the van from the <i>good kid, m.A.A.d city</i> artwork being crushed.`,
  songfactsFM:`A Songfacts entry on “Family Matters”: the title borrows from the 1990s sitcom, and the video crushes a van like the one on the deluxe cover of Kendrick’s <i>good kid, m.A.A.d city</i>.`,
  sportskeedaEggs:`A Sportskeeda round-up of visual Easter eggs in the feud: the sitcom look of the “Family Matters” cover, the crushed van in its video, the Maybach glove and the items on the original “Meet the Grahams” cover.`,
  hellerbach2024:`Complex’s breakdown of the “Not Like Us” video, which Dave Free co-directed and appears in. It reads the family scene as Kendrick’s answer to the claims on “Family Matters.”`,
  anthropic2026:`The AI model used to find and check sources, draft the site’s text and code, and publish it. The full prompts and responses are in the Appendix, which also explains which parts are AI-drafted.`,
  vDeema:`An educational explainer from Deema’s Class on the dismissal and the “floodgates” argument, the worry that allowing this case would invite many more like it.`
};
for(const [k,s] of Object.entries(REF_SUMMARIES)) if(REFS[k]) REFS[k].summary = s;

/* ---------------------------------------------------------------------
   Cover art, decoded (Song timeline). Covers are shown through each
   platform's own player or post, never copied onto the site.
   --------------------------------------------------------------------- */
const COVER_ART = [
  {id:"pushups",show:{sp:"3eh51r6rFWAlGQRlHx9QnQ",ref:"spPushUps"},
   shows:`A shoe-size tag for a size 7 sneaker.`,
   aim:`Kendrick’s height. The cover doubles down on the song’s jokes about his shoe size ${c("rossignol2024","fitzgerald2024")}.`,
   sf:`A joke you get in one glance, with no lyrics needed. It works as a screenshot even for people who never played the song.`},
  {id:"euphoria",show:{sp:"77DRzu7ERs0TX3roZcre7Q",ref:"spEuphoria"},
   shows:`A screenshot of the dictionary definition of “euphoria.”`,
   aim:`Two targets at once. Drake is an executive producer of HBO’s <i>Euphoria</i>, and the definition, a feeling of intense excitement, answers Drake’s claim on “Taylor Made Freestyle” that Kendrick wasn’t enthused about the battle ${c("fitzgerald2024")}.`,
   sf:`A plain dictionary screenshot looks more like a meme than album art. Fans had to work out the joke, and working it out is what kept them posting.`},
  {id:"six16",show:{ig:"C6gdClArPXc",ref:"igSix16"},
   shows:`A black leather driving glove with the Maybach logo, posted as an Instagram Reel with the caption “6:16 in LA” ${c("igSix16","kaplan2024")}.`,
   aim:`The press read it two ways. The gloves are off ${c("cowen2024b")}. And the Maybach logo points to Rick Ross’s label, Maybach Music Group, since Ross had already turned on Drake ${c("williams2024")}.`,
   next:`The glove was a teaser. That night, the “Meet the Grahams” cover turned out to be a wider shot of the same photo ${c("centeno2024")}.`,
   sf:`The image paid off twice: once as a mystery, and again when the next cover explained it. Each payoff gave fans a reason to post again.`},
  {id:"familymatters",show:{sp:"1wFFFzJ5EsKbBWZriAcubN",ref:"spFamily"},
   shows:`The title in big yellow letters over a city skyline lined with palm trees. The title and lettering borrow from the 1990s sitcom <i>Family Matters</i> ${c("songfactsFM","sportskeedaEggs")}.`,
   aim:`Kendrick’s family. Sportskeeda read the sitcom look as saying Kendrick has a lot of family drama ${c("sportskeedaEggs")}, which is what the song is about.`,
   van:`The van is in the music video, not on the cover. In the video’s first section, a minivan like the one on the cover of Kendrick’s 2012 album <i>good kid, m.A.A.d city</i>, his mother’s van, is towed through Toronto and crushed in a junkyard ${c("deville2024","phillips2024","songfactsFM")}. No source quotes Drake on what it means. HotNewHipHop discusses it alongside the song’s attacks on Kendrick’s family ${c("phillips2024")}. The likeliest reading: that album is Kendrick’s story of growing up in Compton, and crushing the van in Drake’s hometown is a way of wrecking the story Kendrick tells about himself.`,
   video:{yt:"ZkXG3ZrXlbc",ref:"sFamily",label:"Watch the video. The van is in the first section."},
   sf:`A crushed car is a five-second clip that works with the sound off. Fans who knew the album cover got it instantly, and everyone else learned it from explainer posts.`},
  {id:"grahams",show:{sp:"4S8PxReB1UiDR2F5x1lyIR",ref:"spGrahams",cap:`The streaming cover is plain black. The original is described here, not shown, because it displays what are claimed to be someone’s prescription labels.`},
   shows:`The original cover, posted with the song on YouTube, was a pile of items said to belong to Drake: prescription bottles in his name, a box of the weight-loss drug Ozempic, a receipt for a large jewelry purchase and the Maybach glove from “6:16 in LA” ${c("fitzgerald2024","centeno2024")}.`,
   aim:`It backs up the song’s picture of Drake’s private life with what look like personal belongings.`,
   next:`Where the items came from was never proven. DJ Akademiks suggested they were stolen. An anonymous X account, EbonyPrince2k24, said Drake had thrown them away, posted footage it said showed this, and claimed it had told only Kendrick. HotNewHipHop stressed that none of it was verified ${c("nevares2024")}. Kendrick then swapped in a plain black cover for the streaming release, and fans argued about why ${c("blake2024")}.`,
   sf:`The cover worked like a leaked evidence photo. People zoomed in on every label and receipt and posted the crops, and an anonymous account built its own following around it ${c("nevares2024")}.`},
  {id:"notlikeus",show:{sp:"6AI3ezQ4o3HUoP6Dhudph3",ref:"spNotLikeUs"},
   shows:`An aerial photo of Drake’s Toronto home, covered in the map pins used on sex-offender registry maps ${c("fader2025")}.`,
   aim:`It turns the song’s central accusation into a picture of a real address. The accusation is unproven, and Drake denies it ${c("billboard2024")}.`,
   next:`Drake’s 2025 lawsuit pointed to the cover as a safety threat, alongside attempted break-ins at the house ${c("fader2025","npr2025")}. See the <a href="#lg-lawsuit">legal timeline</a>.`,
   sf:`This is where a feed image crossed into real life: the picture that circulated as a meme was later quoted in a legal complaint.`},
  {id:"hp6",show:{none:`Not shown here. The cover is built from a family’s Instagram post about their children, so it is described instead. Drake’s official upload shows it ${c("sHP6")}.`},
   shows:`A screenshot of an Instagram comment, a black heart and a hand-heart, that Kendrick’s creative partner Dave Free left under a photo Kendrick’s fiancée, Whitney Alford, posted with their children ${c("billboard2024")}.`,
   aim:`It backs up Drake’s unproven claim on “Family Matters” that Free fathered one of Kendrick’s children ${c("billboard2024")}.`,
   next:`DJ Akademiks later said the claim was completely false ${c("coleHnhh")}. Kendrick answered on screen: Free co-directed the “Not Like Us” video and appears in it, and the video includes a family scene with Kendrick, his partner and their children ${c("hellerbach2024")}.`,
   sf:`A screenshot of a comment only proves that someone typed two emojis, but on a feed it looks like a receipt.`}
];

/* ---------------------------------------------------------------------
   Reference formatting (shared by both pages)
   --------------------------------------------------------------------- */
(function buildRefs(){
  // automatic a/b/c letters for same author + same year
  const groups = {};
  for(const [k,r] of Object.entries(REFS)){
    r.n = r.n || r.a.replace(/\.$/,"");
    const g = r.n + "|" + r.y; (groups[g] = groups[g] || []).push(k);
  }
  for(const keys of Object.values(groups)){
    if(keys.length < 2) { REFS[keys[0]].sfx = ""; continue; }
    keys.sort((x,y)=>REFS[x].t.replace(/[“”‘’"']/g,"").localeCompare(REFS[y].t.replace(/[“”‘’"']/g,""),"en",{sensitivity:"base"}));
    keys.forEach((k,i)=>{ REFS[k].sfx = (REFS[k].y==="n.d." ? "-" : "") + "abcdefghij"[i]; });
  }
  const end = s => /[.?!]$/.test(s.replace(/<[^>]+>/g,"").trim()) ? s : s + ".";
  for(const [k,r] of Object.entries(REFS)){
    const yr = r.y + r.sfx;
    r.cite = `${r.n}, ${yr}`;
    r.year = yr;
    const date = `(${yr}${r.md||""})`;
    let body;
    if(r.kind==="journal") body = `${end(r.t)} <i>${r.journal}, ${r.vol}</i>(${r.issue}), ${r.pages}.`;
    else if(r.kind==="video") body = `<i>${r.t}</i> [Video]. YouTube.`;
    else if(r.kind==="audio") body = `<i>${r.t}</i> [Audio]. SoundCloud.`;
    else if(r.kind==="song") body = (r.album ? `${r.t} [${r.desc||"Song"}]. On <i>${r.album}</i>.` : `<i>${r.t}</i> [${r.desc||"Song"}].`) + ` ${r.label}.`;
    else if(r.kind==="insta") body = `<i>${r.t}</i> [Video]. Instagram.`;
    else if(r.kind==="tiktok") body = `${r.t.startsWith("[") ? r.t : `<i>${r.t}</i>`} [Video]. TikTok.`;
    else if(r.kind==="ai") body = `<i>${r.t}</i> (${r.ver}) [${r.desc}].`;
    else if(r.kind==="periodical") body = `${end(r.t)} <i>${r.s}</i>.`;
    else body = `<i>${end(r.t)}</i>` + (r.s && r.s!==r.a ? ` ${r.s}.` : "");
    const retrieved = r.retrieved ? ` Retrieved ${r.retrieved}, from` : "";
    r.apa = `${end(r.a)} ${date}. ${body}${retrieved}`;
    r.sort = (r.sortKey || r.a).replace(/^The /,"") + " " + r.y + (r.sfx||"");
  }
})();
