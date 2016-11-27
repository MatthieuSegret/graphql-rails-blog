QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema. See available queries."

  field :posts do
    type types[PostType]
    description 'Fetch paginated posts collection'
    argument :offset, types.Int, default_value: 0
    argument :keywords, types.String, default_value: nil
    resolve ->(object, args, ctx) {
      current_user = ctx[:current_user]
      if current_user
        posts = current_user.posts.paginate(args[:offset])
      else
        posts = Post.paginate(args[:offset])
      end
      posts = posts.includes(:user, :comments).order(created_at: :desc)
      posts = posts.search(args[:keywords]) if args[:keywords].present?
      posts
    }
  end

  field :postsCount do
    type types.Int
    description 'Number of post'
    argument :keywords, types.String, default_value: nil
    resolve ->(object, args, ctx) {
      current_user = ctx[:current_user]
      if current_user
        args[:keywords].present? ? current_user.posts.search(args[:keywords]).count : current_user.posts.count
      else
        args[:keywords].present? ? Post.search(args[:keywords]).count : Post.count
      end
    }
  end

  field :post, PostType do
    argument :id, types.ID
    description 'fetch a Post by id'
    resolve ->(object, args, ctx){
      Post.find(args[:id])
    }
  end

  field :currentUser, UserType do
    description 'fetch the current user.'
    resolve ->(object, args, ctx){
      ctx[:current_user]
    }
  end
end
