import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Form from './components/Form'
import List from  './components/List'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/books/:id/edit" component={Form} />
        <Route path="/books/new" component={Form} />
        <Route path="/books" component={List} />
      </Switch>
    </Router>
  );
}

export default App;
