QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema. See available queries."

  field :posts do
    type types[PostType]
    description 'Fetch paginated posts collection'
    argument :offset, types.Int, default_value: 0
    argument :keywords, types.String, default_value: nil
    resolve ->(object, args, ctx) {
      posts = Post.paginate(args[:offset]).includes(:user, :comments).order(created_at: :desc)
      posts = posts.search(args[:keywords]) if args[:keywords].present?
      posts
    }
  end

  field :postsCount do
    type types.Int
    description 'Number of post'
    argument :keywords, types.String, default_value: nil
    resolve ->(object, args, ctx) {
      args[:keywords].present? ? Post.search(args[:keywords]).count : Post.count
    }
  end

  field :post, PostType do
    argument :id, types.ID
    description 'fetch a Post by id'
    resolve ->(object, args, ctx){
      Post.find(args[:id])
    }
  end
end
