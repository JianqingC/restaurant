import React from 'react'; 


export default class StoreBlkSlider extends React.Component {
	
	constructor(){
		super();
		this.nextThree = this.nextThree.bind(this);
		this.prevThree = this.prevThree.bind(this);
		this.FlipPage = this.FlipPage.bind(this);
		this.state={
			/*centered:{
				marginLeft:'40%',
				width:'20%',
			},
			cardRow:{
				width:"92%",
				margin:'5% 5% 5% 3%',
				overflowX:"hidden",
				overflowY:"hidden",
				//backgroundColor:"tan",
				display:'inline-flex',
			},
			showing:{
				display:'block',
				border: '1px solid #fff',
				padding:'3%',
				margin:'0',
				marginLeft:'2%',
				width:"31.33%",
				height:"200px",
				overflowX:"auto",
				overflowY:"auto",
				backgroundColor:"#DEDBD8",
				//position:'absolute',
				//top:"1%",
				verticalAlign:'top'
			},
			hiding:{
				display:"none",
			},*/
		}
	}
	FlipPage(e){
		console.log("click page");
		var page_new = parseInt($(e.target).attr('class').split("=")[1].split("-")[0]);
		
		var animateCss = require('animate.css-js');
		var start = ($(".cardRow").attr('class').split(' ').filter(function(x){return x.split('=').length==2;}));
		var start_now= parseInt(start[0].split('=')[1]);
		for(var i = 0; i<3; i++){
			animateCss.animate(document.querySelector('#'+this.props.block+'card-'+(start_now+i).toString()),{animationName: 'slideOutLeft',
				duration: 100,
				callbacks: [function(){
					//$('#'+this.props.block+'card-'+(start_now+i).toString()).css("display","");
					
				}]
			});
			$('#'+this.props.block+'card-'+(start_now+i).toString()).removeClass('showing').addClass('hiding');//.css('hiding');
			$('#'+this.props.block+'card-'+(page_new+i).toString()).addClass('showing').removeClass('hiding');//.css('showing');
			animateCss.animate(document.querySelector('#'+this.props.block+'card-'+(page_new+i).toString()),{animationName: 'slideInRight',
				duration: 500,
				callbacks: [function(){
				}]
			});
		}

		$(".cardRow").removeClass(start[0]).addClass(start[0].split('=')[0]+"="+(page_new).toString());
	}
	prevThree(e){
		var start = parseInt($("#card-"+this.props.block+"href-1").find("a").attr("class").split("=")[1].split("-")[0]);
		if(start>=3){
			$("#card-"+this.props.block+"href-1").find("a").attr("class","#card="+(start-3).toString()+"-"+(start-1).toString());
			var number_txt = $("#card-"+this.props.block+"href-1").find("a").text();
			$("#card-"+this.props.block+"href-1").find("a").text(parseInt(number_txt)-1);
			$("#card-"+this.props.block+"href-2").find("a").attr("class",$("#card-"+this.props.block+"href-1").find("a").attr("class"));
			number_txt = $("#card-"+this.props.block+"href-2").find("a").text();
			$("#card-"+this.props.block+"href-2").find("a").text(parseInt(number_txt)-1);

			$("#card-"+this.props.block+"href-3").find("a").attr("class",$("#card-"+this.props.block+"href-2").find("a").attr("class"));
			number_txt = $("#card-"+this.props.block+"href-3").find("a").text();
			$("#card-"+this.props.block+"href-3").find("a").text(parseInt(number_txt)-1);
		}
	}
	nextThree(e){
		var end = parseInt($("#card-"+this.props.block+"href-3").find("a").attr("class").split("=")[1].split("-")[1]);
		if(end<=(this.props.wholeSet.length-3)){
			$("#card-"+this.props.block+"href-1").find("a").attr("class",$("#card-"+this.props.block+"href-2").find("a").attr("class"));
			var number_txt = $("#card-"+this.props.block+"href-1").find("a").text();
			$("#card-"+this.props.block+"href-1").find("a").text(parseInt(number_txt)+1);
			$("#card-"+this.props.block+"href-2").find("a").attr("class",$("#card-"+this.props.block+"href-3").find("a").attr("class"));
			number_txt = $("#card-"+this.props.block+"href-2").find("a").text();
			$("#card-"+this.props.block+"href-2").find("a").text(parseInt(number_txt)+1);
			$("#card-"+this.props.block+"href-3").find("a").attr("class","#card="+(end+1).toString()+"-"+(end+3).toString());
			number_txt = $("#card-"+this.props.block+"href-3").find("a").text();
			$("#card-"+this.props.block+"href-3").find("a").text(parseInt(number_txt)+1);
		}
	}
	render() {
		//var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
		return (
			<div>
				<div style={this.state.cardRow} className='startData=0 cardRow'>
				{this.props.wholeSet.map(function(blk,index){return <div key={index} id={this.props.block+"card-"+index} className={(index<3)?'showing':'hiding'}><h5 className="text-danger">{blk.name}  {index}</h5><div className="card-block"><div>stars: {blk.stars}</div><div>location: {blk.location.city},{blk.location.zip},{blk.location.state}</div><div>categories: {blk.categories.join(" ")}</div></div></div>},this)}
				</div>	
				{this.props.wholeSet.length>3?<ul className="pagination pagination-md centered" >
					<li onClick={this.prevThree}><a>&laquo;</a></li>
					<li id={"card-"+this.props.block+"href-1"}><a className="#card=0-2" onClick={this.FlipPage}>1</a></li>
					<li id={"card-"+this.props.block+"href-2"}><a className="#card=3-5" onClick={this.FlipPage}>2</a></li>
					<li id={"card-"+this.props.block+"href-3"}><a className="#card=6-8" onClick={this.FlipPage}>3</a></li>
					<li onClick={this.nextThree}><a>&raquo;</a></li>
				</ul>:<span></span>}
			</div>
		);
	}
}
/*
	<div style={this.state.cardRow} className='startData=0 cardRow'>{this.props.wholeSet.map(function(blk,index){return <ReactCSSTransitionGroup  transitionName="pageSlider" transitionEnterTimeout={800} transitionLeaveTimeout={500} key={index} id={"card-"+index} style={(index<3)?this.state.showing:this.state.hiding}><h5 className="text-danger">{blk.name}</h5><div className="card-block"><div>stars: {blk.stars}</div><div>location: {blk.location.city},{blk.location.zip},{blk.location.state}</div><div>categories: {blk.categories.join(" ")}</div></div></ReactCSSTransitionGroup>},this)}</div>					*/
						
