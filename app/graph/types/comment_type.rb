CommentType = GraphQL::ObjectType.define do

  name "Comment"
  description "A post comment with content and author"

  field :id, !types.ID
  field :content, types.String, "The content of this comment"
  field :created_at, types.String, "The date on which the comment was posted"
  field :author, UserType, "Owner of this comment" do resolve ->(comment, args, ctx){ comment.user } end
end
