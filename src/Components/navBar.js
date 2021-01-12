import React, { ReactElement, useEffect, useState } from 'react';
import {
  makeStyles, AppBar, Toolbar, FormControl, InputLabel, Select, MenuItem, Input,theme, withStyles, createStyles, InputBase, IconButton
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import useStateWithLocalStorage from './localStorage';

const useStyles = makeStyles({
  root: {
    userDrag: 'none',
    userSelect: 'none',
    backgroundColor: 'black',
    transition: '0.5s',
    '&.live': {
      backgroundColor: 'black',
    },
  },
  toolbar: {
    padding: '1.25%',
  },
  investmentContainer: {
    textAlign: 'right',
    fontSize: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'initial',
    marginLeft: '2em',
    margin: 0,
  },
  text: {
    margin: 0,
  },
  formControl: {
    minWidth: 250,
    maxWidth: 500,
  },
  addNew: {
    backgroundColor: 'white',
    width: '',
    padding: '0.35%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    right: '4%',
    borderRadius: '6px',
  },
  margin: {
    marginRight: '1vw',
  }
});

const BootstrapInput = withStyles((theme) =>
  createStyles({
    root: {
      width: '8vw',
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '8vw',
    },
  },
};

// const coins = ['sada','dsadsa']

export const NavBar = (props) => {
  const classes = useStyles();
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [coin, setCoin] = useState('None');

  const { coins, currentlyInvested, setcurrentlyInvested, totalInvested, totalEarn } = props;
  console.log(currentlyInvested);
  const handleChange = (event) => {
    setCoin(event.target.value);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }
  
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  }

  const handleConfirm = () => {
    if(amount && price && coin !== 'None') {
      if(!currentlyInvested) {
        const tempCopy = []
        tempCopy.push({
          coin,
          buyingPrice: price,
          buyingAmount: amount
        });
        setcurrentlyInvested(JSON.stringify(tempCopy));
        return
      }
      const tempCopy = JSON.parse(currentlyInvested);
      tempCopy.push({
        coin,
        buyingPrice: price,
        buyingAmount: amount
      });
      setcurrentlyInvested(JSON.stringify(tempCopy));
    }
  }

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.investmentContainer}>
          <h1 className={classes.text}>Currently Invested: {totalInvested}$</h1>
          <h1 className={classes.text}>Current Income: {totalEarn.toFixed(5)}$</h1>
        </div>
    
        <div className={classes.addNew}>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-textbox">Price</InputLabel>
            <BootstrapInput id="demo-customized-textbox" onChange={handlePriceChange} value={price} />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-textbox">Amount</InputLabel>
            <BootstrapInput id="demo-customized-textbox" onChange={handleAmountChange} value={amount} />
          </FormControl>
          {coins.length && (
            <FormControl className={classes.margin}>
            <InputLabel id="demo-customized-select-label">Coin</InputLabel>
            <Select
 
              value={coin}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              {coins.map((coin) => (
                <MenuItem key={coin} value={coin}>
                  {coin}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          )}
          <IconButton aria-label="delete" className={classes.margin}  onClick={handleConfirm}>
            <DoneIcon fontSize="inherit" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
