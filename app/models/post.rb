class Post < ApplicationRecord

  validates :title, :content, presence: true
  validates :title, length: { minimum: 3 }
  cattr_accessor(:paginates_per) { 10 }

  has_many :comments, dependent: :destroy
  belongs_to :user

  def self.paginate(offset)
    offset(offset).limit(self.paginates_per)
  end

  def self.search(keywords)
    where('lower(title) like :keywords OR lower(content) like :keywords', :keywords => "%#{keywords.downcase}%")
  end
end
