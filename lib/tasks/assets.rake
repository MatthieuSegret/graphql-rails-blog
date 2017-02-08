# The webpack must compile assets before assets:environment task.
# Otherwise Sprockets sees no changes and doesn't precompile assets.
Rake::Task["assets:precompile"].clear
Rake::Task["assets:clean"].clear

namespace :assets do

  desc 'Compile Webpack assets'
  task :precompile do
    puts "Not pre-compiling assets..."
  end

  desc 'Clean Webpack assets'
  task :precompile do
    puts "Not clean assets..."
  end
end
