class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :name, presence: true

  has_many :posts
  has_many :comments

  def generate_refresh_token!
    self.refresh_token = Digest::SHA1.hexdigest("#{Time.now}-#{self.id}-#{SecureRandom.hex}")
    self.save!
    self.refresh_token
  end

  def generate_jwt_token
    JsonWebToken.encode(sub: self.id, name: self.name, email: self.email)
  end
end
