import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import price from './Services/getPrice';
import Navbar from './navBar';
import useStateWithLocalStorage from './localStorage';
import TemporaryDrawer from './removeFab';

const useStyles = makeStyles({
  rootContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "1%",
    backgroundColor: "rgb(28, 27, 27)",
    flexWrap: 'wrap',
    overflow: 'hidden',
    position: 'fixed',
    width: '100vw',
    justifyContent: 'center',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%,-50%)',
  },
  itemHeading: {
    position: 'relative',
    bottom: '6%',
    backgroundColor: "rgb(28, 27, 27)",
    color: 'rgb(255, 255, 255)',
    fontSize: '1.25rem',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
  },
  text: {
    margin: '0 0.5vw',
  },
  iframContainer: {
    margin: "0.5vw",
    maxWidth: "25vw",
    height: "560px",
    backgroundColor: "#1D2330",
    overflow: "hidden",
    boxSizing: "border-box",
    border: "1px solid #56667F",
    borderRadius: "4px",
    textAlign: "right",
    lineHeight: "14px",
    fontSize: "12px",
    fontFeatureSettings: "normal",
    textSizeAdjust: "100%",
    boxShadow: "inset 0 -20px 0 0 #56667F",
    padding: "0px",
    // margin: "0px",
    width: "100%"
  },
  iframeInnerContainer: {
    height: "540px",
    padding: "0px",
    margin: "0px",
    width: "100%"
  },
  errMessage: {
    marginLeft: 5,
  },
  chartContainer: {
    margin: '0vw 2vw',
  }
});

export const Overlay = () => {
  const classes = useStyles();
  const crpyptoId = ['bitcoin','ethereum', 'chainlink'];
  const [data, setData] = useState([]);
  const [coins, setCoins] = useState([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalEarn, setTotalEarned] = useState(0);

  const [loading, setLoading] = useState(true);
  const [currentlyInvested, setcurrentlyInvested] = useStateWithLocalStorage('currentlyInvested');

  // useEffect(() => {
  //   setcurrentlyInvested(crpyptoId);
  // }, []);

  console.log(currentlyInvested);
  useEffect(() => {
    console.log('doing')
    async function getData() {
      try {
        const response = await price.get();
        console.log(response)
        const objMap=[];
        const getList = [];
        if(currentlyInvested) {
          JSON.parse(currentlyInvested).forEach((e1)=>response.forEach((e2)=> {if(e1.coin === e2.id){
            objMap.push({...e2, ...e1})
          }}));
        }
        
        response.forEach((e1)=> {
          getList.push(e1.id);
        });
        setData(objMap);
        console.log(getList)
        setCoins(getList);
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false);
      }
    }
    getData()
    const interval = setInterval(() => {
      getData();
    }, 20000);
    return () => clearInterval(interval);
    // if(currentlyInvested).length) {
    // }
  }, [currentlyInvested]);

  useEffect(() => {
    if(data.length) {
      let _totalIncome = 0;
      let _totalInvested = 0
      data.forEach((item) => {
        _totalIncome += ((item.price * item.buyingAmount) - (item.buyingAmount * item.buyingPrice));
        _totalInvested += item.buyingAmount * item.buyingPrice;
      })
      setTotalEarned(_totalIncome);
      setTotalInvested(_totalInvested);
    }
  }, [data])
  return (
    <>
    <TemporaryDrawer currentlyInvested={currentlyInvested} setcurrentlyInvested={setcurrentlyInvested} />
    <Navbar coins={coins} currentlyInvested={currentlyInvested} setcurrentlyInvested={setcurrentlyInvested} totalInvested={totalInvested} totalEarn={totalEarn} />
    <div className={classes.rootContainer}>
      {data.length && data.map((item) => (
        <div className={classes.chartContainer}>
          <coin-stats-chart-widget type="large" coin-id={item.id} width="435" chart-height="180" currency="USD" locale="en" bg-color="#1C1B1B" status-up-color="#74D492" status-down-color="#FE4747" text-color="#FFFFFF" buttons-color="#1C1B1B" chart-color="#FFA959" chart-gradient-from="rgba(255,255,255,0.07)" chart-gradient-to="rgba(0,0,0,0)" border-color="rgba(255,255,255,0.15)" btc-color="#6DD400" eth-color="#67B5FF" chart-label-background="#000000" candle-grids-color="rgba(255,255,255,0.1)"></coin-stats-chart-widget>
          <div className={classes.itemHeading}>
            <p className={classes.text}>{item.price.toFixed(5)} USD</p>
            <p className={classes.text}>Asset: {item.buyingAmount}</p>
            <p className={classes.text}>{((item.price * item.buyingAmount) - (item.buyingAmount * item.buyingPrice)).toFixed(5)}</p>
          </div>
        </div>
        // <div className={classes.iframContainer}>
        //   <div className={classes.iframeInnerContainer}>
        //     <iframe
        //       src={`https://widget.coinlib.io/widget?type=chart&theme=dark&coin_id=${item}&pref_coin_id=1505`}
        //       width="100%"
        //       height="536px"
        //       scrolling="auto"
        //       marginWidth={0}
        //       marginHeight={0}
        //       frameBorder={0}
        //       border={0}
        //       style={{ border: 0, margin: 0, padding: 0, lineHeight: "14px" }}
        //     />
        //   </div>
        // </div>
      ))}
    </div>
    </>
  );
}

export default Overlay;