const GithubUsers = React.createClass({
    displayName: 'GithubUsers',
    propTypes: {
        label: React.PropTypes.string,
    },
    getInitialState () {
        return {
            multi: true
        };
    },
    onChange (value) {
        this.setState({
            value: value,
        });
    },
    switchToMulti () {
        this.setState({
            multi: true,
            value: [this.state.value],
        });
    },
    switchToSingle () {
        this.setState({
            multi: false,
            value: this.state.value ? this.state.value[0] : null
        });
    },
    getUsers (input) {
        // $.get('http://localhost:3100/users')
        //     .fail(function (jqXHR, textStatus, errorThrown) {
        //         console.log('fail?');
        //         alert('failed');
        //     })
        //     .done(function (data, textStatus, jqXHR) {
        //         console.log('done?');
        //         return {options: ['f', 'gg', 'xx']};
        //         // return {options: data};
        //     });

        // TODO: map to value and label

        return fetch(`http://localhost:3100/users`)
            .then((response) => response.json())
            .then((json) => {
                return {
                    options: [
                        {value: 'f', label: 'f'},
                        {value: 'f2', label: 'f2'},
                        {value: 'f4', label: 'f4'},
                        {value: 'f3', label: 'f3'}
                    ]
                };
            });
    },
    gotoUser (value, event) {
        window.open(value.html_url);
    },
    render () {
        return (
            <div className="section">
                <h3 className="section-heading">{this.props.label}</h3>
                <Select.Async multi={true} value={this.state.value} onChange={this.onChange}
                              onValueClick={this.gotoUser} valueKey="value" labelKey="label" loadOptions={this.getUsers}
                              minimumInput={1} backspaceRemoves={false}/>
                <div className="hint">This example uses fetch.js for showing Async options with Promises</div>
            </div>
        );
    }
});

ReactDOM.render(
    <GithubUsers label="GithubUsers"/>,
    document.getElementById('content')
);