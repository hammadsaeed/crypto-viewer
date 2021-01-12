import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const {currentlyInvested, setcurrentlyInvested} = props;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const handleDelete = (coinId, index) => {
    const tempData = JSON.parse(currentlyInvested);
    tempData.splice(index, 1)
    setcurrentlyInvested(JSON.stringify(tempData));
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <List>
        {currentlyInvested && JSON.parse(currentlyInvested).map((text, index) => (
          <ListItem button key={text.coin} onClick={() => handleDelete(text.coin, index)}>
            <h1></h1>
            <ListItemText primary={text.coin} secondary={`${text.buyingAmount} X ${text.buyingPrice}`}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={'right'}>
        <Button onClick={toggleDrawer('right', true)} style={{ position: 'fixed', bottom: '5%', left: '5%', width: '14em', backgroundColor: 'white', fontWeigth: 600}}>{'Delete Entries'}</Button>
        <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
