import React from "react";
import dva, { connect } from "dva";
import {   } from "dva/router";
import {  HashRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { CacheSwitch, CacheRoute } from "react-router-cache-route";
import routes from "./route.js";
import "./style.css";

// 1. Initialize
const app = dva();

console.log(routes);
console.log(23);

// 2. Model
app.model({
  namespace: "count",
  state: 0,
  reducers: {
    add(count) {
      return count + 1;
    },
    minus(count) {
      return count - 1;
    }
  }
});

class TestError extends React.Component {
  componentDidCatch(e) {
    alert(e.message);
  }
  componentDidMount() {
    // throw new Error('a');
  }
  render() {
    return <div>TestError</div>;
  }
}

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      count: {count}
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}

function List() {
  return (
    <div style={{ height: "100vh", overflow: "auto" }}>
      <h1>M.</h1>
  
      {Array(100)
        .fill("")
        .map((item, idx) => (
          <div key={idx}>
            to <Link to={`/item?id=${idx}`}>Item {idx}</Link>
          </div>
        ))}
    </div>
  );
}

function Item({ location, idx=1, ...restProps }) {
  console.log(location, restProps.params) 
  return (
    <div>
      Item {location.search} <Counter />
      <div>
        to <Link to={`/item2?id=${idx}`}>Item {idx}</Link>
      </div>
    </div>
  );
}

export default function App3() {
  return (
    <CacheSwitch>
      <CacheRoute exact path="/" component={List} when="always" />
      <CacheRoute exact path="/item" component={Item} when="always" multiple />
    </CacheSwitch>
  );
}

const App2 = () => {
  return <div>222</div>;
};

// 3. View
const App = connect(({ count }) => ({
  count
}))(function(props) {
  return (
    <div>
      <TestError />
    </div>
  );
});

function RouterConfig({ history }) {
  console.log('history', history)
  return (
    <Router >
      <CacheSwitch>
      
        <CacheRoute exact path="/" component={List} />
        <CacheRoute exact path="/item" component={Item} when="forward" multiple />
        <CacheRoute exact path="/item2" component={List} />
      </CacheSwitch>
    </Router>
  );
}
 
export default RouterConfig;

// 4. Router
app.router(RouterConfig);

// 5. Start
app.start("#root");
