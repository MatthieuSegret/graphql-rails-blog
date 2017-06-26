source 'https://rubygems.org'

ruby '2.4.1'
gem 'rails', '5.1.1'

group :development, :test do
  gem 'sqlite3'
end
group :production do
  gem 'pg'
  # gem 'optics-agent'
end
gem 'puma', '~> 3.0'
gem 'uglifier'
gem 'devise'
gem 'faker'
gem 'activeadmin'
gem 'graphql'
gem 'graphql-batch'
gem 'graphiql-rails'
gem 'graphql-formatter'
gem 'rack-cors'
gem 'rails_12factor'
gem 'newrelic_rpm'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'awesome_print'
end
