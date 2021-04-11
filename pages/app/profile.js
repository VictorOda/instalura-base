/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import websiteProfilePageHOC from '../../src/components/wrappers/WebsiteProfilePage/hoc';
import { authService } from '../../src/services/auth/authService';
import { userService } from '../../src/services/user/userService';

const Post = styled.img`
  width: 250px;
  height: 250px;
`;

function ProfilePage({ user, posts }) {
  return (
    <div>
      Página de Profile!
      <pre>
        {JSON.stringify(user, null, 4)}
        {JSON.stringify(posts, null, 4)}
      </pre>
      <div>
        {posts.map((post) => (<Post src={post.photoUrl} key={post._id} alt={post.description} />))}
      </div>
      <img src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif" alt="Nicolas Cage" />
    </div>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
};

ProfilePage.defaultProps = {
  user: {},
  posts: [],
};

export default websiteProfilePageHOC(ProfilePage, {
  pageWrapperProps: {
    seoProps: { headTitle: 'Profile' },
  },
});

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(ctx);
    return {
      props: {
        user: {
          ...session,
          ...profilePage.user,
        },
        posts: profilePage.posts,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login' });
  ctx.res.end();

  return {
    props: {},
  };
}
