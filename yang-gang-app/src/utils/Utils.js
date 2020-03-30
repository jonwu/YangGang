import * as WebBrowser from "expo-web-browser";
import { useSelector, useDispatch } from "react-redux";
import icYang from "assets/icYang.jpg";
import icBernie from "assets/icBernie.png";
import icTrump from "assets/icTrump.jpg";

export function transformN(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 100000) {
    return (num / 1000).toFixed(0).replace(/\.0$/, "") + "K";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return num;
}

export function openWebBrowser(url, theme) {
  WebBrowser.openBrowserAsync(url, {
    controlsColor: theme.id === 1 ? "FFFFFF" : "0000000",
    toolbarColor: theme.id === 0 ? "FFFFFF" : "0000000"
  });
}

export function useCandidateResources() {
  const candidate = useSelector(state => state.settings.defaultCandidate);

  switch (candidate) {
    case "andrew_yang":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/83746795_178533293367951_5905284615559446528_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=pp1hqOAXAqgAX_0qMah&oh=95b0d5e3acccfd32d5b4be3b4ca0c528&oe=5E894AEC",
        instagram_name: "andrewyang2020",
        twitter_name: "Andrew Yang",
        avatar: icYang,
        reddit: "YangForPresidentHQ"
      };
    case "bernie_sanders":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/51662345_553471575157171_318595189344043008_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=V4AoGK6p8GQAX9KCUIf&oh=015bb1e14e2019707cb76625d1e5c324&oe=5E85D7C3",
        instagram_name: "berniesanders",
        twitter_name: "Bernie Sanders",
        avatar: icBernie,
        reddit: "SandersForPresident"
      };
    case "donald_trump":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/23823676_515039535523575_7479748231031685120_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=18-BdVJD-JcAX9wdlPa&oh=d6cb946e16dd25ce52387b050dd3accb&oe=5E8015F5",
        instagram_name: "realdonaldtrump",
        twitter_name: "Donald J. Trump",
        avatar: icTrump
      };
    case "elizabeth_warren":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/80842301_496254071023747_5420149689901121536_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=mum9XSfE1Z0AX9rBHT9&oh=efacb00a5c0d0efc55450630d3dec7d5&oe=5E833234",
        instagram_name: "elizabethwarren",
        twitter_name: "Elizabeth Warren",
        avatar: icTrump
      };
    case "tulsi_gabbard":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/81478153_779322202547330_1405455484143534080_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=i5RX6tIMFoEAX8psJNT&oh=9f06ec4a5be9d0d1d2a5b260ae8ce77d&oe=5E81A4BE",
        instagram_name: "tulsigabbard",
        twitter_name: "Tulsi Gabbard",
        avatar: icTrump
      };
    case "pete_buttigieg":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/81941969_493924511236410_2499232037794217984_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=wDNTX1GPF58AX9dtZKM&oh=1962d3aaa0dd8f92611afa76c59678f4&oe=5E878854",
        instagram_name: "pete.buttigieg",
        twitter_name: "Pete Buttigieg",
        avatar: icTrump
      };
    case "joe_biden":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/87542407_190013032223132_6612337159917535232_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=R7dtXNUGEFUAX89DkEN&oh=929c6bdcd3db0540e9a4d7f08134ab56&oe=5E86E4F1",
        instagram_name: "joebiden",
        twitter_name: "Joe Biden",
        avatar: icTrump
      };
    case "amy_klobuchar":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/43913743_1939021533069790_3412901903846080512_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=nnbfTPVvBD8AX-zWeLu&oh=cb7aeb337374193d3f1ae5386a5ad6d9&oe=5E89F88A",
        instagram_name: "amyklobuchar",
        twitter_name: "Amy Klobuchar",
        avatar: icTrump
      };
    case "michael_bloomberg":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/82337838_608363853283387_4829352031820972032_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=BdCVi9AQq2YAX_f_qCv&oh=59c5c58d96ab34638c5d462371c95cf2&oe=5E8DD85C",
        instagram_name: "mikebloomberg",
        twitter_name: "Mike Bloomber",
        avatar: icTrump
      };
    case "barack_obama":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s150x150/16123627_1826526524262048_8535256149333639168_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=SNBjZ24HCBUAX-QPNe_&oh=6cf7b6f8669c1fac0486357c3a43f100&oe=5E8F77A8",
        instagram_name: "barackobama",
        twitter_name: "Barack Obama",
        avatar: icTrump
      };
    default:
      return {};
  }
}
