'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Header = React.createClass({
	mixins: FluxMixin,
	render: function() {
		return (
			<header>
				<div id='brand'>
					<h1>WAGOGE</h1>
					<h5>A procedurally generated dungeon crawler.</h5>
				</div>
				<nav>
					<ul className='navList'>
						<li><a href='#'>About</a></li>
						<li><a href='#'>Github</a></li>
						<li><a href='#'>Play</a></li>
					</ul>
				</nav>
			</header>
		);
	}
});

module.exports = Header;