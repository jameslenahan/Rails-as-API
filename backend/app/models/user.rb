class User < ApplicationRecord
  has_secure_password
  has_many :players
  has_many :gifts, through: :players
end