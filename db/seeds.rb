# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Comment.destroy_all
Post.destroy_all
User.destroy_all

# Create Admin
user = User.create! name: "Admin", email: "admin@graphql-rails-blog.com", password: "password", password_confirmation: "password"
user.admin = true
user.save!

# Posts association
10.times do
  post = user.posts.create! title: Faker::Lorem.sentence(rand(2..4)), content: Faker::Lorem.paragraph(rand(30..50))
  rand(0..3).times do
    user.comments.create! content: Faker::Lorem.paragraph(rand(1..5)), post: post
  end
end

# Create users
10.times do |i|
  user = User.create! name: "user#{i}", email: "user#{i}@graphql-rails-blog.com", password: "password", password_confirmation: "password"
  post = user.posts.create! title: Faker::Lorem.sentence(rand(2..4)), content: Faker::Lorem.paragraph(rand(30..50))
  rand(0..3).times do
    user.comments.create! content: Faker::Lorem.paragraph(rand(1..5)), post: post
  end
end
