import React from 'react';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function LoginPage() {
  return (
    <div>
      Página de Login
    </div>
  );
}

export default websitePageHOC(LoginPage, {
  pageWrapperProps: {
    seoProps: { headTitle: 'Login' },
    pageBoxProps: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
    },
    menuProps: { display: false },
  },
});
