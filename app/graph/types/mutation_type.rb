MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createPost, field: PostMutations::Create.field
  field :updatePost, field: PostMutations::Update.field
  field :destroyPost, field: PostMutations::Destroy.field
end
