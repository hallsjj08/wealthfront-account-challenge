class User < ApplicationRecord
  validate :validate_username
  validate :validate_password

  def validate_username
    error = { 'type' => 'ValidationError', 'field' => "username", 'message' => '' }
    if (!username.present?)
      error['message'] = "Field cannot be empty."
    elsif (username.length < 10)
      error['message'] = "Must be at least 10 characters in length."
    elsif (username.length > 50)
      error['message'] = "Must be less than or equal to 50 characters in length."
    end

    if (error['message'].length > 0)
      errors.add(:errors, error.to_json)
    end
  end

  def validate_password
    error = { 'type' => 'ValidationError', 'field' => "password", 'message' => '' }
    if (!password.present?)
      error['message'] = "Field cannot be empty."
    elsif (password.length < 20)
      error['message'] = "Must be at least 20 characters in length."
    elsif (password.length > 50)
      error['message'] = "Must be less than or equal to 50 characters in length."
    elsif (!password.match?(/[a-zA-Z]+/) || !password.match?(/\d+/))
      error['message'] = "Must contain one letter and one number."
    else
      passwordStrength = Zxcvbn.test(password)
      if (passwordStrength['score'] < 2)
        error['message'] = "Weak Password: #{passwordStrength['feedback']['suggestions']} Please reference https://github.com/dropbox/zxcvbn/blob/master/README.md for more information"
      end
    end

    if (error['message'].length > 0)
      errors.add(:errors, error.to_json)
    end
  end
end
