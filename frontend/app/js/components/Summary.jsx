import React from 'react';
import SneakerPic from '../../img/iridescent-sneakers.jpeg';
import SneakerPic_2 from '../../img/Big-Money-Sneakers.jpg';
import '../../scss/summary.scss';

const Summary = props => { 
	const shoebox = props.shoebox.map(sneaker=>(
		<div key={sneaker.name}>
			<img className="sneakerPic" src={sneaker.picture} />
			<p className="sneakerName">{sneaker.name}</p>
			<p className="sneakerRating">Rating: {sneaker.rating}</p>
		</div>
		))
	return (
	<div className="message bot">
		<div className="from">Sneak Advisor</div>
		<div className="body">
			<div className="content">
				<div className="today">
					<h3 className="title">Today&apos;s Kicks</h3>
					<img className="sneakerPic" src={SneakerPic} />
					<p className="sneakerName">Iridescent Sneakers</p>
					<p className="sneakerRating">Rating: 4.5/5</p>
				</div>
				<div className="shoebox">
					<h3 className="title">Your ShoeBox</h3> 
					{shoebox}
				</div>
			</div>
  			<div className="timeStamp">{`${props.timeStamp.toLocaleDateString()} ${props.timeStamp.toTimeString().split(' ')[0]}`}</div>
		</div>
	</div>
	)};

Summary.propTypes = {
	timeStamp: React.PropTypes.object.isRequired,
	shoebox: React.PropTypes.array.isRequired,

};

Summary.defaultProps = {
	timeStamp: new Date(),
	shoebox: [
		{
			picture: SneakerPic,
			name: "Iridescent Sneakers",
			rating: "4.5/5"	
		}, 
		{
			picture: SneakerPic_2,
			name: "Big Money Sneakers",
			rating: "4.2/5"	
		}],
};

export default Summary;