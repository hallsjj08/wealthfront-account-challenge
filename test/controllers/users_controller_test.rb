class UsersControllerTest < ActionDispatch::IntegrationTest
  test "password_strength" do
    post '/api/create-account', params: {user: { username: '1234567890', password: 'passwordpassword123456' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'][0], "{\"type\":\"ValidationError\",\"field\":\"password\",\"message\":\"Weak Password: [\\\"Add another word or two. Uncommon words are better.\\\", \\\"Avoid repeated words and characters\\\"] Please reference https://github.com/dropbox/zxcvbn/blob/master/README.md for more information\"}"
  end

  test "create_account fails with missing username" do
    post '/api/create-account', params: { user: { password: '1234567890123456789a' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'][0], "{\"type\":\"ValidationError\",\"field\":\"username\",\"message\":\"Field cannot be empty.\"}"
  end

  test "create_account fails with missing password" do
    post '/api/create-account', params: { user: { username: '1234567890' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'][0], "{\"type\":\"ValidationError\",\"field\":\"password\",\"message\":\"Field cannot be empty.\"}"
  end

  test "create_account fails with username length too short" do
    post '/api/create-account', params: {user: { username: '123456789', password: '1234567890123456789a' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'][0], "{\"type\":\"ValidationError\",\"field\":\"username\",\"message\":\"Must be at least 10 characters in length.\"}"
  end

  test "create_account fails with password length too short" do
    post '/api/create-account', params: { user: { username: '1234567890', password: '1234567890123456789' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'][0], "{\"type\":\"ValidationError\",\"field\":\"password\",\"message\":\"Must be at least 20 characters in length.\"}"
  end

  test "create_account fails with username length too long" do
    post '/api/create-account', params: {user: { username: '123456789012345678901234567890123456789012345678901', password: '1234567890123456789a' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'][0], "{\"type\":\"ValidationError\",\"field\":\"username\",\"message\":\"Must be less than or equal to 50 characters in length.\"}"
  end

  test "create_account fails with password length too long" do
    post '/api/create-account', params: { user: { username: '1234567890', password: '123456789012345678901234567890123456789012345678901' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'][0], "{\"type\":\"ValidationError\",\"field\":\"password\",\"message\":\"Must be less than or equal to 50 characters in length.\"}"
  end

  test "create_account fails with password must contain one character and one number" do
    post '/api/create-account', params: { user: { username: '1234567890', password: '12345678901234567890' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'][0], "{\"type\":\"ValidationError\",\"field\":\"password\",\"message\":\"Must contain one letter and one number.\"}"
  end

  test "create_account succeeds with valid username and password" do
    post '/api/create-account', params: {user: { username: '1234567890', password: 'This#is@Str0ngP@Ssw0rd' }}
    assert_response :success
    assert_equal JSON.parse(response.body)['success'], true
  end
end
