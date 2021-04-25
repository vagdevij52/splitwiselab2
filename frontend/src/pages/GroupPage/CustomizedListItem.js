import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CustomizedListItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          open: false
        };
        this.handleClick = this.handleClick.bind(this);
      }
  
      handleClick() {
        console.log("Handle Clicked....");
         this.setState(prevState => ({
           open: !prevState.open
         }));
      }
  
    render(){
    const { doc } = this.props;
    return (
      <div>
        <ListItem button key={doc.expenseDesc} onClick={this.handleClick}>
          <ListItemText style={{fontSize:"50"}} primary={doc.expenseDesc} />
          {/* {this.state.open ? <ExpandLess /> : <ExpandMore />} */}
          {/* <Button style={{borderColor:"#ccc",padding:"6px 10px",fontSize:"5px",float:"right",background:"#ff652f",color:"#fff",fontWeight:"bold",borderRadius:"7px"}} variant="primary" onClick={handleShow}>
                        Add an expense
                    </Button> */}
        </ListItem>

        {/* <Collapse
        //   key={doc.Sheets.Id}
          in={this.state.open}
          timeout='auto'
          unmountOnExit
        >
        <List style={{fontSize:"50px"}} component='li' disablePadding key={doc.expenseDesc}>
                <TextField
        //   id="filled-multiline-static"
          style={{background:"ff652f",fontSize:"50px"}}
          label="Add expense comment"
          multiline
          rows={8}
          value={this.state.value}
          variant="filled"
        />
        <Button style={{background:"#ff652f"}}>Post</Button>
        </List>
      </Collapse> */}

      {/* <Divider /> */}
      </div>
      )
    }
  }


  export default CustomizedListItem