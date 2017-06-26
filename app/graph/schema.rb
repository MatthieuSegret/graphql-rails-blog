Schema = GraphQL::Schema.define do
  query QueryType
  mutation MutationType

  instrument :query, ConcurrentBatchSetup
  lazy_resolve GraphQL::Batch::Promise, :sync
end
