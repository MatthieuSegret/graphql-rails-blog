MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createPost, field: PostMutations::Create.field
  field :updatePost, field: PostMutations::Update.field
  field :deletePost, field: PostMutations::Destroy.field

  field :createComment, field: CommentMutations::Create.field

  field :signIn, field: AuthMutations::SignIn.field
  field :revokeToken, field: AuthMutations::RevokeToken.field

  field :signUp, field: UserMutations::SignUp.field
  field :updateUser, field: UserMutations::Update.field
  field :changePassword, field: UserMutations::ChangePassword.field
  field :cancelAccount, field: UserMutations::CancelAccount.field
end
