class User < ApplicationRecord
  include Trackable
  has_secure_password

  validates :name, :email, :password_digest, presence: true
  validates :email, uniqueness: true, format: /@/
  validates :password, length: { minimum: 6 }, allow_blank: true

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  def generate_access_token!
    self.access_token = Digest::SHA1.hexdigest("#{Time.now}-#{self.id}-#{SecureRandom.hex}")
    self.save!
    self.access_token
  end

  def update_with_password(password: nil, password_confirmation: nil, current_password: nil)
    if self.authenticate(current_password)
      self.errors.add(:base, "Password can't be blank") && (return false) if password.blank?
      self.update(password: password, password_confirmation: password_confirmation)
    else
      self.errors.add(:current_password, "Invalid password")
      return false
    end
  end
end
