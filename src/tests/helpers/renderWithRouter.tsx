import React, { ReactElement } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render, RenderResult } from '@testing-library/react';

interface RenderWithRouterResult extends RenderResult {
  history: MemoryHistory;
}

const renderWithRouter = (
  component: ReactElement,
  historyEntries: string[] = ['/'],
): RenderWithRouterResult => {
  const history = createMemoryHistory({ initialEntries: historyEntries });
  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
};

export default renderWithRouter;
