PostType = GraphQL::ObjectType.define do
  name "Post"
  description "A blog post with title, content, author and total comments"

  field :id, !types.ID
  field :title, types.String, "The title of this post"
  field :content, types.String, "The content of this post"
  field :comments_count, types.String,  "The total numner of comments on this post"
  field :created_at, types.String, "The time at which this post was created"
  field :description, types.String, "The beginning of the content"

  field :author, UserType, "Owner of this post" do
    resolve ->(post, args, ctx) {
      RecordLoader.for(User).load(post.user_id)
    }
  end

  field :comments do
    type !types[!CommentType]
    description "All comments association with this post."
    resolve ->(post, args, ctx){
      post.comments.order(created_at: :desc)
    }
  end
end
