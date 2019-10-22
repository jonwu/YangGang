import React from 'react';
import './App.css';
import View from './View';
import preview from './preview.gif'
import frame from './frame.png'
import ios from './ios.png'
import android from './android.png'
import {
  isMobileOnly
} from "react-device-detect";

const FRAME_SIZE = 600;
const SCREEN_SIZE = FRAME_SIZE * .95;

const WHITE = (opacity = 1.0) => `rgba(255, 255, 255, ${opacity})`;
const BLACK = (opacity = 1.0) => `rgba(0, 0, 0, ${opacity})`;
const YANG = (opacity = 1.0) => `rgba(0, 45, 122, ${opacity})`;
const YANG_RED = (opacity = 1.0) => `rgba(218, 50, 72, ${opacity})`;
const YANG_BLUE = (opacity = 1.0) => `rgba(19, 52, 103, ${opacity})`;
const YANG_BLUE_LIGHT = (opacity = 1.0) =>
  `rgba(108, 172, 228, ${opacity})`;
const YANG_BLUE_DARK = (opacity = 1.0) => `rgba(19, 41, 75, ${opacity})`;
const YANG_GOLD = (opacity = 1.0) => `rgba(242, 160, 15, ${opacity})`;


function App() {
  if(isMobileOnly) return <View style={{ width: '100vw', backgroundColor: YANG_RED()}}>
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    
      
        <h1 style={{fontSize: 24, color: WHITE(0.5)}}>Everything on <span style={{color: WHITE()}}>Andrew Yang</span></h1>
        <View style={{paddingTop: 8, paddingBottom: 16}}>
        <p1 style={{color: WHITE(), marginBottom: 16, alignSelf: 'center'}}>Get the app.</p1>
        <View row>
          <a href={"https://apps.apple.com/us/app/yang-humanity-first/id1477732890"}>
            <img src={ios} alt="download on ios" style={{width: 130, height: 130 * 120/411, marginRight: 8}}/>
          </a>
          <a href={"https://play.google.com/store/apps/details?id=com.jonwu.yang"}>
            <img src={android} alt="download on android"  style={{width: 130, height: 130 * 120/411}}/>
          </a>
        </View>      
        </View>      
      
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
      <View style={{height: FRAME_SIZE, width: FRAME_SIZE * 720/1444, alignItems: 'center', justifyContent: 'center'}}>
        <a href={"https://google.com"}>
          <img src={preview} alt="preview" style={{height: SCREEN_SIZE, width: SCREEN_SIZE * 444/960}} />
        </a>
        <img src={frame} alt="preview" style={{position: 'absolute', height: FRAME_SIZE, width: FRAME_SIZE * 720/1444}} />
      </View>
      </View>
     
    
  </View>
  return (
    <View style={{ height: '100vh', width: '100vw', backgroundColor: YANG_RED()}}>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <View row>
          <View style={{height: FRAME_SIZE, width: FRAME_SIZE * 720/1444, alignItems: 'center', justifyContent: 'center'}}>
            <img src={preview} alt="preview" style={{height: SCREEN_SIZE, width: SCREEN_SIZE * 444/960}} />
            <img src={frame} alt="preview" style={{position: 'absolute', height: FRAME_SIZE, width: FRAME_SIZE * 720/1444}} />
          </View>
          <View style={{paddingLeft: 32, paddingRight: 32}}>
            
            <h1 style={{fontSize: 80, color: WHITE(0.5)}}>The<br/><span style={{color: WHITE()}}>Andrew<br/>Yang</span><br/>App</h1>
            <p1 style={{color: WHITE(), marginBottom: 16, alignSelf: 'center'}}>Get the app.</p1>
            <View row>
              <a href={"https://apps.apple.com/us/app/yang-humanity-first/id1477732890"}>
                <img src={ios} alt="download on ios" style={{width: 130, height: 130 * 120/411, marginRight: 8}}/>
              </a>
              <a href={"https://play.google.com/store/apps/details?id=com.jonwu.yang"}>
                <img src={android} alt="download on android"  style={{width: 130, height: 130 * 120/411}}/>
              </a>
            </View>            
          </View>
        </View>
      </View>
    </View>

  );
}

export default App;
