import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

it('render App without crashing', () => {
  shallow(<App />);
});
