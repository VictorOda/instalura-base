/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Box } from '../../foundation/layout/Box';
import { useDarkMode } from '../../../theme/utils/themeMode';
// import Modal from '../../commons/Modal';
// import FormCadastro from '../../patterns/FormCadastro';
import { SEO } from '../../commons/SEO';
import { WebsiteProfilePageContext } from './context';
import ProfileMenu from '../../commons/ProfileMenu';

export { WebsiteProfilePageContext } from './context';

export default function WebsiteProfilePageWrapper({
  children,
  seoProps,
  menuProps,
  messages,
}) {
  const [mode, toggleMode] = useDarkMode();
  const [isModalOpen, setModalState] = React.useState(false);

  return (
    <WebsiteProfilePageContext.Provider
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
        padding="96px 0 64px 0"
        backgroundColor={mode === 'main' ? '#F2F2F2' : '#030506'}
      >
        {/* <Modal isOpen={isModalOpen} onClose={() => setModalState(false)}>
          {(propsDoModal) => (
            <FormCadastro propsDoModal={propsDoModal} />
          )}
        </Modal> */}

        {menuProps.display && (
          <ProfileMenu
            mode={mode}
            toggleMode={toggleMode}
          />
        )}

        {children}

      </Box>
    </WebsiteProfilePageContext.Provider>
  );
}

WebsiteProfilePageWrapper.defaultProps = {
  seoProps: {},
  pageBoxProps: {},
  menuProps: {
    display: true,
  },
  messages: {},
};

WebsiteProfilePageWrapper.propTypes = {
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
