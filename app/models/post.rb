class Post < ApplicationRecord

  validates :title, :content, presence: true
  validates :title, length: { minimum: 3 }
  cattr_accessor(:paginates_per) { 3 }

  has_many :comments
  belongs_to :user

  def self.paginate(offset)
    offset(offset).limit(self.paginates_per)
  end
end
