import React from 'react'; 

export default class StoreBlk extends React.Component {
	render() {
		var inlineBLK = {
			border: '1px solid #fff',
			height:'200px',
			padding:'10px',
		};
		return (
			<div className="col-md-4" style={inlineBLK}>
				<div><h5 className="text-danger">{this.props.componentData.name}</h5></div>
				<div>stars: {this.props.componentData.stars}</div>
				<div>location: {this.props.componentData.location.city},{this.props.componentData.location.state},{this.props.componentData.location.zip}</div>
				<div>categories: {this.props.componentData.categories.join(" ")}</div>
			</div>
		);
	}
}