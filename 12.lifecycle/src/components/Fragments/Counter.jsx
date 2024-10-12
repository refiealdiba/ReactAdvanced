import React from "react";

// stateFull Component
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }
    componentDidMount() {
        this.setState({ count: 10 });
    }
    render() {
        return (
            <div>
                <h1 className="text-3xl font-bold">{this.state.count}</h1>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>+</button>
            </div>
        );
    }
}

export default Counter;
