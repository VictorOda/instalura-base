/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Box } from '../../foundation/layout/Box';
import { useDarkMode } from '../../../theme/utils/themeMode';
import Modal from '../../commons/Modal';
import FormCadastro from '../../patterns/FormCadastro';
import Menu from '../../commons/Menu';
import Footer from '../../commons/Footer';
import { SEO } from '../../commons/SEO';
import { WebsitePageContext } from './context';

export { WebsitePageContext } from './context';

export default function WebsitePageWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
  messages,
}) {
  const [mode, toggleMode] = useDarkMode();
  const [isModalOpen, setModalState] = React.useState(false);

  return (
    <WebsitePageContext.Provider
      value={{
        toggleModalCadastro: () => setModalState(!isModalOpen),
        getCMSContent: (cmsKey) => get(messages, cmsKey),
      }}
    >
      <SEO {...seoProps} />

      <Box
        flex={1}
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        justifyContent="space-between"
        // eslint-disable-next-line no-nested-ternary
        backgroundImage={pageBoxProps.backgroundRepeat ? mode === 'main' ? 'url(/images/bubblesMain.svg)' : 'url(/images/bubblesDark.svg)' : ''}
        {...pageBoxProps}
      >
        <Modal isOpen={isModalOpen} onClose={() => setModalState(false)}>
          {(propsDoModal) => (
            <FormCadastro propsDoModal={propsDoModal} />
          )}
        </Modal>

        {menuProps.display && (
          <Menu mode={mode} toggleMode={toggleMode} onCadastrarClick={() => setModalState(true)} />
        )}

        {children}

        <Footer mode={mode} />
      </Box>
    </WebsitePageContext.Provider>
  );
}

WebsitePageWrapper.defaultProps = {
  seoProps: {},
  pageBoxProps: {},
  menuProps: {
    display: true,
  },
  messages: {},
};

WebsitePageWrapper.propTypes = {
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  pageBoxProps: PropTypes.shape({
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundPosition: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  messages: PropTypes.object,
};
