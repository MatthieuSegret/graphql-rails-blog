class GraphqlController < ApplicationController
  def create
    if params[:query].present?
      # Execute one query
      query_string, variables  = params[:query], params[:variables]
      result = execute(query_string, variables)
    else
      # Execute multi queries
      queries_params = params[:_json]
      result = multiplex(queries_params)
    end

    render json: result
  end


  private

  # Execute one query
  def execute(query_string, variables)
    puts GraphQLFormatter.new(query_string) if Rails.env.development?
    query_variables = ensure_hash(params[:variables])
    result = Schema.execute(
      query_string,
      variables: query_variables,
      context: {
        current_user: current_user,
        request: request
      })
  end

  # Execute multi queries
  def multiplex(queries_params)
    if Rails.env.development?
      queries_params.each { |query| puts GraphQLFormatter.new(query[:query]) }
    end

    queries = queries_params.map do |query|
      {
        query: query[:query],
        variables: ensure_hash(query[:variables]),
        context: {
          current_user: current_user,
          request: request,
          optics_agent: (Rails.env.production? ? request.env[:optics_agent].with_document(query[:query]) : nil)
        }
      }
    end

    Schema.multiplex(queries)
  end

  def ensure_hash(query_variables)
    if query_variables.blank?
      {}
    elsif query_variables.is_a?(String)
      JSON.parse(query_variables)
    else
      query_variables
    end
  end
end
