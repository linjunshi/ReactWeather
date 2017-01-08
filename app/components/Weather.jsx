var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
const ErrorModal = require('ErrorModal');

var Weather = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false,
        };
    },
    handleSearch: function (location) {
        var that = this;
        this.setState({
            isLoading: true,
            errorMessage: undefined,
        });
        openWeatherMap.getTemp(location).then(function (temp) {
            that.setState({
                location: location,
                temp: temp,
                isLoading: false,
            });
        }, function (e) {
            that.setState({
                isLoading: false,
                errorMessage: e.message,
            });
        });
    },
    componentDidMount: function () {
        var loc = this.props.location.query.location;
        if (loc && loc.length > 0) {
            this.handleSearch(loc);
            window.location.hash = '#/';
        }
    },
    // react won't re-render the page if the component is already rendered
    // so if you want the component to be changed when you are at the weather
    // page and you change the location param, then you need to do this
    /* it has something to do with the URL changing. By default, your component will not get new props just because the URL updates. In this case, it's the props passed down from react-router that are causing the componentWillReceiveProps method to fire. React-router does care when the URL changes. It watches for URL changes and updates any route components with that new information.
    I hope that clears up why the URL and component seem to be bound together. React-router is the glue.
    */
    componentWillReceiveProps: function () {
        var loc = this.props.location.query.location;
        if (loc && loc.length > 0) {
            this.handleSearch(loc);
            window.location.hash = '#/';
            this.render();
        }
    },
    render: function() {
        var {isLoading, temp, location, errorMessage} = this.state;
        function renderMessage () {
            // debugger;
            if (isLoading){
                return <h3 className='text-center'>Loading...</h3>
            } else if (temp && location){
                return <WeatherMessage temp={temp} location={location}/>
            }
        }

        function renderError () {
            if (typeof errorMessage === 'string') {
                return (
                    <ErrorModal message={errorMessage}/>
                )
            }
        }

        return (
            <div>
                <h1 className='text-center page-title'>Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
                {renderError()}
            </div>
        );
    }
});

module.exports = Weather;
