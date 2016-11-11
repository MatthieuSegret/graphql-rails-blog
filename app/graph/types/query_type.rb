QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema. See available queries."

  field :posts do
    type types[PostType]
    description 'Fetch all Posts'
    resolve ->(object, args, ctx) {
      Post.includes(:user, :comments).order(created_at: :desc)
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
