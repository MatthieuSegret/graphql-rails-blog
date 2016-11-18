module GraphQL
  class Query
    class Arguments
      def to_params
        ActionController::Parameters.new(self.to_h).permit(*self.to_h.keys)
      end
    end
  end
end
