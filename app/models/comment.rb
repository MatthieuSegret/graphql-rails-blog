class Comment < ApplicationRecord

  validates :content, presence: true

  belongs_to :user, optional: false
  belongs_to :post, touch: true, counter_cache: true
end
