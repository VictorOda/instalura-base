/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import WebsiteProfilePageWrapper from '..';
import WebsiteGlobalProvider from '../../WebsitePage/provider';

export default function websiteProfilePageHOC(
  Component,
  { pageWrapperProps } = { pageWrapperProps: {} },
) {
  return (props) => (
    <WebsiteGlobalProvider>
      <WebsiteProfilePageWrapper
        {...pageWrapperProps}
        {...props.pageWrapperProps}
        messages={props.messages}
      >
        <Component {...props} />
      </WebsiteProfilePageWrapper>
    </WebsiteGlobalProvider>
  );
}
