import React from 'react';
import { shallow } from 'enzyme';

import Loader from './Loader';

it('render Loader without crashing', () => {
  shallow(<Loader />);
});
