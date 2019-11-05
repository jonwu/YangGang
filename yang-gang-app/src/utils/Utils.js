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
  const candidate = useSelector(state => state.app.candidate);

  switch (candidate) {
    case "andrew_yang":
      return {
        instagram_avatar:
          "https://instagram.fsac1-2.fna.fbcdn.net/vp/fb6fc134d1253d3360613dc9af6459bd/5E362130/t51.2885-19/s150x150/56262993_427967544632392_4799321311249694720_n.jpg?_nc_ht=instagram.fsac1-2.fna.fbcdn.net",
        instagram_name: "andrewyang2020",
        twitter_name: "Andrew Yang",
        avatar: icYang,
        reddit: "YangForPresidentHQ"
      };
    case "bernie_sanders":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/vp/1ee26506426352e462d96f765764148b/5E511BC3/t51.2885-19/s320x320/51662345_553471575157171_318595189344043008_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com",
        instagram_name: "berniesanders",
        twitter_name: "Bernie Sanders",
        avatar: icBernie,
        reddit: "SandersForPresident"
      };
    case "donald_trump":
      return {
        instagram_avatar:
          "https://scontent-sjc3-1.cdninstagram.com/vp/683de42b9d3c31699345c9371e00c1da/5E5888F5/t51.2885-19/s320x320/23823676_515039535523575_7479748231031685120_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com",
        instagram_name: "realdonaldtrump",
        twitter_name: "Donald J. Trump",
        avatar: icTrump
      };
    default:
      return {};
  }
}
