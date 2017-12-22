import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import withFlashMessage from 'components/flash/withFlashMessage';

import DELETE_POST from 'graphql/posts/deletePostMutation.graphql';
import POSTS from 'graphql/posts/postsQuery.graphql';

// typings
import { ApolloQueryResult } from 'apollo-client/core/types';
import { DataProxy } from 'apollo-cache';
import { PostPreviewFragment, PostsQuery, DeletePostMutation, DeletePostMutationVariables } from 'types';

interface IProps {
  post: PostPreviewFragment;
  deletePost: (id: string) => Promise<ApolloQueryResult<DeletePostMutation>>;
  notice: (text: string) => void;
}

class PostActions extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }

  private destroy() {
    if (window.confirm('êtes vous sûre ?')) {
      this.props.deletePost(this.props.post.id).then(response => {
        if (!response.data.deletePost.errors) {
          this.props.notice('Post was successfully destroyed');
        }
      });
    }
    return false;
  }

  public render() {
    const { post } = this.props;

    return (
      <div className="post-actions is-pulled-right">
        <Link to={`/posts/${post.id}/edit`}>
          <span className="icon">
            <i className="fa fa-edit" />
          </span>
        </Link>
        <a onClick={this.destroy}>
          <span className="icon">
            <i className="fa fa-trash-o" />
          </span>
        </a>
      </div>
    );
  }
}

const withDeletePost = graphql<DeletePostMutation, DeletePostMutationVariables>(DELETE_POST, {
  props: ({ mutate }) => ({
    deletePost(postID: string) {
      return mutate!({
        variables: { id: postID },
        update: (store: DataProxy, { data: { deletePost: { post: postDeleted } } }: any): void => {
          if (!postDeleted) return;
          const data = store.readQuery({ query: POSTS }) as PostsQuery;
          if (!data.posts) return;
          data.posts = data.posts.filter(post => post.id !== postDeleted.id);
          data.postsCount -= 1;
          store.writeQuery({ query: POSTS, data });
        }
      });
    }
  })
});

export default compose(withDeletePost, withFlashMessage)(PostActions);
