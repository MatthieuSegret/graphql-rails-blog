MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createPost, field: PostMutations::Create.field
end
