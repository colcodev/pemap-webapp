import React from 'react';
import { shallow } from 'enzyme';

import MapMarker from './MapMarker';

it('render MapMarker without crashing', () => {
  shallow(<MapMarker />);
});
