import { memo } from "react";

export const newsPayload = [
  {
    source: {
      id: "nbc-news",
      name: "NBC News"
    },
    author: null,
    title: "Is Andrew Yang ready for prime time?",
    description:
      '"The crowds are bigger. The energy is higher," Yang told NBC News. "The questions are more about what you would do as president."',
    url:
      "https://www.nbcnews.com/politics/2020-election/andrew-yang-ready-prime-time-n1051336",
    urlToImage:
      "https://static.euronews.com/articles/4146976/1000x563_nbc-190909-andrew-yang-gang-cs-1016a_a57c878671a0429870aa2b29065bf352.jpg",
    publishedAt: "2019-09-11T08:30:13Z",
    content: ""
  },

  {
    source: {
      id: "newsweek",
      name: "Newsweek"
    },
    author: "Brendan Cole",
    title:
      "Democrat Contender Andrew Yang Crowd Surfs at 2020 Election Event: 'Now This is What I Call a Blue Wave'",
    description:
      "Democrat contender was addressing a forum in Costa Mesa, California, aimed at energizing Asian American and Pacific Islander communities.",
    url:
      "https://www.newsweek.com/andrew-yang-election-2020-yanggang-crowdsurfing-1458232",
    urlToImage: "https://d.newsweek.com/en/full/1525928/andrew-yang.jpg",
    publishedAt: "2019-09-09T09:12:49Z",
    content:
      "Democrat contender for 2020, Andrew Yang has brandished his credibility among the youth vote by sharing a video of him crowd-surfing in a room of supporters. The 44-year-old entrepreneur tweeted the video of him at the AAPI Democratic Presidential Forum in C… [+2552 chars]"
  },
  {
    source: {
      id: "cbs-news",
      name: "CBS News"
    },
    author: "CBS News",
    title: "2020 hopeful Andrew Yang on why he can beat President Trump",
    description:
      'Businessman Andrew Yang believes he can beat Joe Biden for the Democratic nomination and President Trump in the general election. Yang spoke with "CBS This Morning" co-host Anthony Mason, and CBSN political reporter Caitlin Huey-Burns joined "Red and Blue" to…',
    url:
      "https://www.cbsnews.com/video/2020-hopeful-andrew-yang-on-why-he-can-beat-president-trump/",
    urlToImage:
      "https://cbsnews2.cbsistatic.com/hub/i/r/2019/09/04/1bd3b08c-cf59-4a22-ab62-9438e8b1616a/thumbnail/1200x630/ca1b62c0e204f2078d5dec941141f0e9/cbsn-fusion-2020-hopeful-andrew-yang-on-why-he-can-beat-president-trump-thumbnail-1926822-640x360.jpg",
    publishedAt: "2019-09-04T22:18:30Z",
    content: null
  },
  {
    source: {
      id: null,
      name: "Macleans.ca"
    },
    author: "Michael Fraiman",
    title:
      "Don’t count out Andrew Yang, the populist technocrat who wants to be president - Maclean's",
    description:
      "Don’t count out Andrew Yang, the populist technocrat who wants to be president Maclean's Yang and his outsized ideas have electrified the Democrats' presidential nomination race, making him the X-factor in a fast-narrowing field.",
    url:
      "https://www.macleans.ca/politics/dont-count-out-andrew-yang-the-populist-technocrat-who-wants-to-be-president/",
    urlToImage:
      "https://www.macleans.ca/wp-content/uploads/2019/09/ANDREW-YANG-FRAIMAN-SEPT05-810x445.jpg?6c139",
    publishedAt: "2019-09-10T19:49:55Z",
    content:
      "Last year, around 100 people showed up to the Belknap County Democrats annual summer picnic. Many had white hair and walkers and knew each other by first name. This year, on an unseasonably cool August afternoon in the economically debilitated New Hampshire t… [+14987 chars]"
  }
];

export const youtubeAllTimePayload = [
  // {
  //   kind: "youtube#video",
  //   id: "cTsEzmFamZ8",
  //   snippet: {
  //     publishedAt: "2019-02-12T23:34:17.000Z",
  //     channelId: "UCzQUP1qoWDoEbmsQxvdjxgQ",
  //     title: "Joe Rogan Experience #1245 - Andrew Yang",
  //     description:
  //       "Andrew Yang is an American entrepreneur, the founder of Venture for America, and a 2020 Democratic presidential candidate.",
  //     thumbnails: {
  //       default: {
  //         url: "https://i.ytimg.com/vi/cTsEzmFamZ8/default.jpg",
  //         width: 120,
  //         height: 90
  //       },
  //       medium: {
  //         url: "https://i.ytimg.com/vi/cTsEzmFamZ8/mqdefault.jpg",
  //         width: 320,
  //         height: 180
  //       },
  //       high: {
  //         url: "https://i.ytimg.com/vi/cTsEzmFamZ8/hqdefault.jpg",
  //         width: 480,
  //         height: 360
  //       }
  //     },
  //     channelTitle: "PowerfulJRE",
  //     liveBroadcastContent: "none"
  //   },
  //   contentDetails: {
  //     duration: "PT1H52M3S",
  //     dimension: "2d",
  //     definition: "hd",
  //     caption: "false",
  //     licensedContent: true,
  //     projection: "rectangular"
  //   },
  //   statistics: {
  //     viewCount: "3964340",
  //     likeCount: "116029",
  //     dislikeCount: "7500",
  //     favoriteCount: "0",
  //     commentCount: "45303"
  //   }
  // },
  {
    kind: "youtube#video",
    id: "-DHuRTvzMFw",
    snippet: {
      publishedAt: "2019-04-07T11:58:13.000Z",
      channelId: "UCaeO5vkdj5xOQHp4UmIN6dw",
      title: "Andrew Yang | The Ben Shapiro Show Sunday Special Ep. 45",
      description:
        'Andrew Yang, award winning entrepreneur, Democratic Presidential candidate, and author of "The War on Normal People," joins Ben to discuss the Industrial ...',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/-DHuRTvzMFw/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/-DHuRTvzMFw/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/-DHuRTvzMFw/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "The Daily Wire",
      liveBroadcastContent: "none"
    },
    contentDetails: {
      duration: "PT1H5M4S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      projection: "rectangular"
    },
    statistics: {
      viewCount: "2378147",
      likeCount: "82536",
      dislikeCount: "2444",
      favoriteCount: "0",
      commentCount: "25866"
    }
  },
  {
    kind: "youtube#video",
    id: "otEbT0l_Hbg",
    snippet: {
      publishedAt: "2019-08-07T22:43:57.000Z",
      channelId: "UCLtREJY21xRfCuEKvdki1Kw",
      title: "Andrew Yang - H3 Podcast #132",
      description:
        "Thank you to http://JoinHoney.com/H3 & http://GetQuip.com/H3 for sponsoring us! http://teddyfresh.com restocks are live - The hoodie Ethan is wearing is coming ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/otEbT0l_Hbg/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/otEbT0l_Hbg/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/otEbT0l_Hbg/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "H3 Podcast",
      liveBroadcastContent: "none"
    },
    contentDetails: {
      duration: "PT1H28M25S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      projection: "rectangular"
    },
    statistics: {
      viewCount: "1615707",
      likeCount: "80407",
      dislikeCount: "4206",
      favoriteCount: "0",
      commentCount: "19779"
    }
  },
  {
    kind: "youtube#video",
    id: "87M2HwkZZcw",
    snippet: {
      publishedAt: "2019-03-08T15:14:32.000Z",
      channelId: "UChi08h4577eFsNXGd3sxYhw",
      title:
        "Andrew Yang Talks Universal Basic Income, Benefitting From Tech, His Run For President + More",
      description:
        "Democratic presidential hopeful Andrew Yang stopped by The Breakfast Club to break down his platform for the 2020 election and explain why he's the best ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/87M2HwkZZcw/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/87M2HwkZZcw/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/87M2HwkZZcw/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "Breakfast Club Power 105.1 FM",
      liveBroadcastContent: "none"
    },
    contentDetails: {
      duration: "PT45M32S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      projection: "rectangular"
    },
    statistics: {
      viewCount: "1367898",
      likeCount: "48684",
      dislikeCount: "1388",
      favoriteCount: "0",
      commentCount: "18558"
    }
  }
];

export const youtubeDayPayload = [
  {
    kind: "youtube#video",
    id: "QlsaQZz6418",
    snippet: {
      publishedAt: "2019-09-11T15:09:09.000Z",
      channelId: "UCUyanZn0S-SqJkgUHPEFlww",
      title: "Andrew Yang Rising",
      description:
        "In a time where the political disconnect is at an all time high, one man emerges from the shadows to lead the people... I wanted to show my support for Andrew ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/QlsaQZz6418/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/QlsaQZz6418/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/QlsaQZz6418/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "KillGreyFilms",
      liveBroadcastContent: "none"
    },
    contentDetails: {
      duration: "PT4M54S",
      dimension: "2d",
      definition: "hd",
      caption: "true",
      licensedContent: false,
      projection: "rectangular"
    },
    statistics: {
      viewCount: "87715",
      likeCount: "9360",
      dislikeCount: "41",
      favoriteCount: "0",
      commentCount: "1143"
    }
  },
  {
    kind: "youtube#video",
    id: "9izThKBNwR4",
    snippet: {
      publishedAt: "2019-09-11T22:21:56.000Z",
      channelId: "UC8p1vwvWtl6T73JiExfWs1g",
      title: "2020 hopeful Andrew Yang on why he can beat President Trump",
      description:
        'Businessman Andrew Yang believes he can beat Joe Biden for the Democratic nomination and President Trump in the general election. Yang spoke with "CBS ...',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/9izThKBNwR4/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/9izThKBNwR4/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/9izThKBNwR4/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "CBS News",
      liveBroadcastContent: "none"
    },
    contentDetails: {
      duration: "PT6M17S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      regionRestriction: {
        blocked: ["CA", "JP", "AU"]
      },
      projection: "rectangular"
    },
    statistics: {
      viewCount: "70417",
      likeCount: "1987",
      dislikeCount: "391",
      favoriteCount: "0",
      commentCount: "1116"
    }
  },
  {
    kind: "youtube#video",
    id: "P6T4c7B22r0",
    snippet: {
      publishedAt: "2019-09-11T12:40:45.000Z",
      channelId: "UC-SJ6nODDmufqBzPBwCvYvQ",
      title:
        "Andrew Yang: &quot;The American Dream is dying by the numbers&quot;",
      description:
        "The ten candidates who made the cut for the third Democratic presidential debate include nine politicians -- and Andrew Yang. The 44-year-old entrepreneur, ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/P6T4c7B22r0/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/P6T4c7B22r0/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/P6T4c7B22r0/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "CBS This Morning",
      liveBroadcastContent: "none"
    },
    contentDetails: {
      duration: "PT5M49S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      regionRestriction: {
        blocked: ["CA", "JP", "AU"]
      },
      projection: "rectangular"
    },
    statistics: {
      viewCount: "217563",
      likeCount: "8643",
      dislikeCount: "324",
      favoriteCount: "0",
      commentCount: "3269"
    }
  }
];

export const redditPayload = [
  {
    approved_at_utc: null,
    selftext: "",
    author_fullname: "t2_4d4d73w2",
    saved: false,
    mod_reason_title: null,
    gilded: 0,
    clicked: false,
    title: "My Human will vote for Andrew Yang.",
    link_flair_richtext: [],
    subreddit_name_prefixed: "r/YangForPresidentHQ",
    hidden: false,
    pwls: null,
    link_flair_css_class: null,
    downs: 0,
    thumbnail_height: 140,
    hide_score: false,
    name: "t3_d2i8ju",
    quarantine: false,
    link_flair_text_color: "dark",
    author_flair_background_color: null,
    subreddit_type: "public",
    ups: 2016,
    total_awards_received: 0,
    media_embed: {},
    thumbnail_width: 140,
    author_flair_template_id: null,
    is_original_content: false,
    user_reports: [],
    secure_media: null,
    is_reddit_media_domain: true,
    is_meta: false,
    category: null,
    secure_media_embed: {},
    link_flair_text: null,
    can_mod_post: false,
    score: 2016,
    approved_by: null,
    thumbnail:
      "https://a.thumbs.redditmedia.com/VGB4uafo1gotQprhEVINHSryMDSHLPefqWPm1VB0_t8.jpg",
    edited: false,
    author_flair_css_class: null,
    steward_reports: [],
    author_flair_richtext: [],
    gildings: {},
    post_hint: "image",
    content_categories: null,
    is_self: false,
    mod_note: null,
    created: 1568193823,
    link_flair_type: "text",
    wls: null,
    banned_by: null,
    author_flair_type: "text",
    domain: "i.redd.it",
    allow_live_comments: false,
    selftext_html: null,
    likes: null,
    suggested_sort: null,
    banned_at_utc: null,
    view_count: null,
    archived: false,
    no_follow: false,
    is_crosspostable: true,
    pinned: false,
    over_18: false,
    preview: {
      images: [
        {
          source: {
            url:
              "https://preview.redd.it/wwymgdlz9vl31.jpg?auto=webp&s=cb22003dcee0b76a1d41e95043cf89447a52f577",
            width: 1536,
            height: 2048
          },
          resolutions: [
            {
              url:
                "https://preview.redd.it/wwymgdlz9vl31.jpg?width=108&crop=smart&auto=webp&s=a8b233808ef1d0178723cc765082db9aa7772f4d",
              width: 108,
              height: 144
            },
            {
              url:
                "https://preview.redd.it/wwymgdlz9vl31.jpg?width=216&crop=smart&auto=webp&s=eebce24f3735748ff8c04fe347e1e96988d9d980",
              width: 216,
              height: 288
            },
            {
              url:
                "https://preview.redd.it/wwymgdlz9vl31.jpg?width=320&crop=smart&auto=webp&s=9dab0ed31ea23c0627c31ca45d5301d5d1aab4aa",
              width: 320,
              height: 426
            },
            {
              url:
                "https://preview.redd.it/wwymgdlz9vl31.jpg?width=640&crop=smart&auto=webp&s=ba5729a9e1f8f1bc2b8948165060d2b844745dba",
              width: 640,
              height: 853
            },
            {
              url:
                "https://preview.redd.it/wwymgdlz9vl31.jpg?width=960&crop=smart&auto=webp&s=36de5025cd73cf458eb4d67d22ff2f8ae12cb231",
              width: 960,
              height: 1280
            },
            {
              url:
                "https://preview.redd.it/wwymgdlz9vl31.jpg?width=1080&crop=smart&auto=webp&s=d8d2499226a01735688df2fc8177b5e3aebee048",
              width: 1080,
              height: 1440
            }
          ],
          variants: {},
          id: "v1ERsCtquyD2eCXl2LvDjIounlHqKsFqe8kI4xGLdiI"
        }
      ],
      enabled: true
    },
    all_awardings: [],
    media_only: false,
    can_gild: true,
    spoiler: false,
    locked: false,
    author_flair_text: null,
    visited: false,
    num_reports: null,
    distinguished: null,
    subreddit_id: "t5_j1rvz",
    mod_reason_by: null,
    removal_reason: null,
    link_flair_background_color: "",
    id: "d2i8ju",
    is_robot_indexable: true,
    report_reasons: null,
    num_crossposts: 2,
    num_comments: 45,
    send_replies: true,
    whitelist_status: null,
    contest_mode: false,
    mod_reports: [],
    author_patreon_flair: false,
    author_flair_text_color: null,
    permalink:
      "/r/YangForPresidentHQ/comments/d2i8ju/my_human_will_vote_for_andrew_yang/",
    parent_whitelist_status: null,
    stickied: false,
    url: "https://i.redd.it/wwymgdlz9vl31.jpg",
    subreddit_subscribers: 60221,
    created_utc: 1568165023,
    discussion_type: null,
    media: null,
    is_video: false,
    _fetched: false,
    comment_limit: 2048,
    comment_sort: "best",
    _comments_by_id: {}
  },
  {
    approved_at_utc: null,
    selftext: "",
    author_fullname: "t2_dbdvi",
    saved: false,
    mod_reason_title: null,
    gilded: 1,
    clicked: false,
    title:
      "New Emerson Polling: Yang #2 to beat Trump, Warren loses to Trump by 2%",
    link_flair_richtext: [],
    subreddit_name_prefixed: "r/YangForPresidentHQ",
    hidden: false,
    pwls: null,
    link_flair_css_class: null,
    downs: 0,
    thumbnail_height: 96,
    hide_score: false,
    name: "t3_d2a0ti",
    quarantine: false,
    link_flair_text_color: "dark",
    author_flair_background_color: "transparent",
    subreddit_type: "public",
    ups: 3519,
    total_awards_received: 3,
    media_embed: {},
    thumbnail_width: 140,
    author_flair_template_id: "282ef768-a987-11e9-aa5f-0e27a45b9ee4",
    is_original_content: false,
    user_reports: [],
    secure_media: null,
    is_reddit_media_domain: true,
    is_meta: false,
    category: null,
    secure_media_embed: {},
    link_flair_text: null,
    can_mod_post: false,
    score: 3519,
    approved_by: null,
    thumbnail:
      "https://b.thumbs.redditmedia.com/KROytWQmqnVc915RxYXTP_TctDL5QqF9lodZ0NelPSE.jpg",
    edited: false,
    author_flair_css_class: null,
    steward_reports: [],
    author_flair_richtext: [
      {
        a: ":one:",
        e: "emoji",
        u: "https://emoji.redditmedia.com/873v5ld9q4b31_t5_j1rvz/one"
      },
      {
        a: ":two:",
        e: "emoji",
        u: "https://emoji.redditmedia.com/j5dimimaq4b31_t5_j1rvz/two"
      },
      {
        a: ":three:",
        e: "emoji",
        u: "https://emoji.redditmedia.com/4wtyv8kaq4b31_t5_j1rvz/three"
      },
      {
        a: ":four:",
        e: "emoji",
        u: "https://emoji.redditmedia.com/x0k5uiabq4b31_t5_j1rvz/four"
      },
      {
        a: ":five:",
        e: "emoji",
        u: "https://emoji.redditmedia.com/xijh51ipq4b31_t5_j1rvz/five"
      },
      {
        a: ":six:",
        e: "emoji",
        u: "https://emoji.redditmedia.com/1g6sk712r4b31_t5_j1rvz/six"
      }
    ],
    gildings: {
      gid_1: 2,
      gid_2: 1
    },
    post_hint: "image",
    content_categories: null,
    is_self: false,
    mod_note: null,
    created: 1568161509,
    link_flair_type: "text",
    wls: null,
    banned_by: null,
    author_flair_type: "richtext",
    domain: "i.redd.it",
    allow_live_comments: true,
    selftext_html: null,
    likes: null,
    suggested_sort: null,
    banned_at_utc: null,
    view_count: null,
    archived: false,
    no_follow: false,
    is_crosspostable: true,
    pinned: false,
    over_18: false,
    preview: {
      images: [
        {
          source: {
            url:
              "https://preview.redd.it/r35ngh84msl31.png?auto=webp&s=a4ff0318f0f17d8514e7232c555b7e7e761bfd25",
            width: 684,
            height: 473
          },
          resolutions: [
            {
              url:
                "https://preview.redd.it/r35ngh84msl31.png?width=108&crop=smart&auto=webp&s=63de05790b908d72c40d5c831bcd01dd4d402f4c",
              width: 108,
              height: 74
            },
            {
              url:
                "https://preview.redd.it/r35ngh84msl31.png?width=216&crop=smart&auto=webp&s=3a93f96b5e7590f61bee501de06ed251d0b63257",
              width: 216,
              height: 149
            },
            {
              url:
                "https://preview.redd.it/r35ngh84msl31.png?width=320&crop=smart&auto=webp&s=82db309d92faea92d977919264f9f8296584ab1e",
              width: 320,
              height: 221
            },
            {
              url:
                "https://preview.redd.it/r35ngh84msl31.png?width=640&crop=smart&auto=webp&s=3a8d636f772636278cb89a357bba23da389697a1",
              width: 640,
              height: 442
            }
          ],
          variants: {},
          id: "aL128n2M8Z5Cmd_lRr-vMqWKtEVj_AQMBUZH7HtySNQ"
        }
      ],
      enabled: true
    },
    all_awardings: [
      {
        count: 1,
        is_enabled: true,
        subreddit_id: null,
        description:
          "Gives the author a week of Reddit Premium, %{coin_symbol}100 Coins to do with as they please, and shows a Gold Award.",
        end_date: null,
        coin_reward: 100,
        icon_url: "https://www.redditstatic.com/gold/awards/icon/gold_512.png",
        days_of_premium: 7,
        id: "gid_2",
        icon_height: 512,
        resized_icons: [
          {
            url: "https://www.redditstatic.com/gold/awards/icon/gold_16.png",
            width: 16,
            height: 16
          },
          {
            url: "https://www.redditstatic.com/gold/awards/icon/gold_32.png",
            width: 32,
            height: 32
          },
          {
            url: "https://www.redditstatic.com/gold/awards/icon/gold_48.png",
            width: 48,
            height: 48
          },
          {
            url: "https://www.redditstatic.com/gold/awards/icon/gold_64.png",
            width: 64,
            height: 64
          },
          {
            url: "https://www.redditstatic.com/gold/awards/icon/gold_128.png",
            width: 128,
            height: 128
          }
        ],
        days_of_drip_extension: 0,
        award_type: "global",
        start_date: null,
        coin_price: 500,
        icon_width: 512,
        subreddit_coin_reward: 0,
        name: "Gold"
      },
      {
        count: 2,
        is_enabled: true,
        subreddit_id: null,
        description: "Shows the Silver Award... and that's it.",
        end_date: null,
        coin_reward: 0,
        icon_url:
          "https://www.redditstatic.com/gold/awards/icon/silver_512.png",
        days_of_premium: 0,
        id: "gid_1",
        icon_height: 512,
        resized_icons: [
          {
            url: "https://www.redditstatic.com/gold/awards/icon/silver_16.png",
            width: 16,
            height: 16
          },
          {
            url: "https://www.redditstatic.com/gold/awards/icon/silver_32.png",
            width: 32,
            height: 32
          },
          {
            url: "https://www.redditstatic.com/gold/awards/icon/silver_48.png",
            width: 48,
            height: 48
          },
          {
            url: "https://www.redditstatic.com/gold/awards/icon/silver_64.png",
            width: 64,
            height: 64
          },
          {
            url: "https://www.redditstatic.com/gold/awards/icon/silver_128.png",
            width: 128,
            height: 128
          }
        ],
        days_of_drip_extension: 0,
        award_type: "global",
        start_date: null,
        coin_price: 100,
        icon_width: 512,
        subreddit_coin_reward: 0,
        name: "Silver"
      }
    ],
    media_only: false,
    can_gild: true,
    spoiler: false,
    locked: false,
    author_flair_text: ":one::two::three::four::five::six:",
    visited: false,
    num_reports: null,
    distinguished: null,
    subreddit_id: "t5_j1rvz",
    mod_reason_by: null,
    removal_reason: null,
    link_flair_background_color: "",
    id: "d2a0ti",
    is_robot_indexable: true,
    report_reasons: null,
    num_crossposts: 0,
    num_comments: 347,
    send_replies: true,
    whitelist_status: null,
    contest_mode: false,
    mod_reports: [],
    author_patreon_flair: false,
    author_flair_text_color: "dark",
    permalink:
      "/r/YangForPresidentHQ/comments/d2a0ti/new_emerson_polling_yang_2_to_beat_trump_warren/",
    parent_whitelist_status: null,
    stickied: false,
    url: "https://i.redd.it/r35ngh84msl31.png",
    subreddit_subscribers: 60221,
    created_utc: 1568132709,
    discussion_type: null,
    media: null,
    is_video: false,
    _fetched: false,
    comment_limit: 2048,
    comment_sort: "best",
    _comments_by_id: {}
  }
];


export const tweetPayload = [
  {
    created_at: "Tue Sep 10 18:13:50 +0000 2019",
    id: 1171486956313706500,
    id_str: "1171486956313706496",
    full_text:
      "I like to solve problems - and many of the biggest problems of this time need our government to be part of the solution.",
    truncated: false,
    display_text_range: [0, 120],
    entities: {
      hashtags: [],
      symbols: [],
      user_mentions: [],
      urls: []
    },
    in_reply_to_status_id: null,
    in_reply_to_status_id_str: null,
    in_reply_to_user_id: null,
    in_reply_to_user_id_str: null,
    in_reply_to_screen_name: null,
    user: {
      id: 2228878592,
      id_str: "2228878592",
      name: "Andrew Yang",
      screen_name: "AndrewYang",
      location: "USA",
      description:
        "2020 US Presidential Candidate (D). Entrepreneur & Founder of @venture4america My book: https://t.co/TLcOiHDrTR Join the campaign here: https://t.co/phur3ya6AG",
      url: "https://t.co/HP97VkPXqd",
      entities: {
        url: {
          urls: [
            {
              url: "https://t.co/HP97VkPXqd",
              expanded_url: "http://shop.yang2020.com",
              display_url: "shop.yang2020.com",
              indices: [0, 23]
            }
          ]
        },
        description: {
          urls: [
            {
              url: "https://t.co/TLcOiHDrTR",
              expanded_url: "https://amzn.to/2HQMk83",
              display_url: "amzn.to/2HQMk83",
              indices: [88, 111]
            },
            {
              url: "https://t.co/phur3ya6AG",
              expanded_url: "http://www.yang2020.com",
              display_url: "yang2020.com",
              indices: [136, 159]
            }
          ]
        }
      },
      protected: false,
      followers_count: 794932,
      friends_count: 5567,
      listed_count: 3290,
      created_at: "Tue Dec 03 21:31:03 +0000 2013",
      favourites_count: 9250,
      utc_offset: null,
      time_zone: null,
      geo_enabled: true,
      verified: true,
      statuses_count: 10204,
      lang: null,
      contributors_enabled: false,
      is_translator: false,
      is_translation_enabled: false,
      profile_background_color: "C0DEED",
      profile_background_image_url:
        "http://abs.twimg.com/images/themes/theme1/bg.png",
      profile_background_image_url_https:
        "https://abs.twimg.com/images/themes/theme1/bg.png",
      profile_background_tile: false,
      profile_image_url:
        "http://pbs.twimg.com/profile_images/1042886888225267712/1W9BKljE_normal.jpg",
      profile_image_url_https:
        "https://pbs.twimg.com/profile_images/1042886888225267712/1W9BKljE_normal.jpg",
      profile_banner_url:
        "https://pbs.twimg.com/profile_banners/2228878592/1561318245",
      profile_link_color: "1DA1F2",
      profile_sidebar_border_color: "C0DEED",
      profile_sidebar_fill_color: "DDEEF6",
      profile_text_color: "333333",
      profile_use_background_image: true,
      has_extended_profile: true,
      default_profile: true,
      default_profile_image: false,
      following: false,
      follow_request_sent: false,
      notifications: false,
      translator_type: "none"
    },
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    is_quote_status: false,
    retweet_count: 1099,
    favorite_count: 8729,
    favorited: false,
    retweeted: false,
    lang: "en"
  },
  {
    created_at: "Tue Sep 10 15:11:09 +0000 2019",
    id: 1171440985168994300,
    id_str: "1171440985168994309",
    full_text:
      "Today is #WorldSuicidePreventionDay - a day to embrace that we all struggle and that suicide and depression are silent killers that affect us all. Acknowledging them is not a sign of weakness but of strength. Everyone is loved and everyone has value, and everyone needs reminders.",
    truncated: false,
    display_text_range: [0, 280],
    entities: {
      hashtags: [
        {
          text: "WorldSuicidePreventionDay",
          indices: [9, 35]
        }
      ],
      symbols: [],
      user_mentions: [],
      urls: []
    },
    in_reply_to_status_id: null,
    in_reply_to_status_id_str: null,
    in_reply_to_user_id: null,
    in_reply_to_user_id_str: null,
    in_reply_to_screen_name: null,
    user: {
      id: 2228878592,
      id_str: "2228878592",
      name: "Andrew Yang",
      screen_name: "AndrewYang",
      location: "USA",
      description:
        "2020 US Presidential Candidate (D). Entrepreneur & Founder of @venture4america My book: https://t.co/TLcOiHDrTR Join the campaign here: https://t.co/phur3ya6AG",
      url: "https://t.co/HP97VkPXqd",
      entities: {
        url: {
          urls: [
            {
              url: "https://t.co/HP97VkPXqd",
              expanded_url: "http://shop.yang2020.com",
              display_url: "shop.yang2020.com",
              indices: [0, 23]
            }
          ]
        },
        description: {
          urls: [
            {
              url: "https://t.co/TLcOiHDrTR",
              expanded_url: "https://amzn.to/2HQMk83",
              display_url: "amzn.to/2HQMk83",
              indices: [88, 111]
            },
            {
              url: "https://t.co/phur3ya6AG",
              expanded_url: "http://www.yang2020.com",
              display_url: "yang2020.com",
              indices: [136, 159]
            }
          ]
        }
      },
      protected: false,
      followers_count: 794932,
      friends_count: 5567,
      listed_count: 3290,
      created_at: "Tue Dec 03 21:31:03 +0000 2013",
      favourites_count: 9250,
      utc_offset: null,
      time_zone: null,
      geo_enabled: true,
      verified: true,
      statuses_count: 10204,
      lang: null,
      contributors_enabled: false,
      is_translator: false,
      is_translation_enabled: false,
      profile_background_color: "C0DEED",
      profile_background_image_url:
        "http://abs.twimg.com/images/themes/theme1/bg.png",
      profile_background_image_url_https:
        "https://abs.twimg.com/images/themes/theme1/bg.png",
      profile_background_tile: false,
      profile_image_url:
        "http://pbs.twimg.com/profile_images/1042886888225267712/1W9BKljE_normal.jpg",
      profile_image_url_https:
        "https://pbs.twimg.com/profile_images/1042886888225267712/1W9BKljE_normal.jpg",
      profile_banner_url:
        "https://pbs.twimg.com/profile_banners/2228878592/1561318245",
      profile_link_color: "1DA1F2",
      profile_sidebar_border_color: "C0DEED",
      profile_sidebar_fill_color: "DDEEF6",
      profile_text_color: "333333",
      profile_use_background_image: true,
      has_extended_profile: true,
      default_profile: true,
      default_profile_image: false,
      following: false,
      follow_request_sent: false,
      notifications: false,
      translator_type: "none"
    },
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    is_quote_status: false,
    retweet_count: 6169,
    favorite_count: 18341,
    favorited: false,
    retweeted: false,
    lang: "en"
  },
  {
    created_at: "Tue Sep 10 02:21:56 +0000 2019",
    id: 1171247403850195000,
    id_str: "1171247403850194946",
    full_text:
      "A robot tax is an appealing idea but very difficult to administer. Is an IPad at a CVS a robot? How about software that eliminates a call center worker? A better way is to tax value transfers which captures the gains of automation in different contexts.",
    truncated: false,
    display_text_range: [0, 253],
    entities: {
      hashtags: [],
      symbols: [],
      user_mentions: [],
      urls: []
    },
    in_reply_to_status_id: null,
    in_reply_to_status_id_str: null,
    in_reply_to_user_id: null,
    in_reply_to_user_id_str: null,
    in_reply_to_screen_name: null,
    user: {
      id: 2228878592,
      id_str: "2228878592",
      name: "Andrew Yang",
      screen_name: "AndrewYang",
      location: "USA",
      description:
        "2020 US Presidential Candidate (D). Entrepreneur & Founder of @venture4america My book: https://t.co/TLcOiHDrTR Join the campaign here: https://t.co/phur3ya6AG",
      url: "https://t.co/HP97VkPXqd",
      entities: {
        url: {
          urls: [
            {
              url: "https://t.co/HP97VkPXqd",
              expanded_url: "http://shop.yang2020.com",
              display_url: "shop.yang2020.com",
              indices: [0, 23]
            }
          ]
        },
        description: {
          urls: [
            {
              url: "https://t.co/TLcOiHDrTR",
              expanded_url: "https://amzn.to/2HQMk83",
              display_url: "amzn.to/2HQMk83",
              indices: [88, 111]
            },
            {
              url: "https://t.co/phur3ya6AG",
              expanded_url: "http://www.yang2020.com",
              display_url: "yang2020.com",
              indices: [136, 159]
            }
          ]
        }
      },
      protected: false,
      followers_count: 794932,
      friends_count: 5567,
      listed_count: 3290,
      created_at: "Tue Dec 03 21:31:03 +0000 2013",
      favourites_count: 9250,
      utc_offset: null,
      time_zone: null,
      geo_enabled: true,
      verified: true,
      statuses_count: 10204,
      lang: null,
      contributors_enabled: false,
      is_translator: false,
      is_translation_enabled: false,
      profile_background_color: "C0DEED",
      profile_background_image_url:
        "http://abs.twimg.com/images/themes/theme1/bg.png",
      profile_background_image_url_https:
        "https://abs.twimg.com/images/themes/theme1/bg.png",
      profile_background_tile: false,
      profile_image_url:
        "http://pbs.twimg.com/profile_images/1042886888225267712/1W9BKljE_normal.jpg",
      profile_image_url_https:
        "https://pbs.twimg.com/profile_images/1042886888225267712/1W9BKljE_normal.jpg",
      profile_banner_url:
        "https://pbs.twimg.com/profile_banners/2228878592/1561318245",
      profile_link_color: "1DA1F2",
      profile_sidebar_border_color: "C0DEED",
      profile_sidebar_fill_color: "DDEEF6",
      profile_text_color: "333333",
      profile_use_background_image: true,
      has_extended_profile: true,
      default_profile: true,
      default_profile_image: false,
      following: false,
      follow_request_sent: false,
      notifications: false,
      translator_type: "none"
    },
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    is_quote_status: false,
    retweet_count: 1721,
    favorite_count: 11899,
    favorited: false,
    retweeted: false,
    lang: "en"
  },
  {
    created_at: "Tue Sep 10 02:10:08 +0000 2019",
    id: 1171244434735976400,
    id_str: "1171244434735976448",
    full_text:
      "This is for my old piano teacher Susan Cody. 😀👍 https://t.co/lvzU38NJbF",
    truncated: false,
    display_text_range: [0, 48],
    entities: {
      hashtags: [],
      symbols: [],
      user_mentions: [],
      urls: [],
      media: [
        {
          id: 1171244411952517000,
          id_str: "1171244411952517121",
          indices: [49, 72],
          media_url:
            "http://pbs.twimg.com/ext_tw_video_thumb/1171244411952517121/pu/img/VBJeD1e-gQvfTHZC.jpg",
          media_url_https:
            "https://pbs.twimg.com/ext_tw_video_thumb/1171244411952517121/pu/img/VBJeD1e-gQvfTHZC.jpg",
          url: "https://t.co/lvzU38NJbF",
          display_url: "pic.twitter.com/lvzU38NJbF",
          expanded_url:
            "https://twitter.com/AndrewYang/status/1171244434735976448/video/1",
          type: "photo",
          sizes: {
            thumb: {
              w: 150,
              h: 150,
              resize: "crop"
            },
            large: {
              w: 320,
              h: 568,
              resize: "fit"
            },
            small: {
              w: 320,
              h: 568,
              resize: "fit"
            },
            medium: {
              w: 320,
              h: 568,
              resize: "fit"
            }
          }
        }
      ]
    },
    extended_entities: {
      media: [
        {
          id: 1171244411952517000,
          id_str: "1171244411952517121",
          indices: [49, 72],
          media_url:
            "http://pbs.twimg.com/ext_tw_video_thumb/1171244411952517121/pu/img/VBJeD1e-gQvfTHZC.jpg",
          media_url_https:
            "https://pbs.twimg.com/ext_tw_video_thumb/1171244411952517121/pu/img/VBJeD1e-gQvfTHZC.jpg",
          url: "https://t.co/lvzU38NJbF",
          display_url: "pic.twitter.com/lvzU38NJbF",
          expanded_url:
            "https://twitter.com/AndrewYang/status/1171244434735976448/video/1",
          type: "video",
          sizes: {
            thumb: {
              w: 150,
              h: 150,
              resize: "crop"
            },
            large: {
              w: 320,
              h: 568,
              resize: "fit"
            },
            small: {
              w: 320,
              h: 568,
              resize: "fit"
            },
            medium: {
              w: 320,
              h: 568,
              resize: "fit"
            }
          },
          video_info: {
            aspect_ratio: [40, 71],
            duration_millis: 11798,
            variants: [
              {
                content_type: "application/x-mpegURL",
                url:
                  "https://video.twimg.com/ext_tw_video/1171244411952517121/pu/pl/-u0OXZiNpbLuXHgz.m3u8?tag=10"
              },
              {
                bitrate: 632000,
                content_type: "video/mp4",
                url:
                  "https://video.twimg.com/ext_tw_video/1171244411952517121/pu/vid/320x568/6wJK54A7cm6rl2eG.mp4?tag=10"
              }
            ]
          },
          additional_media_info: {
            monetizable: false
          }
        }
      ]
    },
    in_reply_to_status_id: null,
    in_reply_to_status_id_str: null,
    in_reply_to_user_id: null,
    in_reply_to_user_id_str: null,
    in_reply_to_screen_name: null,
    user: {
      id: 2228878592,
      id_str: "2228878592",
      name: "Andrew Yang",
      screen_name: "AndrewYang",
      location: "USA",
      description:
        "2020 US Presidential Candidate (D). Entrepreneur & Founder of @venture4america My book: https://t.co/TLcOiHDrTR Join the campaign here: https://t.co/phur3ya6AG",
      url: "https://t.co/HP97VkPXqd",
      entities: {
        url: {
          urls: [
            {
              url: "https://t.co/HP97VkPXqd",
              expanded_url: "http://shop.yang2020.com",
              display_url: "shop.yang2020.com",
              indices: [0, 23]
            }
          ]
        },
        description: {
          urls: [
            {
              url: "https://t.co/TLcOiHDrTR",
              expanded_url: "https://amzn.to/2HQMk83",
              display_url: "amzn.to/2HQMk83",
              indices: [88, 111]
            },
            {
              url: "https://t.co/phur3ya6AG",
              expanded_url: "http://www.yang2020.com",
              display_url: "yang2020.com",
              indices: [136, 159]
            }
          ]
        }
      },
      protected: false,
      followers_count: 794932,
      friends_count: 5567,
      listed_count: 3290,
      created_at: "Tue Dec 03 21:31:03 +0000 2013",
      favourites_count: 9250,
      utc_offset: null,
      time_zone: null,
      geo_enabled: true,
      verified: true,
      statuses_count: 10204,
      lang: null,
      contributors_enabled: false,
      is_translator: false,
      is_translation_enabled: false,
      profile_background_color: "C0DEED",
      profile_background_image_url:
        "http://abs.twimg.com/images/themes/theme1/bg.png",
      profile_background_image_url_https:
        "https://abs.twimg.com/images/themes/theme1/bg.png",
      profile_background_tile: false,
      profile_image_url:
        "http://pbs.twimg.com/profile_images/1042886888225267712/1W9BKljE_normal.jpg",
      profile_image_url_https:
        "https://pbs.twimg.com/profile_images/1042886888225267712/1W9BKljE_normal.jpg",
      profile_banner_url:
        "https://pbs.twimg.com/profile_banners/2228878592/1561318245",
      profile_link_color: "1DA1F2",
      profile_sidebar_border_color: "C0DEED",
      profile_sidebar_fill_color: "DDEEF6",
      profile_text_color: "333333",
      profile_use_background_image: true,
      has_extended_profile: true,
      default_profile: true,
      default_profile_image: false,
      following: false,
      follow_request_sent: false,
      notifications: false,
      translator_type: "none"
    },
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    is_quote_status: false,
    retweet_count: 1778,
    favorite_count: 18909,
    favorited: false,
    retweeted: false,
    possibly_sensitive: false,
    lang: "en"
  }
];
