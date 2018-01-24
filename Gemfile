source 'https://rubygems.org'

ruby '2.4.1'
gem 'rails', '5.1.4'

gem 'puma', '~> 3.0'
gem 'uglifier'
gem 'bcrypt'
gem 'faker'
gem 'graphql'
gem 'graphql-batch'
gem 'graphiql-rails'
gem 'graphql-formatter'
gem 'rack-cors'
gem 'newrelic_rpm'

group :production do
  gem 'pg'
  gem 'optics-agent'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  gem 'sqlite3'
end

group :development do
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'awesome_print'
  gem 'rubocop', require: false
  
  # for graphql browser
  gem 'sass-rails'
  gem 'uglifier'
  gem 'coffee-rails'  
end
