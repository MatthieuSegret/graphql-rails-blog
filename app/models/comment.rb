class Comment < ApplicationRecord

  validates :content, presence: true, length: { minimum: 3 }

  belongs_to :user
  belongs_to :post, touch: true, counter_cache: true
end
