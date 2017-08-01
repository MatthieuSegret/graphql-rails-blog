import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fragments as PostFragments } from 'containers/posts/Post';

export default function (WrappedComponent) {
  const GET_POST = gql`
    query getPost($id: ID) {
      post(id: $id) {
        ...PostFragment
      }
    }
    ${PostFragments.post}
  `;

  const withPost = graphql(GET_POST, {
    options: (ownProps) => ({
      variables: {
        id: ownProps.match.params.id
      }
    })
  });

  return withPost(WrappedComponent);
}
