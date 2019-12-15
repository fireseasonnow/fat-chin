import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import App from './components/App';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function renderApp() {
    render(
        <Provider store={store}>
            <App
                state={store.getState()}
                dispatch={store.dispatch}
            />
        </Provider>,
        document.getElementById('root'),
    );
}

store.subscribe(renderApp);
renderApp();
