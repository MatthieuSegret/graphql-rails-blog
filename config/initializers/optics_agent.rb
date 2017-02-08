if Rails.env.production?
  optics_agent = OpticsAgent::Agent.new
  optics_agent.configure { schema Schema }
  Rails.application.config.middleware.use optics_agent.rack_middleware
end
