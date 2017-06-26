Schema = GraphQL::Schema.define do
  query QueryType
  mutation MutationType

  use GraphQL::Batch
end
