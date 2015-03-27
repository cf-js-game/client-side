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
						<li><a href='https://github.com/cf-js-game/js-game'>Github</a></li>
					</ul>
				</nav>
			</header>
		);
	}
});

module.exports = Header;