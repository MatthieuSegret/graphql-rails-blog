source 'https://rubygems.org'

ruby '2.3.1'
gem 'rails', '~> 5.0.0', '>= 5.0.0.1'

group :development, :test do
  gem 'sqlite3'
end
group :production do
  gem "pg"
end
gem 'puma', '~> 3.0'
gem 'uglifier'
gem 'devise'
gem 'faker'
gem 'inherited_resources', github: 'activeadmin/inherited_resources'
gem 'activeadmin', github: 'activeadmin'
gem 'graphql'
gem 'graphiql-rails'
gem 'graphql-formatter'
gem 'rack-cors'
gem 'rails_12factor'

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
