class GraphqlController < ApiController
  def create
    queries_params = params[:_json]

    if Rails.env.development?
      queries_params.each { |query| puts GraphQLFormatter.new(query[:query]) }
    end

    queries = queries_params.map do |query|
      {
        query: query[:query],
        variables: ensure_hash(query[:variables]),
        context: {
          current_user: current_user,
          warden: warden,
          optics_agent: (Rails.env.production? ? request.env[:optics_agent].with_document(query[:query]) : nil)
        }
      }
    end

    result = Schema.multiplex(queries)
    render json: result
  end

  private

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
