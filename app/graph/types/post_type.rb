PostType = GraphQL::ObjectType.define do
  name "Post"
  description "A blog post with title, content, author and total comments"

  field :id, !types.ID
  field :title, types.String, "The title of this post"
  field :content, types.String, "The content of this post"
  field :comments_count, types.String,  "The total numner of comments on this post"
  field :created_at, types.String, "The time at which this post was created"
  field :author, UserType, "Owner of this post" do resolve ->(post, args, ctx){ post.user } end

  field :comments do
    type !types[!CommentType]
    description "All comments association with this post."
    resolve ->(post, args, ctx){
      post.comments.includes(:user).order(created_at: :desc)
    }
  end
end
