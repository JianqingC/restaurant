import React from 'react'; 

export default class StoreBlkSlider extends React.Component {
	constructor(){
		super();
		this.nextThree = this.nextThree.bind(this);
		this.prevThree = this.prevThree.bind(this);
	}
	prevThree(e){
		var start = parseInt($("#card-href-1").find("a").attr("href").split("-")[1]);
		if(start>3){
			$("#card-href-1").find("a").attr("href","#"+this.props.block+"card-"+(start-3).toString());
			var number_txt = $("#card-href-1").find("a").text();
			$("#card-href-1").find("a").text(parseInt(number_txt)-1);
			$("#card-href-2").find("a").attr("href","#"+this.props.block+"card-"+(start).toString());
			number_txt = $("#card-href-2").find("a").text();
			$("#card-href-2").find("a").text(parseInt(number_txt)-1);
			$("#card-href-3").find("a").attr("href","#"+this.props.block+"card-"+(start+3).toString());
			number_txt = $("#card-href-3").find("a").text();
			$("#card-href-3").find("a").text(parseInt(number_txt)-1);
		}
	}
	nextThree(e){
		var end = parseInt($("#card-href-3").find("a").attr("href").split("-")[1]);
		if(end<(this.props.wholeSet.length-1)){
			$("#card-href-1").find("a").attr("href","#"+this.props.block+"card-"+(end-3).toString());
			var number_txt = $("#card-href-1").find("a").text();
			$("#card-href-1").find("a").text(parseInt(number_txt)+1);
			$("#card-href-2").find("a").attr("href","#"+this.props.block+"card-"+(end).toString());
			number_txt = $("#card-href-2").find("a").text();
			$("#card-href-2").find("a").text(parseInt(number_txt)+1);
			$("#card-href-3").find("a").attr("href","#"+this.props.block+"card-"+(end+3).toString());
			number_txt = $("#card-href-3").find("a").text();
			$("#card-href-3").find("a").text(parseInt(number_txt)+1);
		}
	}
	render() {
		var centered = {
			marginLeft:'40%',
			width:'20%',
		};
		var cardRow={
			height:"210px",
			padding:'20px',
			margin:'5%',
			overflowX:"hidden",
			overflowY:"hidden",
		};
		var card={
			display:'inline-block',
				border: '1px solid #fff',
				padding:'10px',
				margin:'1%',
				width:"25%",
				height:"200px",
				overflowX:"auto",
				overflowY:"auto",
				//backgroundColor:"white",
				//position:'absolute',
				//top:"1%",
				verticalAlign:'top'
		};
		
		return (
			<div className="row">
				<div style={cardRow} className="row">{this.props.wholeSet.map(function(blk,index){return <div key={index} id={this.props.block+"card-"+index} style={card} className="col-md-offset-1 col-md-3"><h6 className="text-warning">{blk.name}</h6><div className="card-block"><div>stars: {blk.stars}</div><div>location: {blk.location.city},{blk.location.zip},{blk.location.state}</div><div>categories: {blk.categories.join(" ")}</div></div></div>},this)}</div>
				<ul className="pagination pagination-md" style={centered}>
					<li onClick={this.prevThree}><a>&laquo;</a></li>
					<li id="card-href-1"><a href={"#"+this.props.block+"card-1"}>1</a></li>
					<li id="card-href-2"><a href={"#"+this.props.block+"card-4"}>2</a></li>
					<li id="card-href-3"><a href={"#"+this.props.block+"card-7"}>3</a></li>
					<li onClick={this.nextThree}><a>&raquo;</a></li>
				</ul>
			</div>
		);
	}
}
/*
							*/
						
