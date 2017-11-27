QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema. See available queries."

  field :posts do
    type types[PostType]
    description 'Fetch paginated posts collection'
    argument :offset, types.Int, default_value: 0
    argument :keywords, types.String, default_value: nil
    resolve ->(object, args, ctx) {
      Post
        .search(args[:keywords])
        .paginate(args[:offset])
        .order(created_at: :desc)
    }
  end

  field :postsCount do
    type types.Int
    description 'Number of post'
    argument :keywords, types.String, default_value: nil
    resolve ->(object, args, ctx) {
      Post.search(args[:keywords]).count
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
