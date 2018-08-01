import React from 'react'; 

import StoreBlkSlider from '../components/StoreBlkSlider'; 

export default class LocR extends React.Component {
   render() {

      return (
         <div className="well container">
            <div className="row center-align-text">
               <h4 className="col-md-12 text-primary">Search Nearby Restaurants</h4>
               <div className="col-md-12 center-align-text-item">
                  <div className="text-warning">Put Location to Find Near Restaurant. </div>
                  <div className="text-muted small">(NOT real map data tracking.)</div>
               </div>
               
            </div>
            <div><LocForm wholeSet={this.props.wholeSet} /></div>
         </div>
      );
   }
}

class LocForm extends React.Component{
   constructor(props) {
      super(props);
      
      this.state = {
         x:"",
         y:"",
         city:"",
         state:"",
         zip:"",
         data: [],
         notice:""
      }

      this.updateState = this.updateState.bind(this);
      //this.updatePin = this.updatePin.bind(this);
      this._onChange = this._onChange.bind(this);
      this._onClick = this._onClick.bind(this);
      this._dropdown = this._dropdown.bind(this);
      this._dropdownClick = this._dropdownClick.bind(this);
   };
   updateState(e) {
      e.preventDefault();
      var cCity= this.state.city;
      var cState = this.state.state;
      var cZip = parseInt(this.state.zip);
      var cX = 0;
      var cY = 0;
      this.setState({data:[]});
      if(!(_.isEmpty(cCity)&&_.isEmpty(cState)&&_.isEmpty(cZip))){
   		var cRLoc = this.props.wholeSet.filter(function(r){return (r.location.city==cCity&&r.location.state==cState&& parseInt(r.location.zip)==cZip);});
   		if(cRLoc.length>0){
            cX= parseInt(cRLoc[0].location.x);
      	   cY = parseInt(cRLoc[0].location.y);
         }else{
            this.setState({notice:"No record found"})
            return;
         }  
      }else{
   		cX= parseInt(this.state.x);
   		cY = parseInt(this.state.y);
      }
      //or maybe pipe to somewhere else
      var tempState = [];
      this.props.wholeSet.map(function(r){
         if((r.location.x>=cX-100)&&(r.location.x<=cX+100)&&(r.location.y>=cY-100)&&(r.location.y<=cY+100)){
            tempState.push(r);
         }
      });
      if(tempState.length>0){
         this.setState({data: tempState});
         $("#locForm").trigger("reset");
      }else{
         this.setState({notice:"No record found"});
      }
   }
   _onClick(e) {
      var state = {};
      var Mock = require('mockjs');
      state['x'] = (function(){return Mock.Random.integer(-500,500);})();
      state['y'] = (function(){return Mock.Random.integer(-500,500);})();
      this.setState(state);
   }
   _onChange(e) {
      var state = {};
      state[e.target.name] =  e.target.value;
      this.setState(state);
   }
   _dropdown(e){
      var dropdownBtn = e.target;
      var $dropdownMenu = $($(dropdownBtn).parent().find(".dropdown-menu")[0]);
      if($dropdownMenu.css("display")=="none"){
         $dropdownMenu.show();
      }else{
         $dropdownMenu.hide();
      }
   }
   _dropdownClick(e){
      var dropdownItem = e.target;
      var dropdownTag = $($(dropdownItem).parent().parent().find("input")[0]).attr("name");
      var state = {dropdownTag:$(dropdownItem).text()};
      this.setState(state);
      $(dropdownItem).parent().hide();
      $("#"+dropdownTag).val($(dropdownItem).text());
   }
   render() {
      return (
         <div className="">
	         <form className="form-inline" onSubmit= {this.updateState} id="locForm">
   				<div className="form-group">
                  <div className="input-group">
   		            <label className="input-group-addon">City</label>
                     <div className="btn-group">
                       <input type="text"  id="city" name="city" className="form-control" placeholder='City' onChange = {this._onChange} 
                       />
                       <ul className="dropdown-menu">
                         <li onClick={this._dropdownClick}>San Jose</li>
                         <li onClick={this._dropdownClick}>San Fransisco</li>
                         <li onClick={this._dropdownClick}>Los Angelos</li>
                         <li className="text-muted">Other City</li>
                       </ul>
                     </div>
                     <div className="input-group-addon"  onClick={this._dropdown}><span className="caret"></span></div>
                  </div> 
                  <div className="input-group">
   		            <label  className="input-group-addon">State</label>
                     <div className="btn-group">
   					    <input type="text" name="state" id="state" className="form-control"  placeholder='State' onChange = {this._onChange}/>
                     <ul className="dropdown-menu">
                         <li onClick={this._dropdownClick}>CA</li>
                         <li className="text-muted">Other State</li>
                       </ul>
                     </div>
                     <div className="input-group-addon"  onClick={this._dropdown}><span className="caret"></span></div>
                  </div>
   					<div className="input-group">
                     <label  className="input-group-addon">Zip</label>
   					   <input type="text"  id="zip" name="zip" className="form-control"  placeholder='Zip Code' onChange = {this._onChange}/>
                  </div>
                  <div className="form-group">
                     <button onClick = {this._onClick} className="btn btn-info glyphicon glyphicon-map-marker form-control"></button>
                     <button type="submit" value="submit" className="btn btn-primary form-control ">Search</button>
                  </div>
               </div>
               
	         </form>

	         <div>
	         {this.state.data.length>0?<StoreBlkSlider wholeSet={this.state.data} block={'loc-'}/>:<span className="text-primary">{this.state.notice}</span>}
	         </div>
        
         </div>
      );
   }
}