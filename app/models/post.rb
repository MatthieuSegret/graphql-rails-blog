class Post < ApplicationRecord

  validates :title, :content, presence: true
  validates :title, length: { minimum: 3 }

  has_many :comments
  belongs_to :user
end
