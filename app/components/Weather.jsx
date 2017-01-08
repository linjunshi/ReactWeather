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
            alert('Success!');
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
        }
    },
    render: function() {
        var {isLoading, temp, location, errorMessage} = this.state;
        function renderMessage () {
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