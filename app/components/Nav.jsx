var React = require('react');
const {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
    onSearch: function (e) {
        e.preventDefault();
        alert('nothing');
    },
    render: function() {
        return (
            <div className='top-bar'>
                <div className='top-bar-left'>
                    <ul className='menu'>
                        <li className='menu-text'>Weather App</li>
                        <li>
                            <IndexLink to='/' activeClassName='active' activeStyle={{ fontWeight: 'bold'}}> [Weather] </IndexLink>
                        </li>
                        <li>
                            <Link to='/About' activeClassName='active' activeStyle={{ fontWeight: 'bold'}}>[About]</Link>
                        </li>
                        <li>
                            <Link to='/Example' activeClassName='active' activeStyle={{ fontWeight: 'bold'}}>[Example]</Link>
                        </li>
                    </ul>
                </div>
                <div className='top-bar-right'>
                    <form onSubmit={this.onSearch}>
                        <ul className="menu">
                          <li>
                            <input type="search" placeholder="Search weather"/>
                          </li>
                          <li>
                            <input type="submit" className="button" value="Get Weather"/>
                          </li>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = Nav;

// when we have a IndexRoute, the link that we want to use is IndexLink