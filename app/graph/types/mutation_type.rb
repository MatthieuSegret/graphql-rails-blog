MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createPost, field: PostMutations::Create.field
  field :updatePost, field: PostMutations::Update.field
  field :destroyPost, field: PostMutations::Destroy.field

  field :createComment, field: CommentMutations::Create.field

  field :signUp, field: UserMutations::SignUp.field
  field :updateUser, field: UserMutations::Update.field
end
