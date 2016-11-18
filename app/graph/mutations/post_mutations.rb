module PostMutations
  Create = GraphQL::Relay::Mutation.define do
    name "createPost"
    description "create Post"

    input_field :title, types.String
    input_field :content, types.String

    return_field :post, PostType
    return_field :errors, types[AttributeErrorType]

    resolve -> (obj, inputs, ctx) {
      new_post = User.last.posts.build(inputs.to_params)

      if new_post.save
        { post: new_post }
      else
        { errors: new_post.attributes_errors }
      end
    }
  end

  Update = GraphQL::Relay::Mutation.define do
    name "updatePost"
    description "Update a Post and return Post"

    input_field :id, types.ID
    input_field :title, types.String
    input_field :content, types.String

    return_field :post, PostType
    return_field :errors, types[AttributeErrorType]

    resolve -> (obj, inputs, ctx) {
      post = Post.find(inputs[:id])

      if post.update(inputs.to_params)
        { post: post }
      else
        { errors: post.attributes_errors }
      end
    }
  end
end
