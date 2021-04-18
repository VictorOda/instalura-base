/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import websiteProfilePageHOC from '../../src/components/wrappers/WebsiteProfilePage/hoc';
import { authService } from '../../src/services/auth/authService';
import { userService } from '../../src/services/user/userService';
import { breakpointsMedia } from '../../src/theme/utils/breakpointsMedia';
import Post from '../../src/components/commons/Post';

const ProfileContainer = styled.div` 
  max-width: 992px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
 
  ${breakpointsMedia({
    xs: css`
      padding: 0 0 64px 0;
      width: 100%;
    `,
    md: css`
      padding: 96px 0 64px 0;
      width: 90%;
    `,
  })}
`;

const FeedContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  ${breakpointsMedia({
    xs: css`
      padding: 0;
    `,
    md: css`
      padding: 16px;
    `,
  })}
`;

const ProjectsContainer = styled.div`
  flex-grow: 1;
  display: none;

  ${breakpointsMedia({
    md: css`
      display: flex;
    `,
  })}
`;

function FeedPage({ user, posts }) {
  return (
    <ProfileContainer>
      <FeedContainer>
        {posts.map((post) => (
          <Post
            key={post._id}
            username={user.username}
            userPhoto={posts[0].photoUrl}
            photoUrl={post.photoUrl}
          />
        ))}

      </FeedContainer>
      <ProjectsContainer />
    </ProfileContainer>
  );
}

FeedPage.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
};

FeedPage.defaultProps = {
  user: {},
  posts: [],
};

export default websiteProfilePageHOC(FeedPage, {
  pageWrapperProps: {
    seoProps: { headTitle: 'Feed' },
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
