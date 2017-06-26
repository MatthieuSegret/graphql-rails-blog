module ConcurrentBatchSetup
  module_function

  def before_query(query)
    # Use the same executor for batch queries
    GraphQL::Batch::Executor.current ||= GraphQL::Batch::Executor.new
  end

  def after_query(query)
    GraphQL::Batch::Executor.current = nil
  end
end