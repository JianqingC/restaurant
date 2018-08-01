import React from 'react'; 

import StoreBlk from '../components/StoreBlk.js';
import StoreBlkSlider from '../components/StoreBlkSlider.js';

export default class TopTen extends React.Component {
   render(){
      return (
         <div className="container well first-blk">
            <h4 className="text-primary">Top Reviewed Restaurant</h4>
            <div className="row"><StoreBlkSlider
                  block={'top-'} wholeSet={this.props.wholeSet}/>
            </div>
         </div>
      );
   }
}
/*
<div className="row">{this.props.wholeSet.map((dynamicComponent, i) => <StoreBlkSlider
                  key = {i} componentData = {dynamicComponent}/>)}
            </div>
            */