class User < ApplicationRecord
  include Trackable
  has_secure_password

  validates :name, :email, :password_digest, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_blank: true

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  def generate_refresh_token!
    self.refresh_token = Digest::SHA1.hexdigest("#{Time.now}-#{self.id}-#{SecureRandom.hex}")
    self.save!
    self.refresh_token
  end

  def generate_jwt_token
    JsonWebToken.encode(sub: self.id, name: self.name, email: self.email)
  end

  def update_with_password(password:, password_confirmation:, current_password:)
    if self.authenticate(current_password)
      self.update(password: password, password_confirmation: password_confirmation)
    else
      self.errors.add(:current_password, "Invalid password")
      return false
    end
  end
end
