Schema = GraphQL::Schema.define do
  query QueryType
  mutation MutationType

  lazy_resolve Promise, :sync
  instrument :query, GraphQL::Batch::Setup
end
