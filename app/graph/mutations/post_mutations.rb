module PostMutations
  Create = GraphQL::Relay::Mutation.define do
    name "createPost"
    description "create Post"

    input_field :title, types.String
    input_field :content, types.String

    return_field :post, PostType
    return_field :errors, types[AttributeErrorType]

    resolve(Auth.protect ->(obj, inputs, ctx) {
      new_post = ctx[:current_user].posts.build(inputs.to_params)

      if new_post.save
        { post: new_post }
      else
        { errors: new_post.attributes_errors }
      end
    })
  end

  Update = GraphQL::Relay::Mutation.define do
    name "updatePost"
    description "Update a Post and return Post"

    input_field :id, types.ID
    input_field :title, types.String
    input_field :content, types.String

    return_field :post, PostType
    return_field :errors, types[AttributeErrorType]

    resolve(Auth.protect ->(obj, inputs, ctx) {
      post = Post.find(inputs[:id])

      if ctx[:current_user] != post.user
        AttributeError.error("You can not modify this post because you are not the owner")
      elsif post.update(inputs.to_params)
        { post: post }
      else
        { errors: post.attributes_errors }
      end
    })
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "destroyPost"
    description "Destroy a Post"
    input_field :id, types.ID

    return_field :post, PostType
    return_field :errors, types[AttributeErrorType]

    resolve(Auth.protect ->(obj, inputs, ctx) {
      post = Post.find(inputs[:id])

      if ctx[:current_user] != post.user
        AttributeError.error("You can not modify this post because you are not the owner")
      elsif post.destroy
        { post: post }
      end
    })
  end
end
