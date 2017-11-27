module CommentMutations
  Create = GraphQL::Relay::Mutation.define do
    name "createComment"
    description "create Comment"

    input_field :postId, types.ID
    input_field :content, types.String

    return_field :comment, CommentType
    return_field :messages, types[FieldErrorType]

    resolve(Auth.protect ->(obj, inputs, ctx) {
      post = Post.find(inputs[:postId])
      new_comment = post.comments.build(content: inputs[:content])
      new_comment.user = ctx[:current_user]

      if new_comment.save
        { comment: new_comment }
      else
        { messages: new_comment.fields_errors }
      end
    })
  end
end
