import { render } from '@testing-library/react';

import Header from '@/organisms/Header';

describe('organisms/Header', () => {
  describe('snapshot', () => {
    it('should render and match the snapshot', () => {
      const { container } = render(<Header />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
