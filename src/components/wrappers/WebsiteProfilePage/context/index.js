import React from 'react';

export const WebsiteProfilePageContext = React.createContext({
  // toggleModalCadastro: () => {},
  getCMSContent: (cmsKey) => cmsKey,
});
