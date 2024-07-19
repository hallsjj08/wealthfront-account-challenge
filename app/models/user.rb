class User < ApplicationRecord
  validate :validate_username
  validate :validate_password

  def validate_username
    if (!username.present?)
      errors.add(:messages, "param is missing or the value is empty: username")
    elsif (username.length < 10)
      errors.add(:messages, "param must be at least 10 characters in length: username")
    elsif (username.length > 50)
      errors.add(:messages, "param must be less than or equal to 50 characters in length: username")
    end
  end

  def validate_password
    if (!password.present?)
      errors.add(:messages, "param is missing or the value is empty: password")
    elsif (password.length < 20)
      errors.add(:messages, "param must be at least 20 characters in length: password")
    elsif (password.length > 50)
      errors.add(:messages, "param must be less than or equal to 50 characters in length: password")
    elsif (!password.match?(/[a-zA-Z]+/) || !password.match?(/\d+/))
      errors.add(:messages, "param must contain one character and one number: password")
    else
      passwordStrength = Zxcvbn.test(password)
      if (passwordStrength['score'] < 2)
        errors.add(:messages, "Weak Password: #{passwordStrength['feedback']['suggestions']}")
      end
    end
  end
end
