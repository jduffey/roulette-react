import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { Home } from '../../components/Home';

describe('Home', () => {
    it('renders', () => {
        const view = renderer.create(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(view).toMatchSnapshot();
    });
});
