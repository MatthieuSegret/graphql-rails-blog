class AddUserReferenceToPostsAndComments < ActiveRecord::Migration[5.0]
  def change
    add_reference :posts, :user, index: true, foreign_key: true
    add_reference :comments, :user, index: true, foreign_key: true
  end
end
